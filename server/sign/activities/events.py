from schematics.types import UUIDType
from sign.lib.messages import Event


class ActivityCreated(Event):
    activity_id = UUIDType(required=True)
