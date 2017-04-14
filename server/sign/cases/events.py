from schematics.types import UUIDType
from sign.lib.messages import Event


class CaseCreated(Event):
    case_id = UUIDType(required=True)
