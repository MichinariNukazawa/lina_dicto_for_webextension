'use strict';

window.addEventListener( 'load', function(e){
	let license_text_element = document.getElementById('license_text');

	const EsperantoLanguage_ = new EsperantoLanguage();

	license_text_element.textContent
		= EsperantoLanguage_.command(":legumin")
		+ "\n"
		+ "\n+---------------------------------------------------------------------+"
		+ "\n+---------------------------------------------------------------------+"
		+ "\n\n"
		+ EsperantoLanguage_.command(":gvidilo");

}, false);

