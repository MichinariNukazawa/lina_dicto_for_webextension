'use strict';

let hover = new Hover(HoverProperty);
let detector = new Detector();
let dictionary = new Dictionary();


let prev_show_info = null;
let prev_info = null;
function callback(e){
	let info = detector.get_full_word_ex(e);
	if(0 === info.word.length){
		hover.hidden();
		return;
	}
	// console.log(`##${info.word}##${info.next_word}##`);

	let show_info;
	if(null !== prev_show_info && null !== prev_info
			&& info.word === prev_info.word && info.next_word === prev_info.next_word){
		show_info = prev_show_info;
	}else{
		show_info = Linad.get_show_info_from_keyword(dictionary, info.word, info.next_word);
		prev_info = info;
		prev_show_info = show_info;
	}

	hover.show(info.x, info.y, show_info);
}

window.addEventListener( 'load', function(e){
	hover.append();
	detector.set_func_is_invalid_character_check(function (c){
		return !Esperanto.is_esperanto_string(c);
	});

});


browser.runtime.onMessage.addListener(request => {
	console.debug(request.is_enabled);

	if(request.is_enabled){
		if(! dictionary.is_init()){
			const dictionary_data = dictionary_loader();
			dictionary.init_edictionary(dictionary_data);
			dictionary.init_hash_of_esperanto();
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

