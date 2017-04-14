import datetime

from schematics.types import ModelType

from . import app
from .events import ActivityCreated
from .models import Activity
from .repositories import ActivityRepository
from sign.lib.messages import SelfHandlingCommand


class CreateActivity(SelfHandlingCommand):
    activity = ModelType(Activity)

    def handle(self):
        self.validate()
        self.activity.created = datetime.datetime.now()
        self.activity.sent_from = 'Me'  # TODO
        ActivityRepository().save(self.activity)
        app.bus.publish(ActivityCreated({'activity_id': self.activity.id}))
