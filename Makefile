all:
	$(MAKE) -C server
	$(MAKE) -C client

.PHONY: help
help:
	@echo "make              # install dev environment"
	@echo "make tags         # build ctags for server and client"
	@echo "make run-client   # run the client dev server"
	@echo "make run-server   # run the backend dev server"
	@echo "make clean        # removes everything created by make"

.PHONY: run-client
run-client:
	$(MAKE) -C client run

.PHONY: run-server
run-server:
	$(MAKE) -C server run

.PHONY: tags
tags: client/node_modules/.bin/es-ctags
	ctags -R server/sign server/.venv/lib
	client/node_modules/.bin/es-ctags -a -R client/src/
	client/node_modules/.bin/es-ctags -a -R client/src/ --extension=.jsx

client/node_modules/.bin/es-ctags:
	$(MAKE) -C client

.PHONY: clean
clean:
	$(MAKE) -C client clean
	$(MAKE) -C server clean
