
all: copy

.PHONY: all clean
.PHONY: copy package

copy:
	mkdir -p lina_dicto/js
	cp -r ../lina_dicto/lina_dicto/js/dictionary.js lina_dicto/js/
	cp -r ../lina_dicto_for_android/app/src/main/assets/lina_dicto/js/dictionary_loader.js lina_dicto/js/
	cp -r ../lina_dicto_for_android/app/src/main/assets/lina_dicto/js/language.js popup/
	cp ../lina_dicto/lina_dicto/js/esperanto.js lina_dicto/js/
	cp ../lina_dicto/lina_dicto/js/language.js lina_dicto/js/

package:
	make clean
	make copy
	bash ./package.sh "lina_dicto_for_webextension"

clean:
	rm -rf lina_dicto/js

