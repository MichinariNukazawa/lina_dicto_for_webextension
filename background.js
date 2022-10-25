'use strict';

// ******** Message Receiver
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if('service_worker' !== request.ldMessageTarget){
			console.log('through receive message not target.', request.dtcMessageTarget)
			return
		}
		switch(request.ldMessageKind){
			case 'tab_state':
				doReportCurrentTabState()
				break
			case 'enable_translate':
				console.log('changed enable_translate', request.enableTanslate)
				doEnableTranslate()
				break
			default:
				console.error('invalid', request.ldMessageKind)
				break
		}
		// 本当はsave完了のコールバックを待って応答を返したいが
	}
);

// ******** TabState to popup

function doReportCurrentTabState(){
	// dirty switch
	// chrome.tabs.query() in firefox not working (not callback).
	if(typeof browser !== 'undefined'){
		// firefox
		browser.tabs.query({active: true, lastFocusedWindow:true})
			.then(onSelectedTabForTabStateReporting, onError);
	}else{
		let querying = chrome.tabs.query({active: true, lastFocusedWindow:true})
		querying.then(onSelectedTabForTabStateReporting).catch(onError);
	}
}

function onSelectedTabForTabStateReporting(tabs){
	const tabId = tabs[0].id
	chrome.runtime.sendMessage({
		'ldMessageTarget': 'popup',
		'ldMessageKind': 'tab_state',
		'tabState': {
			'enable': isEnableTranslateByTab(tabId)
		}
	});
}

// ******** In page translate. Init/Enable/Distable control

function doEnableTranslate(){
	// dirty switch
	// chrome.tabs.query() in firefox not working (not callback).
	if(typeof browser !== 'undefined'){
		// firefox
		browser.tabs.query({active: true, lastFocusedWindow:true})
			.then(onSelectedTabForTranslateChanging, onError);
	}else{
		let querying = chrome.tabs.query({active: true, lastFocusedWindow:true})
		querying.then(onSelectedTabForTranslateChanging).catch(onError);
	}
}

function onSelectedTabForTranslateChanging(tabs){
	const tabId = tabs[0].id
	let files;
	if(ldTabsState_.hasOwnProperty(tabId)){
		console.log('already initialized.', tabId, ldTabsState_[tabId].enable)
		if(ldTabsState_[tabId].enable){
			files = [ 'js/content_disable.js', ]
		}else{
			files = [ 'js/content_enable.js', ]
		}
		ldTabsState_[tabId].enable = !ldTabsState_[tabId].enable
	}else{
		console.log('initialize new tab.', tabId)
		files = [
			'lina_dicto/js/esperanto.js',
			'lina_dicto/js/dictionary_loader.js',
			'lina_dicto/js/dictionary.js',
			'js/detector.js',
			'js/hover_property.js',
			'js/hover.js',
			'js/linad.js',
			'js/content_init.js',
			'js/content_enable.js',
		]
		ldTabsState_[tabId] = {'enable': true} // キーがあれば初期化済みタブ
	}
	chrome.scripting.executeScript({
		'target': { 'tabId': tabId },
		'files': files
	});

	switchingIcon(isEnableTranslateByTab(tabId))
}

// ******** Tab State

// 本当はTab側に情報を持っておいてイチイチ確かめるのが正しいように思うが、横着する
let ldTabsState_ = {}
function isEnableTranslateByTab(tabId){
	if(! ldTabsState_.hasOwnProperty(tabId)){
		return false
	}
	return ldTabsState_[tabId].enable;
}

// ******** Tab changed, Icon change.

// アドオン起動時にIconをDisable状態へセット
chrome.runtime.onInstalled.addListener(() => {
	setIconWrapper("../icon/disable_icon_48.png")
});

function setIconWrapper(icon){
	// dirty switch
	if(typeof browser !== 'undefined'){
		// firefox
		chrome.browserAction.setIcon({ path: icon});
	}else{
		// chrome
		chrome.action.setIcon({ path: { 48: icon } });
	}
}

function switchingIcon(is){
	if(is){
		setIconWrapper("../icon/icon_48.png")
	}else{
		setIconWrapper("../icon/disable_icon_48.png")
	}
}

// アクティブなタブの切り替え
chrome.tabs.onActivated.addListener((activeInfo) => {
	console.debug("Tab Activated: " + activeInfo.tabId);

	switchingIcon(isEnableTranslateByTab(activeInfo.tabId))
});


// タブの状態変化(ページ遷移)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
	console.debug("Tab Updated: " + tabId);

	switchingIcon(isEnableTranslateByTab(tabId))
})

// タブが閉じられた
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
	console.debug("Tab Removed: " + tabId);

	delete ldTabsState_[tabId];
})

// ******** Other

function onError(error){
	console.error('Error:', error);
}
