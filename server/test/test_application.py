def test_index(app):
    resp = app.get('/')
    assert resp.status_code == 200
    assert resp.body == b'Hello from SignSpace'


def test_activities(app):
    resp = app.get('/activities')
    assert resp.status_code == 200
