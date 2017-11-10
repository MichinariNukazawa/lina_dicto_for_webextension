
(function(){

	function onClicked(tab) {
		// デバッグコンソールにメッセージを表示
		/*
		   let manifest = browser.runtime.getManifest();
		   console.log(manifest.name + " : icon clicked : " + document.title);
		 */
		console.log('background: ' + tab.url);
	}

	// Extensionのアイコンがクリックされたときに呼ばれる
	chrome.browserAction.onClicked.addListener(onClicked);

	console.log('background');

})();

