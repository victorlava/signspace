from .models import User
from sign.lib.repositories import GenericRepository
from sign.lib.repositories import GenericInMemoryRepositoryImpl


class UserRepository(GenericRepository):

    class Options:
        model = User

    @classmethod
    def get_impl_class(cls):
        return UserInMemoryRepositoryImpl


class UserInMemoryRepositoryImpl(GenericInMemoryRepositoryImpl, UserRepository):

    def get_by_name(self, name=None):
        """
        Gets all users for which lowered display_name start matches our input
        """
        name_slug = name.lower()
        return self._all(predicate=lambda x: str(x['display_name']).lower().startswith(name_slug))

    def get_by_attribute(self, attribute=None):
        """
        Gets all users for which any part of their email, name and company attribute will partly match
        """
        attr_slug = attribute.lower()

        # in which user attributes we want to search
        searchables = ['display_name', 'email', 'company_name']

        def attr_matches(user):
            found = False
            for attr in searchables:
                found = str(user[attr]).lower().find(attr_slug) > -1
                if found:
                    break
            return found

        return self._all(predicate=attr_matches)
