
build:
	cd example/simple && npm i && npm run build-server
	cd example/vuex && npm i && npm run build-server

.PHONY: build
