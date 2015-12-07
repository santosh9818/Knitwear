(function(){
    app.config(function ( hammerDefaultOptsProvider ) {

    	// Event Recognizers
    	hammerDefaultOptsProvider.set(
    		{recognizers: [

	    		[Hammer.Tap, {time: 250}], 
	    		[Hammer.Press, {time: 500}], 
	    		[Hammer.Swipe, {time: 300}]

    		]}
    	);

    });
})();

