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
	
	static get_show_info_from_keyword(dictionary, keyword){
		let show_info = {
			'show_keyword':keyword,
			'explanation_text':'',
			'candidate_word':''
		};
	
		if(20 < keyword.length){
			show_info.show_word = keyword.substr(0, 10) + "~";
		}else if(! Esperanto.is_esperanto_string(keyword)){
			show_info.explanation_text = keyword;
		}else{
			let k_word = Esperanto.caret_sistemo_from_str(keyword);
			let item = dictionary.get_item_from_keyword(k_word);
			if(null === item){
				item = Linad.get_candidate_word_from_keyword(dictionary, k_word);
				if(null !== item){
					show_info.candidate_word = dictionary.get_show_word_from_item(item);
				}
			}
			show_info.explanation_text = dictionary.get_explanation_from_item(item);
		}
	
		return show_info;
	}
};

