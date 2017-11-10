
(function(){

	let manifest = browser.runtime.getManifest();
	console.log(manifest.name + " : content : " + document.title);

	let prev = {x:0, y:0, click:0};

	/*
	   document.addEventListener('mousemove', function(e) {
	   if(200 < Math.abs(prev.x - e.clientX)){
	   console.log("x:" + e.clientX);
	   prev.x = e.clientX;
	   }
	   });
	 */

	document.addEventListener("click", function(e) {
		console.log(e.target);
		console.log("x:%d, y:%d", e.clientX, e.clientY);
		console.log(prev.click);
		prev.click++;
	});

})();

