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
		yqlURL = "https://query.yahooapis.com/v1/public/yql?format=json&q=",
		yqlRS = "USE '" + dataTable + "' AS remote;",
		yqlS = "SELECT * FROM remote WHERE url=",
		body = d.body, s, params, node, arr = [];
	
	
	SUX.expand = function(url,callback) {
		SUX.req(url,callback);
	};
	
	SUX.req = function(u,c) {
		for(var i = 0, len = u.length; i<len; i++) {
			arr += ["\"", u[i], "\"",((i !== len) ? "," : ""),""].join("");
		}
		params = encodeURIComponent([yqlRS, yqlS, "'{urls:[", arr, "]}'"].join(""));
		u = [yqlURL, params, "&callback=",(c = c || "SUX.callback")].join("");
		node = d.getElementById("SUX") || false;
		
		if(node) { node.src = null; node.parentNode.removeChild(node); }
		
		s = d.createElement("script");
		s.id = "SUX";
		s.src = u;
		
		body.appendChild(s);
	};
	SUX.callback = function(data) {
		return data.query.results.result.expanded;
	};

})(document);

// SUX.expand(["http://goo.gl/V77S","http://ow.ly/2MKSU","http://bit.ly/bKIvIF","http://is.gd/fDI42","http://tinyurl.com/2f7tkox","http://t.co/eaVrg1i"]);
/* Random short URLs to try:
    - http://y.ahoo.it/r/ENSPGm
	- http://shar.es/0Z5iX
	- http://mzl.la/bsw113
	- http://crbug.com/36415
	- http://on.fb.me/bvfPpP
	- http://rww.to/cT8HdH
	- http://scr.bi/bpolOh
	- http://tcrn.ch/bNg3yS
	- http://cot.ag/9EPp5f
	- http://s-lh.de/Yb
	- http://ind.pn/a7uvOQ
	- http://gul.ly/hx
	- http://df4.us/gfs
	- http://webk.it/49260
	- wapo.st/dfP3Zy
	- ttk.me/t48o4
	- tmo.to/efhq
	- dld.bz/7S2y
	- n.pr/i0fB5y
	- engt.co/g0pTRZ
	- db.tt/
	- oreil.ly/fOrEid
	
	Bundles:
	- http://bit.ly/diX0YD - Search page for item_longUrl classname
*/