import uuid
from schematics.types import UUIDType
from sign.lib.models import Model


class Space(Model):
    id = UUIDType(default=uuid.uuid4)
