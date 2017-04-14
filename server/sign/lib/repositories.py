import copy
import json
import pathlib
from collections import defaultdict

import dill

from sign import config
from sign.lib.utils import listify
from sign.lib.utils import get_redis_connection


class GenericRepository(object):

    class Options:
        model = None

    @classmethod
    def get_impl_class(cls):
        raise NotImplementedError

    def __new__(cls):
        assert cls.Options.model
        return object.__new__(cls.get_impl_class())

    def load(self, object_id):
        raise NotImplementedError

    def save(self, objects):
        raise NotImplementedError

    def remove(self, object_id):
        raise NotImplementedError


class GenericInMemoryRepositoryImpl(GenericRepository):

    _storage = defaultdict(dict)
    _file = pathlib.Path(config.DIR) / 'InMemoryRepository.pickle'

    @classmethod
    def _load_to_memory(cls):
        # try to load _storage from file, if file does not exist - leave it empty
        try:
            with cls._file.open(mode='rb') as f:
                cls._storage = dill.load(f)
        except FileNotFoundError:  # noqa
            pass

    @property
    def _storage_namespace(self):
        return '{}.{}'.format(self.__class__.__module__, self.__class__.__qualname__)

    def load(self, pk):
        return self._storage[self._storage_namespace][str(pk)]

    def save(self, objects):
        for obj in listify(objects, retain_collection_type=True):
            self._storage[self._storage_namespace][str(obj.pk)] = copy.deepcopy(obj)
        self._persist()

    def remove(self, pk):
        return self._storage[self._storage_namespace].pop(str(pk))

    def _all(self, predicate=lambda r: r, order_by=None, reverse=False):
        objs = filter(predicate, self._storage[self._storage_namespace].values())
        if order_by:
            if isinstance(order_by, str):
                objs = sorted(objs, key=lambda x: x[order_by], reverse=reverse)
            elif callable(order_by):
                objs = sorted(objs, key=order_by, reverse=reverse)
            else:
                raise TypeError("string or callable type is expected for `order_by` argument")
        return objs

    def _persist(self):
        with self._file.open(mode='wb') as f:
            dill.dump(self._storage, f)


class GenericRedisRepositoryImpl(GenericRepository):

    def __init__(self, redis_connection=None):
        if redis_connection:
            self._redis = redis_connection
        else:
            self._redis = get_redis_connection()

    @property
    def _storage_namespace(self):
        return '{}.{}'.format(self.__class__.__module__, self.__class__.__qualname__)

    def load(self, pk):
        # get whole list of values for a storage namespace
        _from, to = 0, -1
        obj_list = self._redis.lrange(self._storage_namespace, _from, to)
        for obj_value in obj_list:
            # obj_value is loaded from Redis as byte string - decode it
            obj_value = obj_value.decode('utf-8')
            obj_json = json.loads(obj_value)
            if obj_json.get('id') == pk:
                # http://schematics.readthedocs.io/en/latest/usage/importing.html#importing
                return self.Options.model(obj_json)

    def save(self, objects):
        for obj in listify(objects, retain_collection_type=True):
            obj_json = json.dumps(obj.to_primitive())
            # push obj json value to the redis value list
            self._redis.rpush(self._storage_namespace, obj_json)


class GenericPostgreRepositoryImpl(GenericRepository):
    pass


class GenericQvarnRepositoryImpl(GenericRepository):
    pass
