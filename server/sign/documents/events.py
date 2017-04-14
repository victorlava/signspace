from schematics.types import UUIDType
from sign.lib.messages import Event


class DocumentCreated(Event):
    document_id = UUIDType(required=True)

