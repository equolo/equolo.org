.PHONY: build clean credentials structure html js css php db external size dependencies builder

# repository name
REPO = equolo

# YUICompressor version
# http://yui.github.io/yuicompressor/
YUI = 2.4.8

# make JS files
JS =  js/display.js\
      restyle/build/restyle.js\
      js/normalizer.js\
      js/jsonh.js\
      eddy/build/dom4.js\
      eddy/build/eddy.dom.js\
      js/dollar.js\
      js/mercator.js\
      js/scrollbar-size.js\
      js/simple-kinetic.js\
      js/equolo-icon.js\
      js/create-shortcut-icon.js\
      js/storage.js\
      js/IE9Mobile.js\
      js/Delayed.js\
      js/mercator.js\
      js/horizontal-scroll.js\
      js/ietouches.js\
      js/wp.js\
      js/ffos.js\
      js/ga.js\
      js/paypal.js\
      js/$(REPO).js

# make pinit/submit section files
PINIT=js/display.js\
      js/normalizer.js\
      js/jsonh.js\
      eddy/build/dom4.js\
      eddy/build/eddy.dom.js\
      js/dollar.js\
      js/simple-kinetic.js\
      js/equolo-icon.js\
      js/font-awesome-icon.js\
      js/submit.js

# make CSS files
CSS = css/$(REPO).css\
      css/fx.css\
      css/utils.css\
      css/leaflet.css\
      css/IE9Mobile.css\
      css/wp.css

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
	make structure
	make html
	make js
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
	mkdir -p www/{js,css,cgi,tpl}

# copy over html files
html:
	rm -rf www/tpl/*
	cp $(HTML) www/tpl

# build generic version
js:
	cat js-tpl/var.before $(JS) js-tpl/var.after >build/no-copy.$(REPO).max.js
	cat js-tpl/var.before $(PINIT) js-tpl/var.after >build/no-copy.submit.max.js
	java -jar node_modules/yuicompressor.jar --type js build/no-copy.$(REPO).max.js -o build/no-copy.$(REPO).js --charset utf-8
	java -jar node_modules/yuicompressor.jar --type js build/no-copy.submit.max.js -o build/no-copy.submit.js --charset utf-8
#	echo `node categories.js` >js/categories.js
	cat js-tpl/license.before LICENSE.txt js-tpl/license.after js/IE.js build/no-copy.$(REPO).max.js >build/$(REPO).max.js
	cat js-tpl/license.before LICENSE.txt js-tpl/license.after js/IE.js build/no-copy.submit.max.js >build/submit.max.js
	cat js-tpl/copyright js/IE.js build/no-copy.$(REPO).js >build/$(REPO).js
	cat js-tpl/copyright js/IE.js build/no-copy.submit.js >build/submit.js
#	rm js/categories.js
	rm build/no-copy.*
	rm -rf www/js/*
	cp build/$(REPO).js www/js
	cp build/$(REPO).max.js www/js
	cp build/submit.js www/js
	cp build/submit.max.js www/js
	cp eddy/build/ie8.js www/js
	cp leaflet/leaflet.js www/js
	cp js/base64Icon.js www/js
	cp js/es5-shim.js www/js

# build generic version
css:
	cat $(CSS) >build/no-copy.$(REPO).max.css
	java -jar node_modules/yuicompressor.jar --verbose --type css build/no-copy.$(REPO).max.css -o build/no-copy.$(REPO).css --charset utf-8
	cat js-tpl/license.before LICENSE.txt js-tpl/license.after build/no-copy.$(REPO).max.css >build/$(REPO).max.css
	cat js-tpl/copyright build/no-copy.$(REPO).css >build/$(REPO).css
	rm build/no-copy.$(REPO).max.css
	rm build/no-copy.$(REPO).css
	rm -rf www/css/*
	cp build/$(REPO).css www/css
	cp build/$(REPO).max.css www/css
	cp css/fx.css www/css/fx.css
	cp css/utils.css www/css/submit.css
	cat css/submit.css >>www/css/submit.css
	cp -r fonts www
	mv www/fonts/font.css www/css/font.css
	cp leaflet/leaflet.css www/css/leaflet.css
	cp leaflet/leaflet.ie.min.css www/css/leaflet.ie.css

# move all needed PHP files in the right folder
php:
	rm -rf www/cgi/*
	cp $(PHP) www/cgi
	rm -rf www/*.php
	cp pages/* www
	cp -r lang www/cgi
	cp htaccess www/.htaccess
	cp equolo.webapp www
	cp equolo.appcache www

# preserve private data
db:
	cp db.php www/cgi

# including CDN files to avoid problems with some redefined CSS
# this is mainly a Firefox behavior
external:
	java -jar node_modules/yuicompressor.jar --verbose --type css leaflet/leaflet.css -o leaflet/leaflet.min.css --charset utf-8
	java -jar node_modules/yuicompressor.jar --verbose --type css leaflet/leaflet.ie.css -o leaflet/leaflet.ie.min.css --charset utf-8

# keep an eye on the minified and gzipped size
size:
	wc -c build/$(REPO).js
	gzip -c build/$(REPO).js | wc -c
	rm -rf www/phpmyadmin
	ln -s ~/code/phpmyadmin www/phpmyadmin

# modules used in this repo
dependencies:
	rm -rf node_modules
	mkdir node_modules
#	npm install tea-spawn
	curl -O -L https://github.com/yui/yuicompressor/releases/download/v$(YUI)/yuicompressor-$(YUI).jar
	mv yuicompressor-$(YUI).jar node_modules/yuicompressor.jar
	curl -O -L http://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.1.0/es5-shim.min.js
	curl -O -L http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css
	curl -O -L http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.ie.css
	curl -O -L http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js
	mv es5-shim.min.js js/es5-shim.js
	mv leaflet*.* leaflet
	mv font*.* fonts

credentials:
	ssh-add ~/.ssh/id_rsa_equolo
	git config user.email "dev@equolo.org"

# every time something changes,
# except for the runtime created www folder
# calls the make procedure
builder:
	make clean
	make external
	make build
	cp -r img www
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


