class Perfume:
    def __init__(self, id, name, brand, description):
        self.id = id
        self.name = name
        self.brand = brand
        self.description = description

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'brand': self.brand,
            'description': self.description
        }