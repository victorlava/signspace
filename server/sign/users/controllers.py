from . import app
from .repositories import UserRepository


@app.get('/api/v1/users/<attr>')
def users_by_name(attr=None):
    """
    Returns all users json for at least partially matching `name`, `email` or `company_name`

    TODO: `company_name`
    """
    users = UserRepository().get_by_attribute(attr)
    serialized_users = list(map(lambda x: x.to_primitive(), users))
    return {
        'data': serialized_users
    }
