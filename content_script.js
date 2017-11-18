'use strict';

let hover = new Hover();
let detector = new Detector();
let dictionary = new Dictionary();

function callback(e){
	let info = detector.get_full_word_ex(e);
	hover.show(info.x, info.y, info.word);
}

window.addEventListener( 'load', function(e){
	hover.append();
});


browser.runtime.onMessage.addListener(request => {
	console.debug(request.is_enabled);

	if(request.is_enabled){
		if(! dictionary.is_init()){
			dictionary.init_edictionary();
		}

		//! hover要素がまだ無ければ追加(アドオン読み込み直後くらいしか呼ばれないはず)
		if(! hover.is_appended()){
			hover.append();
		}

		document.addEventListener('mousemove', callback);
	}else{
		document.removeEventListener('mousemove', callback);

		hover.hidden();
	}

	return Promise.resolve({response: "Hi from content script"});
});

