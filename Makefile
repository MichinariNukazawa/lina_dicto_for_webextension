
all: move

move:
	mkdir -p lina_dicto/js
	cp -r ../lina_dicto/lina_dicto/js/dictionary.js lina_dicto/js/
	cp -r ../lina_dicto_for_android/app/src/main/assets/lina_dicto/js/dictionary_loader.js lina_dicto/js/
	cp -r ../lina_dicto/lina_dicto/js/esperanto.js lina_dicto/js/

clean:
	rm -rf lina_dicto/js

