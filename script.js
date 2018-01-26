'use strict';

let dictionary = new Dictionary();

(function(){

	if(typeof browser !== 'undefined'){
		let manifest = browser.runtime.getManifest();
		console.debug(manifest.name + " : content : " + document.title);
	}

	const dictionary_data = dictionary_loader();
	dictionary.init_edictionary(dictionary_data);
	dictionary.init_hash_of_esperanto();

	let hover = new Hover(HoverProperty);
	let detector = new Detector();

	detector.set_func_is_invalid_character_check(function (c){
		return !Esperanto.is_esperanto_string(c);
	});

	window.addEventListener( 'load', function(e){
		hover.append();
	}, false);

	// Return the word the cursor is over
	window.addEventListener( 'load', function(e){
		document.addEventListener('mousemove', function(e) {
			let info = detector.get_full_word_ex(e);
			hover.show(info.x, info.y, info.word);
		}, false);
	}, false);

})();

