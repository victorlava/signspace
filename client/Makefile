NODE_BIN = ./node_modules/.bin
DONEFILE = ./node_modules/.done

include config.env
-include local_config.env

environ: $(DONEFILE)

.PHONY: help
help:
	@echo "make          # install dependencies"
	@echo "make run      # run client dev server"
	@echo "make clean    # remove more or less everything created by make"

$(DONEFILE): package.json
	yarn install --ignore-engines
	touch $(DONEFILE)

.PHONY: run
run: environ
	SERVER=$(SERVER) $(NODE_BIN)/webpack-dev-server --config webpack.config.dev.js -d --watch --host 0.0.0.0

.PHONY: eslint
eslint:
	$(NODE_BIN)/eslint . --ext .js --ext .jsx --config=./.eslintrc

.PHONY: clean
clean:
	rm -rf node_modules
