from collections import defaultdict

from funcy import first

from .repositories import ActivityRepository


def get_case_view_activities(case_id, parent_activity_id=None):
    ar = ActivityRepository()
    activities = ar.get_all_from_case(case_id)

    if parent_activity_id:
        parent_activity = first(
            filter(lambda act: str(act.id) == parent_activity_id, activities)
        )
    else:
        parent_activity = first(
            filter(lambda act: act.is_root, activities)
        )

    # Get context_activity object
    context_activity_id = parent_activity.parent_id if parent_activity else None
    context_activity = first(
        filter(lambda act: str(act.id) == str(context_activity_id), activities)
    ) if context_activity_id else None

    activities_by_parent = defaultdict(list)
    for act in activities:
        activities_by_parent[str(act.parent_id)].append(act.to_primitive())

    # Serialize objects
    parent_activity = parent_activity.to_primitive() if parent_activity else None
    context_activity = context_activity.to_primitive() if context_activity else None

    return parent_activity, context_activity, activities_by_parent


def get_activities():
    r = ActivityRepository()
    return r.get_all_by_newest()
