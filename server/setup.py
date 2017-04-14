from setuptools import setup, find_packages


setup(
    name='sign',
    description='Tilaajavastuu SignSpace Application',
    author='Suomen Tilaajavastuu Oy',
    packages=find_packages('.'),
    include_package_data=True,
    entry_points={
        'console_scripts': [
            'signspace = sign.scripts.__main__:main_cli',
        ]
    }
)
