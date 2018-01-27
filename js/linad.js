'use strict';

class Linad{
	/** @brief スペル修正候補を返す */
	static get_candidate_word_from_keyword(dictionary, keyword){
		const candidates = Esperanto.get_candidates(keyword);
		for(const candidate of candidates){
			let index = dictionary.get_index_from_incremental_keyword(candidate);
			let item = dictionary.get_item_from_index(index);
			if(item){
				return item;
			}
		}
	
		return null;
	}
	
	static get_show_info_from_keyword(dictionary, keyword, next_keyword){
		let show_info = {
			'show_keyword':keyword,
			'explanation_text':'',
			'candidate_word':''
		};

		// console.log(`-##${keyword}##${next_keyword}##`);

		if(20 < keyword.length){
			show_info.show_word = keyword.substr(0, 10) + "~";
			return show_info;
		}

		if(! Esperanto.is_esperanto_string(keyword)){
			show_info.explanation_text = keyword;
			return show_info;
		}

		let item = null;
		// 2 word match
		if(Esperanto.is_esperanto_string(next_keyword)){
			let k_word = keyword + ' ' + next_keyword;
			k_word = Esperanto.caret_sistemo_from_str(k_word);
			item = dictionary.get_item_from_keyword(k_word);

			if(null !== item){
				show_info.show_keyword = k_word;
			}
		}

		// 1 word match
		let k_word = Esperanto.caret_sistemo_from_str(keyword);
		if(null === item){
			item = dictionary.get_item_from_keyword(k_word);
		}

		// 1 word candidate
		if(null === item){
			item = Linad.get_candidate_word_from_keyword(dictionary, k_word);
			if(null !== item){
				show_info.candidate_word = dictionary.get_show_word_from_item(item);
			}
		}

		show_info.explanation_text = dictionary.get_explanation_from_item(item);

		return show_info;
	}
};

