install:
	npm install

help:
	node bin/gendiff.js -h

lint:
	npx eslint .

update:
	sudo npm link
	