'use strict';

init_edictionary();

let hover = new Hover();
let detector = new Detector();

function callback(e){
	let info = detector.get_full_word_ex(e);
	hover.show(info.x, info.y, info.word);
}

window.addEventListener( 'load', function(e){
	hover.append();
});


browser.runtime.onMessage.addListener(request => {
	console.log("Message from the background script:" + request.is_enabled);
	if(request.is_enabled){
		document.addEventListener('mousemove', callback);
	}else{
		document.removeEventListener('mousemove', callback);
		hover.hidden();
	}

	return Promise.resolve({response: "Hi from content script"});
});

