import uuid

from sign.cases.commands import CreateCase
from sign.cases.repositories import CaseRepository


def test_cases(app):
    resp = app.get('/cases')
    print(resp.json)
    assert resp.status_code == 200


def test_create_case():
    case_data = dict(id=uuid.uuid4(),
                     title="Foo bar")
    activity_data = dict(sent_from="Me",
                         to=["Jon Doe", "Jane Smith"],
                         text="Hello world",
                         case_id=case_data['id'])
    cc = CreateCase(dict(case=case_data, first_activity=activity_data))
    cc.handle()
    assert CaseRepository().load(case_data['id'])
