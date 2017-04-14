import json
from typing import Type, Union, Callable
from schematics import Model as SchematicsModel


class Message(SchematicsModel):
    name = None

    @classmethod
    def create(cls, **kwargs):
        return cls(kwargs)

    @classmethod
    def get_name(cls):
        return cls.name or cls.__qualname__

    def get_payload(self):
        return self.to_primitive()

    def serialize(self):
        return json.dumps(self.get_payload())


class Command(Message):
    pass


class Event(Message):
    pass


class MessageHandler(object):

    def handle(self, message: Message):
        raise NotImplementedError


class CommandHandler(MessageHandler):
    pass


class EventHandler(MessageHandler):
    pass


class SelfHandlingCommand(CommandHandler, Command):

    def handle(self):
        raise NotImplementedError


class Saga(object):
    pass


HandlerType = Union[
    Type[MessageHandler],
    Callable[[Message], None],
]
