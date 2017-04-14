import datetime
import uuid

from schematics.types import UUIDType
from schematics.types import StringType
from schematics.types import DateTimeType

from sign.kernel.models import Privacy
from sign.lib.models import Model


class Case(Model):
    id = UUIDType(default=uuid.uuid4)
    title = StringType(required=True)
    privacy = StringType(choices=[v.value for v in Privacy], default=Privacy.PUBLIC.value)
    created = DateTimeType(default=datetime.datetime.now)
