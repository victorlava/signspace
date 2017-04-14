import enum


class LOA(enum.IntEnum):
    """Level of assurance"""
    LEVEL1 = 1
    LEVEL2 = 2
    LEVEL3 = 3


class Privacy(enum.Enum):
    PUBLIC = 'PUBLIC'
    PRIVATE = 'PRIVATE'
