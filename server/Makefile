PYTHON = python3.4
VENV_VERSION = 15.1.0
VENV_DOWNLOAD_URL = https://pypi.python.org/packages/d4/0c/9840c08189e030873387a73b90ada981885010dd9aea134d6de30cd24cb8/virtualenv-$(VENV_VERSION).tar.gz
VENV_SCRIPT = virtualenv-$(VENV_VERSION)/virtualenv.py
VENV = .venv
BIN = $(VENV)/bin
PIP = $(BIN)/pip
PIP_COMPILE = $(BIN)/pip-compile
PIP_SYNC = $(BIN)/pip-sync
SIGNSPACE = $(BIN)/signspace
PYTEST = $(BIN)/pytest
DONEFILE = $(VENV)/.done
TESTDIR = test


.PHONY: environ
environ: $(DONEFILE) bin

.PHONY: help
help:
	@echo "make                        # build everything"
	@echo "make run                    # run app"
	@echo "make test                   # run tests"
	@echo "make coverage               # run tests with coverage"
	@echo "make redis-server           # launch redis server (requires docker)"
	@echo "make redis-cli              # open redis-cli when redis server is launched"
	@echo "make clean                  # remove more or less everything created by make"
	@echo "make clean_pycache          # remove python cache"

.PHONY: run
run:
	$(SIGNSPACE)

$(VENV_SCRIPT):
	wget $(VENV_DOWNLOAD_URL) -O- | tar -xzf- -C .

$(PIP): $(VENV_SCRIPT)
	$(VENV_SCRIPT) -p $(PYTHON) $(VENV)

$(PIP_COMPILE) $(PIP_SYNC): $(PIP)
	$(PIP) install pip-tools

$(DONEFILE): $(PIP) $(PIP_SYNC) requirements.txt requirements-dev.txt setup.py
	$(PIP_SYNC) requirements-dev.txt
	$(PIP) install -e .
	touch $@

requirements.txt: requirements/prod.in
	$(PIP_COMPILE) requirements/prod.in -o requirements.txt

requirements-dev.txt: requirements/prod.in requirements/dev.in
	$(PIP_COMPILE) requirements/prod.in requirements/dev.in -o requirements-dev.txt

# Convenience shortcut
bin: $(BIN)
	ln -sf $(BIN) bin

.PHONY: test
test: environ
	$(PYTEST) $(TESTDIR)

.PHONY: cover coverage
cover coverage: environ
	$(PYTEST) $(TESTDIR) --cov sign --cov-report html:htmlcov

.PHONY: redis-server
redis-server:
	docker run --name redis-server --rm -p 6379:6379 redis

.PHONY: redis-cli
redis-cli:
	docker run -it --link redis-server:redis --rm redis redis-cli -h redis -p 6379

.PHONY: clean
clean: clean_pycache
	rm -rf virtualenv-*
	rm -rf sign.egg-info
	rm -rf $(VENV)
	rm -f bin

.PHONY: clean_pycache
clean_pycache:
	find . -name '__pycache__' -type d -exec rm -rf "{}" +
	find . -name '*.pyc' -delete
