import importlib
import datetime
import enum
import uuid

from schematics.types import BooleanType
from schematics.types import DateTimeType
from schematics.types import ListType
from schematics.types import StringType
from schematics.types import UUIDType
from schematics.types.serializable import serializable
from sign.kernel.models import Privacy
from sign.lib.models import Model
from sign.cases.repositories import CaseRepository


class ActivityType(enum.Enum):
    MESSAGE = 'MESSAGE'
    SIGNING = 'SIGNING'


ActivityType.values = [v.value for v in ActivityType]
ActivityType.default = ActivityType.MESSAGE.value


ACTIVITY_TYPE_TO_CLASS = {
    ActivityType.MESSAGE.value: 'sign.activities.message.models.MessageActivity',
    ActivityType.SIGNING.value: 'sign.activities.signing.models.SigningActivity',
}


def get_child_class(activity_type):
    path, class_name = ACTIVITY_TYPE_TO_CLASS[activity_type].rsplit('.', 1)
    module = importlib.import_module(path)
    return getattr(module, class_name)


def claim_function(inst, data):
    return get_child_class(data.get('type', ActivityType.default))


class Activity(Model):
    """Polymorphic parent class for all activity type classes.
    Will __magically__ "morph" to correct child class.
    """

    def __new__(cls, raw_data=None, **kwargs):
        poly_type = (raw_data or {}).get('type', ActivityType.default)
        klass = get_child_class(poly_type)
        return object.__new__(klass)

    type = StringType(choices=ActivityType.values, default=ActivityType.default)

    id = UUIDType(default=uuid.uuid4)
    sent_from = StringType()
    to = ListType(StringType, required=True)
    text = StringType(required=True)
    privacy = StringType(choices=[v.value for v in Privacy], default=Privacy.PUBLIC.value)
    created = DateTimeType(default=datetime.datetime.now)

    attachments = ListType(StringType, default=[])

    is_root = BooleanType(default=False)
    case_id = UUIDType(required=True)
    parent_id = UUIDType()

    @serializable
    def case_title(self):
        return CaseRepository().load(self.case_id).title


Activity.claim_function = claim_function
Activity.Type = ActivityType
