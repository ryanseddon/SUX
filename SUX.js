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
		body = d.body, script, params, node, arr = [];
	
	SUX.expand = function(url,callback) {
		var len = url.length;
		
		if(typeof url != "string" && len > 1) {
			for(var i = 0; i<len; i++) {
				arr += ["\"", url[i], "\"",((i !== len) ? "," : ""),""].join("");
			}
		}
		params = encodeURIComponent([yqlRS, yqlS, "'{urls:[", (arr.length ? arr : "\""+url+"\""), "]}'"].join(''));

		url = [yqlURL, params, "&callback=",(callback = callback || "SUX.callback")].join("");
		node = d.getElementById("SUX") || false;
		
		if(node) { node.src = null; node.parentNode.removeChild(node); }
		
		script = d.createElement("script");
		script.id = "SUX";
		script.src = url;
		
		body.appendChild(script);
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
	- http://wapo.st/dfP3Zy
	- http://ttk.me/t48o4
	- http://tmo.to/efhq
	- http://dld.bz/7S2y
	- http://n.pr/i0fB5y
	- http://engt.co/g0pTRZ
	- http://db.tt/
	- http://oreil.ly/fOrEid
	- http://nyp.st/g7qddo
	- http://me.lt/9jjz
	- http://d.pr/eo76
	- http://r2.ly/87di
	- http://reg.cx/1N1Z
	- http://otf.me/HxW
	
	Bundles:
	- http://bit.ly/diX0YD - Search page for item_longUrl classname
*/