'use strict';

(function(){

	if(typeof browser !== 'undefined'){
		let manifest = browser.runtime.getManifest();
		console.log(manifest.name + " : content : " + document.title);
	}

	init_edictionary();

	let hover = new Hover();
	let detector = new Detector();

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

