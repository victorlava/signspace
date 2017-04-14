import base64

import magic

from bottle import request
from bottle import response

from sign.lib.utils import to_primitive
from sign.lib.utils import validate_command_or_abort

from . import app
from .commands import CreateDocument
from .repositories import DocumentRepository


@app.post('/api/v1/document')
def create_document():
    created = []
    for field_name, file in request.files.items():
        data = {
            'filename': file.filename,
            'blob': base64.b64encode(file.file.read()),
            'mime_type': magic.from_buffer(file.file.read(), mime=True),
        }
        command = CreateDocument({'document': data})

        created.append({
            'id': str(command.document.id),
            'filename': command.document.filename
        })

        validate_command_or_abort(command)
        app.bus.send(command)

    return {'data': created}


@app.get('/api/v1/document/<document_id>')
def get_document(document_id):
    doc = DocumentRepository().load(document_id)
    response.content_type = doc.mime_type
    blob = base64.b64decode(doc.blob)
    return blob


@app.get('/api/v1/documents')
def get_documents():
    docs = list(DocumentRepository()._all())
    docs = [{'id': str(d.id), 'filename': d.filename} for d in docs]
    return {
        'data': docs,
    }
