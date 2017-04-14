from bottle import request

from . import app
from .commands import CreateCase
from .repositories import CaseRepository
from sign.activities.services import get_case_view_activities
from sign.lib.utils import validate_command_or_abort
from sign.lib.utils import to_primitive


@app.post('/api/v1/cases')
def create_case():
    command = CreateCase(request.json)
    validate_command_or_abort(command)
    app.bus.send(command)
    return {
        'ok': True,
    }


@app.get('/api/v1/cases')
def cases():
    cases = CaseRepository().get_all_by_newest()
    return {
        'data': to_primitive(cases),
    }


@app.get('/api/v1/cases/detail')
def case_view(id):
    """
    Given:
        request.json.case_id
        request.json.parent_activity_id - if not provided then top level root activity is assumed
        request.json.levels - how many levels of activities to return
            1 - returns only parent_activity
            2 - (default) parent_activity and it's child activities
            3 - parent, it's children, and childrens' children
            4 - etc.
    Return:
        {
            case: {...}
            parent_activity: {...},
            child_activities: [{...}, ...],
            context_activity: {...} - if `parent_activity` has a parent of his own it is called the context activity
        }
    """
    GET_query = request.query
    case_id = GET_query.get('case_id')
    parent_id = GET_query.get('parent_activity_id')
    # XXX: currently always 2 levels of children are returned
    # levels = GET_query.get('levels', 2)

    # get serialized case
    case = CaseRepository().load(case_id).to_primitive()

    # get serialized activities
    parent, context, activities_by_parent = get_case_view_activities(case_id, parent_id)

    data = dict(
        case=case,
        parent_activity=parent,
        activities_by_parent=activities_by_parent,
        context_activity=context,
    )

    return {'data': data}
