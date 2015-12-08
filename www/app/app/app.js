var app = angular.module('knitwearApp', 
	[
	  	//Routing
        'ui.router',

        //Implement Lazy Loading
        'oc.lazyLoad',

        //Underscore
        'underscore',

        // Touch functionality for mobile phone
        'angular-gestures'
	]
);

// including underscore.JS as module in project
var underscore = angular.module('underscore', []).factory('_', function () {
    return window._;
});
