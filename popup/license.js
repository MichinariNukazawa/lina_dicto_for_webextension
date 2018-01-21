'use strict';

window.addEventListener( 'load', function(e){
	let license_text_element = document.getElementById('license_text');

	license_text_element.textContent
		= Language.command(":legumin")
		+ "\n"
		+ "\n+---------------------------------------------------------------------+"
		+ "\n+---------------------------------------------------------------------+"
		+ "\n\n"
		+ Language.command(":gvidilo");

}, false);

