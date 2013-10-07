.PHONY: build clean structure js hint css php db size dependencies

# repository name
REPO = equolo

# YUICompressor version
# http://yui.github.io/yuicompressor/
YUI = 2.4.8

# make JS files
JS = js/$(REPO).js

# make CSS files
CSS = css/$(REPO).css

# move PHP files
# NOTE: db.php is moved to the higher level
#       so it is hidden from this repository
#       since it contains clear MySQL connection info
PHP = php/common.php\
      php/activate.php

# default build task
build:
	make clean
	make structure
	make js
	make hint
	make css
	make php
	make db
	make size

# clean/remove build folder
clean:
	rm -rf build
	rm -rf www

# create the project structure
structure:
	mkdir -p build
	mkdir -p www/{js,css,cgi}

# build generic version
js:
	cat template/var.before $(JS) template/var.after >build/no-copy.$(REPO).max.js
	java -jar node_modules/yuicompressor.jar --verbose --type js build/no-copy.$(REPO).max.js -o build/no-copy.$(REPO).js --charset utf-8
	cat template/license.before LICENSE.txt template/license.after build/no-copy.$(REPO).max.js >build/$(REPO).max.js
	cat template/copyright build/no-copy.$(REPO).js >build/$(REPO).js
	rm build/no-copy.$(REPO).max.js
	rm build/no-copy.$(REPO).js
	rm -rf www/js/*
	cp build/$(REPO).js www/js
	cp build/$(REPO).max.js www/js

# hint built file
hint:
	node node_modules/jshint/bin/jshint build/$(REPO).max.js

# build generic version
css:
	cat $(CSS) >build/no-copy.$(REPO).max.css
	java -jar node_modules/yuicompressor.jar --verbose --type css build/no-copy.$(REPO).max.css -o build/no-copy.$(REPO).css --charset utf-8
	cat template/license.before LICENSE.txt template/license.after build/no-copy.$(REPO).max.css >build/$(REPO).max.css
	cat template/copyright build/no-copy.$(REPO).css >build/$(REPO).css
	rm build/no-copy.$(REPO).max.css
	rm build/no-copy.$(REPO).css
	rm -rf www/css/*
	cp build/$(REPO).css www/css
	cp build/$(REPO).max.css www/css

# move all needed PHP files in the right folder
php:
	rm -rf www/cgi/*
	cp $(PHP) www/cgi

# preserve private data
db:
	cp db.php www/cgi

# keep an eye on the minified and gzipped size
size:
	wc -c build/$(REPO).max.js
	gzip -c build/$(REPO).js | wc -c

# modules used in this repo
dependencies:
	rm -rf node_modules
	mkdir node_modules
	npm install jshint
	curl -O -L https://github.com/yui/yuicompressor/releases/download/v$(YUI)/yuicompressor-$(YUI).jar
	mv yuicompressor-$(YUI).jar node_modules/yuicompressor.jar


