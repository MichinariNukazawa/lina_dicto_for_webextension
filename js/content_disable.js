'use strict';

function ldDisable(){
	console.log('call hover disable');
	document.removeEventListener('mousemove', onMousemove);
	hover.hidden();
}

ldDisable()
