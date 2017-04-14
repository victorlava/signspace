from bottle import request

from . import app
from .commands import CreateActivity
from .repositories import ActivityRepository
from sign.lib.utils import validate_command_or_abort
from sign.lib.utils import to_primitive


@app.get('/api/v1/activities')
def activities():
    activities = ActivityRepository().get_all_by_newest()
    return {
        'data': to_primitive(activities),
    }


@app.post('/api/v1/activities')
def create_activity():
    command = CreateActivity(request.json)
    validate_command_or_abort(command)
    app.bus.send(command)
    return {
        'ok': True,
    }
