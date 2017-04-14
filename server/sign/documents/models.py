import uuid

from schematics.types import UUIDType
from schematics.types import StringType

from sign.lib.models import Model


class Document(Model):
    id = UUIDType(default=uuid.uuid4)
    filename = StringType(required=True)
    mime_type = StringType(required=True)
    blob = StringType(required=True)
