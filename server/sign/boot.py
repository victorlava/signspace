import importlib
import pathlib
import sys

import bottle

from . import config
from .lib.bus import SimpleBus
from .lib.repositories import GenericInMemoryRepositoryImpl


_root_app = None


def boot(cache=True):

    global _root_app

    if _root_app and cache:
        return _root_app

    root_app = bottle.app()
    root_app.bus = SimpleBus()

    GenericInMemoryRepositoryImpl._load_to_memory()

    for path in config.APPS:

        child_app = load_app(path)

        # We don't complain if child app does not define it's own bottle app.
        # XXX: But perhaps we should.
        if child_app:

            child_app.root_app = root_app
            child_app.bus = root_app.bus

            # Need to load bottle routes before we can merge them
            autoload_app_modules(path, (
                'controllers',
            ))

            root_app.merge(child_app)

        autoload_app_modules(path, (
            'handlers',
            'commands',
            'wiring',
        ))

    if cache:
        _root_app = root_app
        return _root_app
    else:
        return root_app


def load_app(path):
    module = importlib.import_module('{}'.format(path))
    try:
        return module.app
    except AttributeError:
        pass


def autoload_app_modules(path, modules):
    for module in modules:
        module_dot_path = '{}.{}'.format(path, module)
        module_path = '/'.join(module_dot_path.split('.')) + '.py'
        for path in sys.path:
            if (pathlib.Path(path) / module_path).exists():
                importlib.import_module(module_dot_path)
