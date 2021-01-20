install:
	npm install

help:
	node bin/gendiff.js -h

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest

update:
	sudo npm link
	