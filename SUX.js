/*
 * SUX: Short Url eXpander
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
		body = d.body, s, params, node, arr = [];
	
	
	SUX.expand = function(url,callback) {
		arr = [];
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
	
	if(!!SUX.bookmarklet) {
		SUX.bookmarklet();
	}
})(document);

// SUX.expand(["http://goo.gl/V77S","http://ow.ly/2MKSU","http://bit.ly/bKIvIF","http://is.gd/fDI42","http://tinyurl.com/2f7tkox","http://t.co/eaVrg1i"]);