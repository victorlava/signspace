from . import app
from .events import CaseCreated


def foo(event):
    pass


app.bus.register(CaseCreated, foo)
