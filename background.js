'use strict';

let currentTabId = -1;
let is_enableds = {};

function get_is_enabled_current_tab(){
	if(! is_enableds[currentTabId]){
		console.warn(currentTabId);
		is_enableds[currentTabId] = false;
	}

	return is_enableds[currentTabId];
}

function set_is_enabled_current_tab(is){
	if(! is_enableds[currentTabId]){
		console.warn(currentTabId);
	}

	is_enableds[currentTabId] = is;

	send_message_to_tab_is_enabled(currentTabId, is);
	setIcon(is);

}

function onError(error) {
	console.error(error);
}

function send_message_to_tab_is_enabled(tab_id, is_enabled_){

	browser.tabs.sendMessage(
			tab_id,
			{is_enabled: is_enabled_}
			).catch(onError);
}

function setIcon(is){
	if(is){
		browser.browserAction.setIcon({path: "../icon/icon_48.png"});
	}else{
		browser.browserAction.setIcon({path: "../icon/disable_icon_48.png"});
	}

}

window.addEventListener( 'load', function(e){
	browser.browserAction.setIcon({path: "../icon/disable_icon_48.png"});
});

// アクティブなタブの切り替え
function handleActivated(activeInfo) {
	console.debug("Tab Activated: " + activeInfo.tabId);

	if(! activeInfo.tabId in is_enableds){
		is_enableds[activeInfo.tabId] = false;
	}

	currentTabId = activeInfo.tabId;

	setIcon(is_enableds[activeInfo.tabId]);
}

browser.tabs.onActivated.addListener(handleActivated);

// タブの状態変化(ページ遷移)
function handleUpdated(tabId, changeInfo, tabInfo) {
	console.debug("Tab Updated: " + tabId);

	send_message_to_tab_is_enabled(tabId, is_enableds[tabId]);
}

browser.tabs.onUpdated.addListener(handleUpdated);

function handleRemoved(tabId, removeInfo) {
	console.debug("Tab Removed: " + tabId);

	delete is_enableds[tabId];
}

browser.tabs.onRemoved.addListener(handleRemoved);

