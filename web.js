// Load Libs
global.u 			= require('underscore');
global.RJS 			= require('rjs');

var express 			= require('express'),
	requireDir 			= require('require-dir'),
	path 				= require('path'),
	routes 				= requireDir('./routes');

var app = express();

app.configure(function () {
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));

 
	
RJS.install(Array, u, ["first", "rest", "last", "compact", "flatten", "without", "difference", "uniq", "indexOf", "lastIndexOf", "each", "map", "reduce", "reduceRight", "detect", "select", "reject", "all", "any", "include", "invoke", "pluck", "max", "min", "sortBy", "groupBy", "sortedIndex", "size", "head", "tail", "unique", "forEach", "inject", "foldl", "foldr", "filter", "every", "some", "contains"]);
RJS.install(Function, u, ["bind", "memoize", "delay", "defer", "throttle", "debounce", "once", "wrap", "compose"]);
RJS.install(Function, u, ["after"], -1);

app.get('/home', routes.start.get);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
	


