
( function(){

	app.controller( "CustomizeController", [ '$scope', '$rootScope', '$location', function ( $scope , $rootScope, $location) {	
		

		// view model object
		$scope.customizeObject = {
			"selectedValue": {}
		};
		
		$scope.customizeObject.visibleCanvas = "front";

		$scope.swipecanvas = function(currentIndex, increment){
			var newIndex = currentIndex + increment;

			
			var face = {
				1 : "front",
				2 : 'back',
				3: 'sideleft',
				4: 'sideright'
			};
			
			if(newIndex != 0 && newIndex <= 4){
				console.log("swipe perform");
				alert(currentIndex);
				alert(increment);
				alert(face[newIndex]);
				alert(newIndex);
				$scope.customizeObject.visibleCanvas = face[newIndex];
			};
		};

		/*
		 * Excute controller dependency
		 */
		initlise = function(){
			var url = $location.path();
			var productId = url.slice(-1);
			$scope.customizeObject.product = _.findWhere( config.productImages, { "id" : parseInt(productId) } );
 		};

 		/*
 		 * Excute at start up
 		 */
 		initlise();

		// Excute when section is changed
		$rootScope.$on( "eventLoadSectionData", function ( event, args ) {
			
			// Create mapping for of event to component
			var HashArray = {};
			HashArray[config.section.HOME] = config.sectionImgs.HOME;
			HashArray[config.section.COLOR] = config.sectionImgs.COLOR;
			HashArray[config.section.PATTEREN] = config.sectionImgs.PATTEREN;
			HashArray[config.section.ARTWORK] = config.sectionImgs.ARTWORK;		
			
			// Set component prperty and value 
			$scope.customizeObject.type = args.tabName;
			$scope.customizeObject.data = HashArray[args.tabValue];
		
		});


		/*
		 * Excute on every image process
		 */
		$scope.processImage = function (option){
			console.log(option);
			$scope.customizeObject.selectedValue[option.type] = option.value;

			if(config.conponentType.COLOR == option.type){
				changeColor(option.type);
			}
			else if(config.conponentType.PATTEREN == option.type){
				changePattern(option.type);
			}
		}
		

		/*
		 * Change color of Image
		 */		
		changeColor = function(type){

			var face = {
				1 : "front",
				2 : 'back',
				3: 'sideleft',
				4: 'sideright'
			};

			for(var index=1; index <=4; index++){
				loadImages($scope.customizeObject.selectedValue[type], config.productImagePath+ $scope.customizeObject.product.id+ "_" +index +".png", 1, 'mainImage_'+ face[index])
			}
			
		};


		/*
		 * Change color of Pattern
		 */
		changePattern = function(type){

			var face = {
				1 : "front",
				2 : 'back',
				3: 'sideleft',
				4: 'sideright'
			};

			for(var index=1; index <=4; index++){
				loadImages($scope.customizeObject.selectedValue[type], config.productImagePath+ $scope.customizeObject.product.id+ "_" +index +".png", 1, 'mainImage_'+ face[index])
			}
		};


		/*
		 * Load images on canvas
		 */
		loadImages = function (baseImage, foreImage, alphaValue, canvas) {
			console.log("load Image");
			var canvas = angular.element(document.getElementById(canvas))[0];
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0 ,0 , 400, 400);
			var backImage = new Image();
			var frontImage = new Image();

			// Back image set up
			backImage.src = baseImage;				
			backImage.onload = function() {
				ctx.drawImage(backImage, 0, 0, 295, 300);
			};

			// Front image set up
			frontImage.src = foreImage;		
			frontImage.onload = function() {		
				ctx.globalAlpha = 1;
				ctx.drawImage(frontImage, 0, 0, 295, 300);
			};
		};
				
	}]);
})();
