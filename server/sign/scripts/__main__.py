from pathlib import Path

import click

from sign import config
from sign.scripts import run as _run


DEFAULT_CMD = _run.main


@click.group(invoke_without_command=True)
@click.pass_context
def main_cli(ctx):
    """
    SignSpace server CLI
    """
    if ctx.invoked_subcommand is None:
        DEFAULT_CMD()


def create_commands(cli, scripts):
    """
    Creates commands from `scripts` for `cli` command group

    `scripts` files must have a callback or `click.Command` of the name `main`
    """
    for script in scripts:
        variables = {}
        script_name = script.name[:-3]

        # compile and eval app script
        #
        # this is basically copy paste from:
        # http://click.pocoo.org/6/commands/#custom-multi-commands
        with script.open() as f:
            code = compile(f.read(), script_name, "exec")
            eval(code, variables, variables)

        # make sure we have `main` variable inside the script
        try:
            script_function = variables['main']
        except KeyError:
            raise Exception("SignSpace app script must have a main command of name `cli`")

        # make sure the script is either a click.Command or a callback
        if isinstance(script_function, click.Command):
            command = script_function
        elif callable(script_function):
            command = click.Command(name=script_name, callback=script_function)
        else:
            raise Exception("SignSpace app script must be a callable or "
                            "instance of click.Command")

        # add script to the app's command group
        cli.add_command(command)


def load_main_scripts():
    """
    Load main scripts as commands
    """
    script_dir = Path(__file__).parent
    # get all non-dunder scripts
    scripts = list(script_dir.glob("[!__]*.py"))

    create_commands(main_cli, scripts)


def load_app_scripts():
    """
    Load apps and app scripts into commands, so we would have this pattern:
    $ bin/signspace my_app app_script

    App scripts must be inside `scripts/` directory inside the app.
    """
    for app in config.APPS:
        app_name = app[len("sign."):]
        app_scripts_path = config.DIR / app_name / "scripts"
        app_scripts = list(app_scripts_path.glob("*.py"))

        if app_scripts:
            # if SignSpace app has any scripts, create new command group for that app
            help_str = "{} app scripts".format(app_name)
            main_cli.add_command(click.Group(name=app_name, help=help_str))
            app_cli = main_cli.commands[app_name]

            create_commands(app_cli, app_scripts)


load_main_scripts()
load_app_scripts()
