'use strict';

window.addEventListener( 'load', function(e){
	let checkbox_element = document.getElementById('ld_is_enabled');

	var page = browser.extension.getBackgroundPage();
	checkbox_element.checked = page.getEnabled();

	page.setIcon(checkbox_element.checked);

	checkbox_element.addEventListener('change', function(e) {
		console.log("change");

		page.setIcon(checkbox_element.checked);

		page.setEnabled(checkbox_element.checked);
	});

}, false);

