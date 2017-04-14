## Quickstart

Use `Vagrantfile` or if you are using Debian/Ubuntu ensure you have:

* node >= 4.4.7
* yarn (latest)
* ~~access to git.tilaajavastuu.io:stv-utils-frontend~~

```shell
# Setup stv git keyless access (optional, need access to stv git)
touch ~/.ssh/config
echo "Host git.tilaajavastuu.io" >> ~/.ssh/config
echo "    IdentityFile ~/.ssh/stv/firsur" >> ~/.ssh/config
ssh-agent bash
ssh-add ~/.ssh/stv/firsur

# Install node
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
source ~/.bashrc
nvm install v4.4.7
nvm use v4.4.7

# Install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

make
make run
```

## Notes

We have `bootstrap 4`  as requirement. Currently it's still in alpha, thus it changes.
When we'll upgrade it `.bootstraprc` might require many changes as modules may change or may
be removed from bootstrap.

## Stack / notable libs:

* React
* MobX
* https://github.com/AlexGilleran/jsx-control-statements
* https://github.com/gajus/react-css-modules
