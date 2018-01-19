
all: copy

.PHONY: all clean
.PHONY: copy package

copy:
	mkdir -p lina_dicto/js
	cp -r ../lina_dicto/lina_dicto/js/dictionary.js lina_dicto/js/
	cp -r ../lina_dicto_for_android/app/src/main/assets/lina_dicto/js/dictionary_loader.js lina_dicto/js/
	cp -r ../lina_dicto_for_android/app/src/main/assets/lina_dicto/js/esperanto_language.js popup/
	cp -r ../lina_dicto/lina_dicto/js/esperanto.js lina_dicto/js/

package:
	bash ./package.sh

clean:
	rm -rf lina_dicto/js

