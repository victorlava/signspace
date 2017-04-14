## Quickstart

Make sure you have installed:

* python3.4
* make
* wget
* tar

**Then simply**:

```shell
make
make run
```

View all available commands:

```shell
make help
signspace help  # (TODO)
```

### redis setup as repository backend

From docker [documentation](https://docs.docker.com/engine/installation/linux/debian/#install-using-the-repository)

```shell
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"

sudo apt-get update
sudo apt-get install -y docker-ce
```

## App structure

The application (root app) is divided into **logical** child apps.

List of installed child apps along with other settings can be found at [sign/config.py](sign/config.py).

Brief overview of child apps:

* [sign/kernel](sign/kernel) - shared concepts that typically have no dependecies on other child apps
* [sign/ui](sign/ui) - SignSpace UI (index route), iframes for 3rd party integrators
* [sign/cases](sign/cases) - cases, generic activity related stuff
* [sign/spaces](sign/spaces) - collaboration spaces
* [sign/users](sign/users) - users
* [sign/documents](sign/documents) - document management
* [sign/tasks](sign/tasks) - task management
* [sign/discussion](sign/discussion) - discussion activity
* [sign/signing](sign/signing) - signing activity
* ...

Root app is `boot()`'ed in [sign/\_\_init\_\_.py](sign/__init__.py).

App booting/loading logic is in [sign/boot.py](sign/boot.py).

Supporting code ([sign/lib](sign/lib)) should **NOT** be project specific, possibly reusable in other projects.

CLI scripts: [sign/scripts](sign/scripts).

## Child app structure

* `__init__.py` - may define variable `app` - an instance of `bottle.Bottle`
* `controllers.py` - bottle routes using `app` from `__init__.py`
* `models.py` - models, value objects
* `read_models.py` - derived/denormalized/transient models
* `repositories.py` - data access interfaces and implementations
* `services.py` - services that can't naturally be placed in a model or value object
* `commands.py` - command messages, also includes self-handling commands
* `events.py` - event messages
* `handlers.py` - message handlers
* `sagas.py` - process managers that govern/coordinate a series of commands/events (good intro on the Saga Pattern: https://www.youtube.com/watch?v=xDuwrtwYHu8)
* `wiring.py` - excplicitly wires up messages to message handlers
* `derivers.py` - commands / message handlers that deal specifically with deriving/denormalizing read models
* `utils.py` - misc. helpers/utility functions
* `scripts/` - child app specific CLI scripts
* `templates/`
* `assets/`

## Configuration

[Everett](http://github.com/willkg/everett) is used for configuration.

**Cascading** configuration sources (from lowest to highst precedence):

1. config.ini
2. local_config.ini (.gitignore'd)
3. OS environment variables

Config wiring is at [sign/config.py](sign/config.py)

Accessing config options within code:

```python
>>> from sign import config
>>> config.DEBUG
True
```

Or directly via Everett's config manager:

```python
>>> from sign import config
>>> config.config('debug')
'true'
```

## CLI scripts

[Click](https://github.com/pallets/click) is used internally to group sub-scripts.

```shell
signspace                                 # Executes the `run` script
signspace help                            # Lists all available scripts (TODO)
signspace <script_name>                   # Executes `scripts/script_name.py:main`
signspace <child_app> <script_name>       # Executes child app specific script defined in `<child_app>/scripts/script_name.py:main`
ipython child_app/scripts/script_name.py  # Same as above if script handles direct invocation (see below)
```

A script file (python module) must define a callable named `main`.

If the script accepts arguments usage of `click.Command` is encouraged.

Examples:

```python
# script_simple.py
def main():
    print('test')


# script_using_click.py
import click

@click.command()
def main():
    print('test')

# If direct invocation is desired, add this to the end of the script
if __main__ == '__main__':
    boot()  # Make sure app is `boot()`ed, otherwise some event handlers may not be wired
    main()
```
