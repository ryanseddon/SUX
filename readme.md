SUX: Short URL eXpander
=======================

### a little JavaScript library to expand short URLs and return their full version.

SUX.js uses YQL to do server side get requests so we can access response headers and return the expanded URl location, no need to deal with any API's.

### Example

    SUX.expand(["http://goo.gl/V77S","http://ow.ly/2MKSU","http://bit.ly/bKIvIF"]);

This will return the full URL's and execute the SUX.callback method which just writes the returned results to the console. You can pass a second argument to specify a function name for a different callback method.

	SUX.expand(["http://goo.gl/V77S","http://ow.ly/2MKSU","http://bit.ly/bKIvIF"],"doSomethingWithLongURLs");

	