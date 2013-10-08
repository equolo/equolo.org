.PHONY: build clean structure html js css php db size dependencies builder

# repository name
REPO = equolo

# YUICompressor version
# http://yui.github.io/yuicompressor/
YUI = 2.4.8

# make JS files
JS =  js/normalizer.js\
      eddy/build/dom4.js\
      eddy/build/eddy.dom.js\
      js/dollar.js\
      js/mercator.js\
      js/shows-scroll-bar.js\
      js/simple-kinetic.js\
      js/$(REPO).js

# make CSS files
CSS = css/$(REPO).css

# move HTML files
HTML = html/*

# move PHP files
# NOTE: the real db.php is ignored in this repository
#       since it contains clear MySQL connection info
#       check php/db.php and crate a copy in the upper folder
#       using real credentials
PHP = php/*

# default build task
build:
	make clean
	make structure
	make html
	make js
	make css
	make php
	make db
	make external
	make size

# clean/remove build folder
clean:
	rm -rf build
	rm -rf www

# create the project structure
structure:
	mkdir -p build
	mkdir -p www/{js,css,cgi,tpl}

# copy over html files
html:
	rm -rf www/tpl/*
	cp $(HTML) www/tpl

# build generic version
js:
	cat template/var.before $(JS) template/var.after >build/no-copy.$(REPO).max.js
	java -jar node_modules/yuicompressor.jar --verbose --type js build/no-copy.$(REPO).max.js -o build/no-copy.$(REPO).js --charset utf-8
	cat template/license.before LICENSE.txt template/license.after js/IE.js build/no-copy.$(REPO).max.js >build/$(REPO).max.js
	cat template/copyright js/IE.js build/no-copy.$(REPO).js >build/$(REPO).js
	rm build/no-copy.$(REPO).max.js
	rm build/no-copy.$(REPO).js
	rm -rf www/js/*
	cp build/$(REPO).js www/js
	cp build/$(REPO).max.js www/js
	cp eddy/build/ie8.js www/js

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
	rm -rf www/*.php
	cp pages/* www

# preserve private data
db:
	cp db.php www/cgi

# including CDN files to avoid problems with some redefined CSS
# this is mainly a Firefox behavior
external:
	java -jar node_modules/yuicompressor.jar --verbose --type css leaflet.css -o www/css/leaflet.css --charset utf-8
	java -jar node_modules/yuicompressor.jar --verbose --type css leaflet.ie.css -o www/css/leaflet.ie.css --charset utf-8
	cp leaflet.js www/js

# keep an eye on the minified and gzipped size
size:
	wc -c build/$(REPO).js
	gzip -c build/$(REPO).js | wc -c
	ln -s ~/code/phpmyadmin www/phpmyadmin

# modules used in this repo
dependencies:
	rm -rf node_modules
	mkdir node_modules
	curl -O -L https://github.com/yui/yuicompressor/releases/download/v$(YUI)/yuicompressor-$(YUI).jar
	mv yuicompressor-$(YUI).jar node_modules/yuicompressor.jar
	curl -O -L http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css
	curl -O -L http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.ie.css
	curl -O -L http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js

# every time something changes,
# except for the runtime created www folder
# calls the make procedure
builder:
	node -e "(function(require){\
	var fs = require('fs'), exec = require('child_process').exec;\
	fs.readdirSync('.').filter(function(name){\
	  return name !== 'build' && name !== 'Makefile' && name !== 'www';\
	}).forEach(function(name){\
	  fs.watch(name, this);\
	}, function(event, name){\
	  if (exec('make')) {\
	    console.log('[' + (new Date).toISOString() + '] ' + name);\
	  }\
	});\
	}(require))"


