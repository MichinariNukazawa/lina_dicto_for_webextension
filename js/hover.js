'use strict';

class Hover{
	constructor(){
		this.is_appended_flag = false;

		let result_root_element = document.createElement('div');
		result_root_element.style.cssText =
			''
			+ 'display: none;'
			+ 'top:10px;'
			+ 'left:10px;'
			+ 'width:auto;'
			+ 'position: fixed;'
			+ 'background-color:white;'
			+ 'border: 1.5px solid rgba(0, 170, 0, 1);'
			+ 'border-radius: 3px;'
			+ 'background: rgba(215, 255, 215, 1);'
			+ 'padding:4px;';

		let word_element = document.createElement('div');
		word_element.style.cssText =
			''
			+ 'font-size:40%;'
			+ "font-family: Consolas, 'Courier New', Courier, Monaco, monospace;";
		let explanation_element = document.createElement('div');
		explanation_element.style.cssText =
			''
			+ 'font-size:100%;'
			+ 'display: none;';
		result_root_element.appendChild(word_element);
		result_root_element.appendChild(explanation_element);

		let state = {
			"result_root_element": result_root_element,
			"word_element": word_element,
			"explanation_element": explanation_element,
			"prev_word": null,
		};
		this.state = state;
	}

	is_appended(){
		return this.is_appended_flag;
	}

	append(){
		//console.debug("");
		document.body.appendChild(this.state.result_root_element);
		this.is_appended_flag = true;
	}

	hidden(){
		this.state.result_root_element.style["display"] = "none";
		this.state.word_element.textContent = "";
		this.state.explanation_element.textContent = "";

		this.state.prev_word = "";
	}

	get_px_str(value){
		return '' + value + 'px';
	}

	get_show_info_from_keyword(keyword){
		let show_info = {
			'show_keyword':keyword,
			'explanation_text':''
		};

		if(20 < keyword.length){
			show_info.show_word = keyword.substr(0, 10) + "~";
		}else if(! Esperanto.is_esperanto_string(keyword)){
			show_info.explanation_text = keyword;
		}else{
			let k_word = Esperanto.caret_sistemo_from_str(keyword);
			let item = dictionary.get_item_from_keyword(k_word);
			show_info.explanation_text = dictionary.get_explanation_from_item(item);
		}

		return show_info;
	}

	show(x, y, word){
		// console.debug(word + " :" + x + "," + y);

		if (word == "") {
			this.hidden();
		}else{
			this.state.result_root_element.style["display"] = "inline-block";
			this.state.result_root_element.style["left"] = this.get_px_str(x + 10);
			this.state.result_root_element.style["top"] = this.get_px_str(y + 30);
			//console.debug(word + " :" + x + "," + y);

			if(word === this.state.prev_word){
				return;
			}
			this.state.prev_word = word;

			let show_info = this.get_show_info_from_keyword(word);

			if(0 !== show_info.explanation_text.length){
				this.state.result_root_element
					.style["border-width"] = "2px";
				this.state.explanation_element
					.style["display"] = "block";
				this.state.explanation_element
					.textContent = show_info.explanation_text;
			}else{
				this.state.result_root_element
					.style["border-width"] = "1.5px";
				this.state.explanation_element
					.style["display"] = "none";
			}

			this.state.word_element.textContent = "`" + show_info.show_word + "`";
		}
	}
};

