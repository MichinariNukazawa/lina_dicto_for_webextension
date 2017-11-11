'use strict';

(function(){

	if(typeof browser !== 'undefined'){
		let manifest = browser.runtime.getManifest();
		console.log(manifest.name + " : content : " + document.title);
	}

	init_dictionary();

	let prev = {x:0, y:0, click:0};

	/*
	   document.addEventListener('mousemove', function(e) {
	   if(200 < Math.abs(prev.x - e.clientX)){
	   console.log("x:" + e.clientX);
	   prev.x = e.clientX;
	   }
	   });
	 */

	document.addEventListener("click", function(e) {
		console.log(e.target);
		console.log("x:%d, y:%d", e.clientX, e.clientY);
		console.log(prev.click);
		prev.click++;
	});

	let hover = new Hover();
	let detector = new Detector(hover.callback.bind(hover));

	window.addEventListener( 'load', function(e){
		hover.append();
	}, false);

	// Return the word the cursor is over
	window.addEventListener( 'load', function(e){
		document.addEventListener('mousemove', function(e) {
			let info = detector.get_full_word_ex(e);
			detector.callback(info.x, info.y, info.word);
		}, false);
	}, false);

})();

