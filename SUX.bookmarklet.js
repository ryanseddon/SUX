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
	var	dataTable = "http://labs.thecssninja.com/SUX/SUX.xml",
		yqlURL = "https://query.yahooapis.com/v1/public/yql?format=json&debug=true&q=",
		yqlRS = "USE '" + dataTable + "' AS remote;",
		yqlS = "SELECT * FROM remote WHERE url=",
		body = d.body, s, params, node, arr = [],
		urls = d.links.length, linki = [], expand = [], link, curLink, isDone;
	
	// Trigger active psuedo class on iPhone
	d.ontouchstart = function() {};
	
	SUX.expand = function(url,callback) {
		SUX.req(url,callback);
	};
	
	SUX.req = function(u,c) {
		for(var i = 0, len = u.length; i<len; i++) {
			arr += "\"" + u[i] + "\""+((i !== len) ? "," : "")+"";
		}
		params = encodeURIComponent([yqlRS, yqlS, "'{urls:[", arr, "]}'"].join(""));
		u = [yqlURL, params, "&callback=",(c = c || "SUX.callback")].join("");
		node = d.getElementById("SUX") || false;
		
		if(node) { node.parentNode.removeChild(node); }
		
		s = d.createElement("script");
		s.id = "SUX";
		s.src = u;
		
		body.appendChild(s);
	};
	SUX.callback = function(data) {
		console.log(data.query.results.result.expanded);
	};
	
	SUX.getHostname = function(url) {
		var re = /^(http:\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+)?$/;
		// Alternative?: /(\w+)://([^/:]+)(:\d*)?([^# ]*)/
		
		if(url.match(re)) {
			// Use the global RegExp object to access the second parentheses value in the above RegExp.
			var domain = RegExp.$2.split("."),
				len = domain.length;
				
			if(domain[0] === "www") {
				domain = domain.slice(1,len);
			}
			domain = domain.slice(0,len-1).join("");
			
			return domain;
		}
	};
	SUX.bookmarklet = (function() {
		while(urls--) {
			curLink = d.links[urls];
			link = SUX.getHostname(curLink.href);
			isDone = !!curLink.attributes["data-sux"];

			if(link.length <= 5 && !isDone) {
				curLink.setAttribute("data-sux",true);
				linki.push({"url": curLink.href, "el": curLink});
				expand.push(curLink.href);
			}
		} 

		SUX.expand(expand, "SUX.callback");
	})();
	
	SUX.callback = function(data) {
		var lnkArr = data.query.results.result.expanded,
			k = lnkArr.length;
		
		while(k--) {
			linki[k].el.setAttribute("data-longurl",lnkArr[k]);
		}
	};
})(document);
	
/* Load bookmarklet code /
(function (d,p) {
	var els = [d.createElement('script'),d.createElement('link')],
		h = d.getElementsByTagName('head')[0];
	
	els[0].src = p+'js';
	els[1].href = p+'css';
	
	h.appendChild(el[0]);
	h.appendChild(el[1]);
})(document,'http://labs.thecssninja.com/SUX/SUX.bookmarklet.');

javascript:(function(d,p){var els=[d.createElement('script'),d.createElement('link')],h=d.getElementsByTagName('head')[0];els[0].src=p+'js';els[1].href=p+'css';h.appendChild(el[0]);h.appendChild(el[1]);})(document,'http://labs.thecssninja.com/SUX/SUX.bookmarklet.');
*/