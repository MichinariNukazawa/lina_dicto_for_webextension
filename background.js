'use strict';

let currentTabId = -1;
let is_enableds = {};

function getEnabled(){
	return is_enableds[currentTabId];
}

function setEnabled(is){
	is_enableds[currentTabId] = is;
	sendEnabled(is);
}

function sendEnabled(is_enabled_){

	function onError(error) {
		console.error(`Error: ${error}`);
	}

	function sendMessageToTabs(tabs) {
		for (let tab of tabs) {
			browser.tabs.sendMessage(
					tab.id,
					{is_enabled: is_enabled_}
					).then(response => {
				console.debug("Message from the content script:");
				console.debug(response.response);
			}).catch(onError);
		}
	}

	browser.tabs.query({
		currentWindow: true,
		active: true
	}).then(sendMessageToTabs).catch(onError);
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

function handleActivated(activeInfo) {
	console.debug("Tab Activated: " + activeInfo.tabId);

	if(! activeInfo.tabId in is_enableds){
		is_enableds[activeInfo.tabId] = false;
	}

	currentTabId = activeInfo.tabId;

	setIcon(is_enableds[activeInfo.tabId]);
}

browser.tabs.onActivated.addListener(handleActivated);

function handleUpdated(tabId, changeInfo, tabInfo) {
	console.debug("Tab Updated: " + tabId);

	sendEnabled(is_enableds[tabId]);
}

browser.tabs.onUpdated.addListener(handleUpdated);

function handleRemoved(tabId, removeInfo) {
	console.debug("Tab Removed: " + tabId);

	delete is_enableds[tabId];
}

browser.tabs.onRemoved.addListener(handleRemoved);

