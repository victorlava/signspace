import pathlib
from everett.manager import ConfigManager
from everett.manager import ConfigOSEnv
from everett.manager import ConfigIniEnv
from everett.manager import parse_bool


DIR = pathlib.Path(__file__).parent
CONFIG_INI = DIR.parent / 'config.ini'
LOCAL_CONFIG_INI = DIR.parent / 'local_config.ini'


config = ConfigManager([
    ConfigOSEnv(),
    ConfigIniEnv(str(LOCAL_CONFIG_INI)),
    ConfigIniEnv(str(CONFIG_INI)),
])


# main
DEBUG = config('DEBUG', default='False', parser=parse_bool)
HOST = config('HOST', default='0.0.0.0')
PORT = config('PORT', default='5555')
CORS = config('CORS', default='')

# redis
REDIS_HOST = config('HOST', default='0.0.0.0', namespace='redis')
REDIS_PORT = config('PORT', default='6379', namespace='redis')
REDIS_DB = config('DB', default='0', namespace='redis')

# Installed apps
APPS = [
    'sign.kernel',
    'sign.ui',
    'sign.cases',
    'sign.spaces',
    'sign.users',
    'sign.documents',
    'sign.tasks',
    'sign.activities',
    'sign.activities.message',
    'sign.activities.signing',
]
