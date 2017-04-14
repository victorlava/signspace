import datetime

from schematics.types import ModelType

from sign.activities.models import Activity
from sign.activities.repositories import ActivityRepository
from sign.lib.messages import SelfHandlingCommand

from . import app
from .events import CaseCreated
from .models import Case
from .repositories import CaseRepository


class CreateCase(SelfHandlingCommand):
    case = ModelType(Case)
    first_activity = ModelType(Activity)

    def handle(self):
        self.validate()
        CaseRepository().save(self.case)
        act = self.first_activity
        act.is_root = True
        act.sent_from = 'Me'  # TODO
        # XXX: should not be needed, as the default is specified in the model definition...
        act.created = datetime.datetime.now()
        ActivityRepository().save(act)
        app.bus.publish(CaseCreated({'case_id': self.case.id}))
