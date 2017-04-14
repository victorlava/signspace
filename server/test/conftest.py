import pytest
import webtest

from sign import application


@pytest.fixture
def app():
    return webtest.TestApp(application)
