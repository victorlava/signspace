from .models import Activity
from sign.lib.repositories import GenericRepository
from sign.lib.repositories import GenericInMemoryRepositoryImpl


class ActivityRepository(GenericRepository):

    class Options:
        model = Activity

    @classmethod
    def get_impl_class(cls):
        return ActivityInMemoryRepositoryImpl

    def get_all(self):
        raise NotImplementedError

    def get_all_from_case(self):
        raise NotImplementedError


class ActivityInMemoryRepositoryImpl(GenericInMemoryRepositoryImpl, ActivityRepository):

    def get_all_by_newest(self):
        return self._all(order_by='created', reverse=True)

    def get_all_from_case(self, case_id):
        activities = self._storage[self._storage_namespace].values()
        case_id = str(case_id)
        return [act for act in activities if str(act.case_id) == case_id]
