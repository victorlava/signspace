from sign.lib.repositories import GenericInMemoryRepositoryImpl
from sign.lib.repositories import GenericRepository

from .models import Document


class DocumentRepository(GenericRepository):

    class Options:
        model = Document

    @classmethod
    def get_impl_class(cls):
        return DocumentInMemoryRepositoryImpl


class DocumentInMemoryRepositoryImpl(GenericInMemoryRepositoryImpl, DocumentRepository):
    pass
