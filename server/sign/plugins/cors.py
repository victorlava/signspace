import bottle


class CORS(object):

    def __init__(self, cors):
        self.cors = cors

    def apply(self, callback, route):
        def wrapper(*args, **kwargs):
            if self.cors:
                bottle.response.headers['Access-Control-Allow-Origin'] = self.cors
                bottle.response.headers['Access-Control-Allow-Credentials'] = 'true'
                bottle.response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
                bottle.response.headers['Access-Control-Allow-Headers'] = \
                    'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
            return callback(*args, **kwargs)
        return wrapper
