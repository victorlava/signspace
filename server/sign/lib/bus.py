from typing import Type
from collections import defaultdict
from .messages import Message
from .messages import Command
from .messages import SelfHandlingCommand
from .messages import Event
from .messages import HandlerType


class Bus(object):

    def send(self, command: Command):
        raise NotImplementedError

    def publish(self, event: Event):
        raise NotImplementedError

    def register(self, trigger: Type[Message], handler: HandlerType):
        raise NotImplementedError

    def unregister(self, trigger: Type[Message], handler: HandlerType):
        raise NotImplementedError

    def reset(self):
        raise NotImplementedError


class SimpleBus(Bus):

    def __init__(self):
        self._registry = self._new_registry()

    def _new_registry(self):
        return defaultdict(list)

    def send(self, command: Command):
        if isinstance(command, SelfHandlingCommand):
            return command.handle()

        for handler in self._registry[command.__class__]:
            if isinstance(handler, Command):
                return handler().handle(command)
            else:
                return handler(command)

    def publish(self, event: Event):
        event.validate()
        for handler in self._registry[event.__class__]:
            if isinstance(handler, Command):
                handler().handle(event)
            else:
                handler(event)

    def register(self, trigger: Type[Message], handler: HandlerType):
        self._registry[trigger].append(handler)

        if issubclass(trigger, Command):
            assert len(self._registry[trigger]) <= 1, (
                "<{}> command should be handled only by one handler."
            ).format(trigger.__qualname__)

    def unregister(self, trigger: Type[Message], handler: HandlerType):
        try:
            self._registry[trigger].remove(handler)
        except ValueError:
            pass

    def reset(self):
        self._registry = self._new_registry()
