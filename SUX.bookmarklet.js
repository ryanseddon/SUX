/*
 * SUX: Short Url eXpander - Bookmarklet
 * http://github.com/ryanseddon/SUX
 *
 * Copyright (c) 2010 Ryan Seddon - http://thecssninja.com/
 * Dual-licensed under the BSD and MIT licenses.
 * http://www.thecssninja.com/demo/license.txt
 */

var SUX = SUX || {};
 
(function(d){
	var urls = d.links.length, arr = [], expand = [], link, curLink, done, js = d.createElement('script'), h = d.getElementsByTagName('head')[0];
	
	SUX.bookmarklet = function() {
		while(urls--) {
			curLink = d.links[urls];
			link = curLink.href.split("/")[2].split(".").reverse()[1];
			done = !!curLink.attributes["data-sux"];

			if(link.length <= 5 && link !== "www" && !done) {
				curLink;
				curLink.setAttribute("data-sux",true);
				arr.push({"url": curLink.href, "el": curLink});
				expand.push(curLink.href);
			}
		} 

		SUX.expand(expand,"SUX.update");
		
		SUX.update = function(data) {
			var lnkArr = data.query.results.result.expanded,
				k = lnkArr.length;
			
			while(k--) {
				arr[k].el.innerHTML = lnkArr[k];
			}
		};
	};
	
	js.src = 'http://labs.thecssninja.com/SUX/SUX.js';
	h.appendChild(js);
})(document);
	
/* Load bookmarklet code /
(function (d) {
	var js = d.createElement('script'),
		h = d.getElementsByTagName('head')[0];
	
	js.src = 'http://labs.thecssninja.com/SUX/SUX.bookmarklet.js';
	h.appendChild(js);
})(document);

javascript:(function(d){var js=d.createElement('script'),h=d.getElementsByTagName('head')[0];js.src='http://labs.thecssninja.com/SUX/SUX.bookmarklet.js';h.appendChild(js);})(document);
*/