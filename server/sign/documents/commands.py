from schematics.types import ModelType

from . import app
from .events import DocumentCreated
from .models import Document
from .repositories import DocumentRepository

from sign.lib.messages import SelfHandlingCommand


class CreateDocument(SelfHandlingCommand):
    document = ModelType(Document)

    def handle(self):
        self.validate()
        doc = DocumentRepository().save(self.document)
        app.bus.publish(DocumentCreated({'document_id': self.document.id}))
        return doc
