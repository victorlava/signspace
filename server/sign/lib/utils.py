import collections

import redis
import bottle

from .exceptions import ValidationError
from sign import config


def is_non_string_sequence(value):
    return isinstance(value, collections.Sequence) and not isinstance(value, (str, bytes))


def listify(value, retain_collection_type=False):
    if value is None:
        return []
    if isinstance(value, list):
        return value
    if is_non_string_sequence(value):
        if retain_collection_type:
            return value
        else:
            return list(value)
    return [value]


def validate_command_or_abort(command):
    try:
        command.validate()
    except ValidationError as e:
        bottle.abort(200, {
            'ok': False,
            'errors': e.messages,
        })


def to_primitive(value):
    if hasattr(value, 'to_primitive'):
        return value.to_primitive()
    elif is_non_string_sequence(value):
        return list(map(lambda v: v.to_primitive(), value))
    else:
        assert False


def get_redis_connection():
    return redis.Redis(host=config.REDIS_HOST,
                       port=config.REDIS_PORT,
                       db=config.REDIS_DB)
