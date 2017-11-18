'use strict';

//! http://sukerasparo.com/
function showAmrilatoPairBirthdayMessage(){
	let message = null;

	let now = new Date();
	if(10 == (now.getMonth() + 1) && 10 == now.getDate()){
		message = '10/10はRinの誕生日です (<a href="http://sukerasparo.com/">http://sukerasparo.com/</a>)';
	}
	if(9 == (now.getMonth() + 1) && 26 == now.getDate()){
		message = '9/26はRukaの誕生日です (<a href="http://sukerasparo.com/">http://sukerasparo.com/</a>)';
	}

	let message_area_element = document.getElementById('message_area');
	if(message){
		console.debug(message);
		message = '<span>メッセージ:' + message + '</span><hr>';
		message_area_element.style.cssText =
			''
			+ 'display: block;';
		message_area_element.innerHTML = message;
	}else{
		message_area_element.style.cssText =
			''
			+ 'display: none;';
		message_area_element.innerHTML = "";
	}
}

window.addEventListener( 'load', function(e){
	showAmrilatoPairBirthdayMessage();

	let checkbox_element = document.getElementById('ld_is_enabled');

	var page = browser.extension.getBackgroundPage();
	checkbox_element.checked = page.get_is_enabled_current_tab();

	checkbox_element.addEventListener('change', function(e) {
		console.debug("change");

		page.set_is_enabled_current_tab(checkbox_element.checked);
	});

}, false);

