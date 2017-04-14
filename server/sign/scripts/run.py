import bottle
from sign.boot import boot
from sign import application
from sign import config


def main():
    bottle.run(
        app=application,
        debug=config.DEBUG,
        reloader=True,
        host=config.HOST,
        port=config.PORT,
    )


if __name__ == '__main__':
    boot()
    main()
