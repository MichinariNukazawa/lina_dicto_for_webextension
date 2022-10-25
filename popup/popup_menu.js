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

	let license_area_checkbox_element = document.getElementById('ld_is_license_area');
	license_area_checkbox_element.addEventListener('change', function(e) {
		let checked = license_area_checkbox_element.checked
		console.debug("license_area_change:" + checked)

		let license_area_element = document.getElementById('license_area');
		license_area_element.style.display = (checked)? "block":"none"
	});


	let checkbox_element = document.getElementById('ld_is_enabled');

	checkbox_element.addEventListener('change', function(e) {
		console.debug("change");

		chrome.runtime.sendMessage({
			'ldMessageTarget': 'service_worker',
			'ldMessageKind': 'enable_translate',
			'enableTanslate': checkbox_element.checked
		})
	});

	// ** TabState
	chrome.runtime.onMessage.addListener((request) => {
		if('popup' !== request.ldMessageTarget){
			console.log('through receive message not target.', request.ldMessageTarget)
			return
		}

		const tabState = request.tabState
		console.log('received tabState', tabState)

		// 設定値をUIに反映
		document.getElementById('ld_is_enabled').checked = tabState.enable

		// ** 読み込み成功したのでUIのロックを解除
		document.getElementById('loading_message').style.display ="none"
		let inputs = document.getElementsByTagName('input')
		for( let i = 0; i < inputs.length; i++){
			inputs[i].disabled = ''
		}
	})
	chrome.runtime.sendMessage({
		 'ldMessageTarget': 'service_worker',
		 'ldMessageKind': 'tab_state'
	})
}, false);

