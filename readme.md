SUX: Short URL eXpander
=======================

### SUX.js a little JavaScript helper to expand short URLs

Using this little library you can pass one or more short URLs and get the expanded URL returned. Works on any short URL, even those weird ones nobody really uses.

### Give it too me in technical terms, I can take it

SUX.js uses YQL to do server side GET requests so we can access response headers and return the expanded URL location. No need to deal with multiple API's.

### Example

    SUX.expand(["http://goo.gl/V77S","http://ow.ly/2MKSU","http://bit.ly/bKIvIF"]);

This will return the full URLs and execute the `SUX.callback` method which returns the array of long URLs. You can pass a second argument to specify a function name for a different callback method.

	SUX.expand(["http://goo.gl/V77S","http://ow.ly/2MKSU","http://bit.ly/bKIvIF"],"doSomethingWithLongURLs");

See live example: http://ryanseddon.github.com/SUX/

#### Bookmarklet

Still working on it



	