import uuid
from schematics.types import UUIDType
from schematics.types import StringType
from sign.lib.models import Model


class User(Model):
    id = UUIDType(default=uuid.uuid4)
    display_name = StringType()
    email = StringType()
    company_name = StringType()

    # XXX: should it be some custom type for url?
    image_url = StringType()
