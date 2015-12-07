(function(){
    app.config(function ( hammerDefaultOptsProvider ) {

    	hammerDefaultOptsProvider.set({recognizers: [[Hammer.Tap, {time: 300}], [Hammer.Press, {time: 300}], [Hammer.Swipe, {time: 300}]] });

    });
})();

