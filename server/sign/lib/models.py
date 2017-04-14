from schematics import Model as SchematicsModel


class Model(SchematicsModel):

    @classmethod
    def create(cls, **kwargs):
        return cls(kwargs)

    @property
    def pk(self):
        return self.id
