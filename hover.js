'use strict';

class Hover{
	constructor(){
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
		};
		this.state = state;
	}

	append(){
		//console.log("");
		document.body.appendChild(this.state.result_root_element);
	}

	get_px_str(value){
		return '' + value + 'px';
	}

	callback(x, y, word){
		if (word == "") {
			this.state.result_root_element.style["display"] = "none";
			this.state.word_element.textContent = "";
			this.state.explanation_element.textContent = "";
		}else{
			this.state.result_root_element.style["display"] = "inline-block";
			this.state.result_root_element.style["left"] = this.get_px_str(x + 10);
			this.state.result_root_element.style["top"] = this.get_px_str(y + 30);
			//console.log(word + " :" + x + "," + y);

			let item = dictionary_get_item_from_keyword(word);
			if(item){
				this.state.result_root_element
					.style["border-width"] = "2px";
				this.state.explanation_element
					.style["display"] = "block";
				this.state.explanation_element
					.textContent = dictionary_get_explanation_from_item(item);
			}else{
				this.state.result_root_element
					.style["border-width"] = "1.5px";
				this.state.explanation_element
					.style["display"] = "none";
			}

			this.state.word_element.textContent = "`" + word + "`";
		}
	}
};

