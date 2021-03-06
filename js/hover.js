'use strict';

class Hover{
	constructor(hover_property_arg){
		this.HoverProperty = hover_property_arg;
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
			+ 'border: 1.5px solid ' + this.HoverProperty.getRootBorderMatchedColor() + ';'
			+ 'border-radius: 3px;'
			+ 'background: ' + this.HoverProperty.getRootBackgroundColor() + ';'
			+ 'padding:4px;';

		let word_element = document.createElement('div');
		word_element.style.cssText =
			''
			+ 'font-size:60%;'
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

	show(x, y, show_info){
		this.state.result_root_element.style["display"] = "inline-block";
		this.state.result_root_element.style["left"] = this.get_px_str(x + 10);
		this.state.result_root_element.style["top"] = this.get_px_str(y + 30);

		//! easy check only show_word
		if(show_info.show_keyword === this.state.prev_word){
			return;
		}
		this.state.prev_word = show_info.show_keyword;

		if(0 !== show_info.explanation_text.length){
			this.state.result_root_element
				.style["border-width"] = "3px";
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

		let show_word = '`' + show_info.show_keyword + '`';
		if(0 === show_info.candidate_word.length){
			this.state.result_root_element
				.style["border-color"] = this.HoverProperty.getRootBorderMatchedColor();
		}else{
			this.state.result_root_element
				.style["border-color"] = this.HoverProperty.getRootBorderCandidateColor();
			show_word += ' -> `' + show_info.candidate_word + '`';
		}
		this.state.word_element.textContent = show_word;
	}
};

