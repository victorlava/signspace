import json

from .models import Case
from sign.lib.repositories import GenericInMemoryRepositoryImpl
from sign.lib.repositories import GenericRedisRepositoryImpl
from sign.lib.repositories import GenericRepository


class CaseRepository(GenericRepository):

    class Options:
        model = Case

    @classmethod
    def get_impl_class(cls):
        return CaseInMemoryRepositoryImpl

    def get_recently_active_cases(self):
        raise NotImplementedError

    def get_all(self):
        raise NotImplementedError

    def get_case(self, case_id, parent_activity_id, levels):
        raise NotImplementedError

class CaseInMemoryRepositoryImpl(GenericInMemoryRepositoryImpl, CaseRepository):

    def get_recently_active_cases(self):
        return self.all(lambda r: 'some fake condition here' in r.title)

    def get_all_by_newest(self):
        return self._all(order_by='created', reverse=True)


class CaseRedisRepositoryImpl(GenericRedisRepositoryImpl, CaseRepository):

    def get_recently_active_cases(self):
        pass
