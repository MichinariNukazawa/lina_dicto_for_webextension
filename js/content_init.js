'use strict';

let hover = new Hover(HoverProperty);
let detector = new Detector();
let dictionary = new Dictionary();

let prev_show_info = null;
let prev_info = null;
function onMousemove(e){
	let info = detector.get_full_word_ex(e);
	if(0 === info.word.length){
		hover.hidden();
		return;
	}

	let show_info;
	if(null !== prev_show_info
		&& null !== prev_info
		&& info.word === prev_info.word
		&& info.next_word === prev_info.next_word
	){
		show_info = prev_show_info;
	}else{
		//show_info = {
		//	'show_keyword':info.word,//keyword,
		//	'explanation_text':'',
		//	'candidate_word':''
		//};

		show_info = Linad.get_show_info_from_keyword(dictionary, info.word, info.next_word);
		prev_info = info;
		prev_show_info = show_info;
	}

	hover.show(info.x, info.y, show_info);
}

function ldInitialize(){
	console.log('call content script initialized.');

	// init dictionary
	const dictionary_data = dictionary_loader();
	dictionary.init_edictionary(dictionary_data);
	dictionary.init_hash_of_esperanto();

	//
	hover.append();

	//
	detector.set_func_is_invalid_character_check(function (c){
		return !Esperanto.is_esperanto_string(c);
	});
}

ldInitialize();

