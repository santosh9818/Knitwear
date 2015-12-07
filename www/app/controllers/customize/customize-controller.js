
( function(){

	app.controller( "CustomizeController", [ '$scope', '$rootScope', '$location', '$window', function ( $scope , $rootScope, $location, $window) {	
		
		console.log("aaaaaaaa",$window.innerWidth);


        /*
         * set width of bottom panel on window resize
         */
        $window.onresize = function (event) {
        	angular.element(document.getElementById('bottom-panel'))[0].setAttribute("style", "width:" + $window.innerWidth + "px;");
        };

		// view model object
		$scope.customizeObject = {
			"selectedValue": {}
		};
		
		var face = {
			1 : "front",
			2 : 'back',
			3: 'sideleft',
			4: 'sideright'
		};

		$scope.customizeObject.visibleCanvas = "front";

		// var canvas = angular.element(document.getElementById("mainImage_front"))[0];
		// var ctx = canvas.getContext("2d");
		
		//ctx.scale( 4, 0.45 );
		// ctx.mozImageSmoothingEnabled = false;
		// ctx.webkitImageSmoothingEnabled = false;
		// ctx.msImageSmoothingEnabled = false;
		// ctx.imageSmoothingEnabled = false;

		/*
		 * Load images on canvas
		 */
		loadImages = function (baseImage, foreImage, alphaValue, canvas, coordinate) {
			
			var canvas = angular.element(document.getElementById(canvas))[0];
			var ctx = canvas.getContext("2d");

			var backImage = new Image();
			var frontImage = new Image();

			// excute only if base image exist
			if(baseImage){
				ctx.clearRect(0 ,0 , 295, 450);
				// Back image set up
				backImage.src = baseImage;
				backImage.onload = function() {
					ctx.drawImage(backImage, 0, 0, 295, 450);
				};
			}
			
			// excute only if base image exist
			if(foreImage){
				// Front image set up
				frontImage.src = foreImage;		
				frontImage.onload = function() {		
					ctx.globalAlpha = alphaValue;
					if(coordinate.width && coordinate.height){
						ctx.drawImage(frontImage, 0, 0, coordinate.width, coordinate.height);
					}
					else{
						ctx.drawImage(frontImage, 0, 0);
					}
					
				};
			}
		};

		/*
		 * Swipe the canvas to show view
		 */
		$scope.swipecanvas = function(currentIndex, increment){
			var newIndex = currentIndex + increment;
			
			if(newIndex != 0 && newIndex <= 4){
				console.log("swipe perform");
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

			for(var index=1; index <=4; index++){
				loadImages(config.productImagePath+ $scope.customizeObject.product.id+ "_" +index +".png", "", 1, 'mainImage_'+ face[index]);
			}

			angular.element(document.getElementById('bottom-panel'))[0].setAttribute("style", "width:" + $window.innerWidth + "px;");

 		};


 		/*
 		 * Excute at start up
 		 */
 		initlise();


		// Excute when section is changed
		$rootScope.$on( "eventLoadSectionData", function ( event, args ) {
			
			// Create mapping for of event to component
			var HashArray = {};
			HashArray[config.section.PATCH] = config.sectionImgs.PATCH;
			HashArray[config.section.COLOR] = config.sectionImgs.COLOR;
			HashArray[config.section.PATTEREN] = config.sectionImgs.PATTEREN;
			HashArray[config.section.ARTWORK] = config.sectionImgs.ARTWORK;		
			
			// Set component prperty and value 
			$scope.customizeObject.type = args.tabName;
			$scope.customizeObject.data = HashArray[args.tabValue];
			$scope.customizeObject.subType = args.subTabName;

			if($scope.customizeObject.selectedValue[args.tabName]){
				if(args.subTabName){
					if($scope.customizeObject.selectedValue[args.tabName][args.subTabName]){
						$scope.processImage({
							type: args.tabName,
							subType: args.subTabName,
							value: $scope.customizeObject.selectedValue[args.tabName][args.subTabName]
						});
					}
				}
				else{
					$scope.processImage({
						type: args.tabName,
						subType: args.subTabName,
						value: $scope.customizeObject.selectedValue[args.tabName]
					});
				}				
			}
		});


		/*
		 * Excute on every image process
		 */
		$scope.processImage = function (option){
			console.log(option, $scope.customizeObject.selectedValue);
			var temp = $scope.customizeObject.selectedValue[option.type] || {};
			if(option.subType){				
				temp[option.subType] = option.value;
				$scope.customizeObject.selectedValue[option.type] = temp;
			}
			else{
				$scope.customizeObject.selectedValue[option.type] = option.value;
			}

			console.log("process Image", $scope.customizeObject.selectedValue);
			if(config.conponentType.COLOR == option.type){
				changeColor(option.type, option.subType);
			}
			else if(config.conponentType.PATTEREN == option.type){
				changePattern(option.type, option.subType);
			}
			else if(config.conponentType.PATCH == option.type){
				changePattern(option.type, option.subType);
			}
		}
		

		/*
		 * Change color of Image
		 */		
		changeColor = function(type, subType){
			var canvas = angular.element(document.getElementById("layer3_color"))[0];
			var ctx = canvas.getContext("2d");
			
			// Clear previous pattern
			ctx.clearRect(0 ,0 , 295, 450);
			//for(var index=1; index <=4; index++){
				//loadImages("", $scope.customizeObject.selectedValue[type], 1, 'layer3_color', { width : 295, height: 450})
				//loadImages($scope.customizeObject.selectedValue[type], config.productImagePath+ $scope.customizeObject.product.id+ "_" +index +".png", 1, 'mainImage_'+ face[index], { width : 0, height: 0})
			//}

			if(subType){
				loadImages("", $scope.customizeObject.selectedValue[type][subType], 1, 'layer3_color', { width : 295, height: 450})
			}
			else{
				loadImages("", $scope.customizeObject.selectedValue[type], 1, 'layer3_color', { width : 295, height: 450})
			}
			
		};


		/*
		 * Change color of Pattern
		 */
		changePattern = function(type, subType){

			var canvas = angular.element(document.getElementById("layer2_pattern"))[0];
			var ctx = canvas.getContext("2d");

			// Clear previous pattern
			ctx.clearRect(0 ,0 , 295, 450);
			if(subType){
				loadImages("", $scope.customizeObject.selectedValue[type][subType], 0.7, 'layer2_pattern', { width : 295, height: 450});
			}
			else{
				loadImages("", $scope.customizeObject.selectedValue[type], 0.7, 'layer2_pattern', { width : 295, height: 450});
			}			
		};
				
	}]);
})();
