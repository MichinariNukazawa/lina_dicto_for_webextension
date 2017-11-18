'use strict';

let dictionary = new Dictionary();

(function(){

	if(typeof browser !== 'undefined'){
		let manifest = browser.runtime.getManifest();
		console.debug(manifest.name + " : content : " + document.title);
	}

	dictionary.init_edictionary();

	let hover = new Hover();
	let detector = new Detector();

	detector.set_func_is_invalid_character_check(function (c){
		return !esperanto_is_esperanto_string(c);
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

