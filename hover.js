'use strict';

class Hover{
	constructor(){
		let result_root_element = document.createElement('div');
		result_root_element.style.cssText =
			''
			+ 'top:10px;'
			+ 'left:10px;'
			+ 'width:auto;'
			+ 'position: fixed;'
			+ 'background-color:white;'
			+ 'border:2px solid black;'
			+ 'padding:4px;';

		let prev = {
			"result_root_element": result_root_element
		};
		this.prev = prev;
	}

	append(){
		//console.log("");
		document.body.appendChild(this.prev.result_root_element);
	}

	get_px_str(value){
		return '' + value + 'px';
	}

	callback(x, y, word){
		let result_element = this.prev.result_root_element;
		if (word == "") {
			result_element.style["display"] = "none";
			result_element.textContent = "";
		}else{
			result_element.style["display"] = "inline-block";
			result_element.style["left"] = this.get_px_str(x + 10);
			result_element.style["top"] = this.get_px_str(y + 30);
			//console.log(word + " :" + x + "," + y);

			let item = dictionary_get_item_from_keyword(word);
			if(item){
				word += "/" + dictionary_get_explanation_from_item(item);
			}

			result_element.textContent = "`" + word + "`";
		}
	}
};

