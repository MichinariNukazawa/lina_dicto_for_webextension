'use strict';

function ldLoading(){
	console.log('call hover enable');
	document.addEventListener('mousemove', onMousemove);
	//document.addEventListener('mousemove', (e) => {console.log(e)});
}

ldLoading();
