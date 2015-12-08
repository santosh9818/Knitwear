
( function(){

	app.controller( "CustomizeController", [ '$scope', '$rootScope', '$location', '$window', 'sharedProperties', function ( $scope , $rootScope, $location, $window, sharedProperties) {	
		
		
        /********************** View Model Variable Initilisation *************************/

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

		
		/*********************** Window Events ***********************/

		/*
         * set width of bottom panel on window resize
         */
        $window.onresize = function (event) {
        	//$scope.customizeObject.width = $window.innerWidth;
        	angular.element(document.getElementById('bottom-panel'))[0].setAttribute("style", "max-width:" + $window.innerWidth + "px !important;");
        };


		/*********************** Internal Functions of controller ***********************/

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
				ctx.clearRect(coordinate.startX, coordinate.startY, coordinate.width, coordinate.height);
				// Back image set up
				backImage.src = baseImage;
				backImage.onload = function() {
					ctx.drawImage(backImage, coordinate.startX, coordinate.startY, coordinate.width, coordinate.height);
				};
			}
			
			// excute only if base image exist
			if(foreImage){
				// Front image set up
				frontImage.src = foreImage;		
				frontImage.onload = function() {		
					ctx.globalAlpha = alphaValue;
					if(coordinate.width && coordinate.height){
						ctx.drawImage(frontImage, coordinate.startX, coordinate.startY, coordinate.width, coordinate.height);
					}
					else{
						ctx.drawImage(frontImage, coordinate.startX, coordinate.startY);
					}
					
				};
			}
		};

		/*
		 * set patches on patch canvas
		 */
		SetPatches = function (baseImage, foreImage, alphaValue, canvas, coordinate, baseCoordinate) {
			console.log(coordinate, baseCoordinate);
			var canvas = angular.element(document.getElementById(canvas))[0];
			var ctx = canvas.getContext("2d");

			var backImage = new Image();
			var frontImage = new Image();

			ctx.clearRect(coordinate.startX, coordinate.startY, 295, 450 );//coordinate.width, coordinate.height);

			// excute only if base image exist
			if(baseImage){								
				// Back image set up
				backImage.src = baseImage;

				backImage.onload = function() {
					if(baseCoordinate.width && baseCoordinate.height){
						ctx.drawImage(backImage, coordinate.startX, coordinate.startY, baseCoordinate.width, baseCoordinate.height);
					}
					else{
						ctx.drawImage(backImage, coordinate.startX, coordinate.startY);//, 200, 250);//for 3 = 100, 150);
					}
					
					
					if(foreImage){

						// Front image set up
						frontImage.src = foreImage;	

						frontImage.onload = function() {
							if(coordinate.width && coordinate.height){
								ctx.drawImage(frontImage, coordinate.startX, coordinate.startY, coordinate.width, coordinate.height);										
							}
							else{
								ctx.drawImage(frontImage, coordinate.startX, coordinate.startY);										
							}							
							
							// excute only if base image exist
							var mainImage = ctx.getImageData(coordinate.startX, coordinate.startY, 295, 450);//coordinate.width, coordinate.height);
							var mainImageData = mainImage.data;
							for(var i = 0; i < mainImageData.length; i += 4) {
							    if(mainImageData[i] == 255 && mainImageData[i+1] == 255 && mainImageData[i+2]== 255 ){
							      	mainImageData[i] = 0;
							      	mainImageData[i+1] = 0;
							      	mainImageData[i+2] = 0;
							     	mainImageData[i+3] = 0;
							    }
							}
							ctx.putImageData(mainImage, coordinate.startX, coordinate.startY);	
						};
							
					}
				};
			}
		};


		/*
		 * Excute controller dependency
		 */
		initlise = function(){
			var url = $location.path();
			var productId = url.slice(-1);
 			
 			$scope.customizeObject.product = _.findWhere( config.productImages, { "id" : parseInt(productId) } );

			for(var index=1; index <=4; index++){
				loadImages(config.productImagePath+ $scope.customizeObject.product.id+ "_" +index +".png", "", 1, 'mainImage_'+ face[index],{ startX: 0, startY:0, width : 295, height: 450});
			}

			angular.element(document.getElementById('bottom-panel'))[0].setAttribute("style", "max-width:" + $window.innerWidth + "px !important;");

 		};

		/*
		 * Change color of Image
		 */		
		changeColor = function(type, subType){

			// Refernece the canvas
			var canvas = angular.element(document.getElementById("layer3_color"))[0];
			var ctx = canvas.getContext("2d");
			
			// Clear previous pattern
			ctx.clearRect(0 ,0 , 295, 450);
			
			if(subType){
				loadImages("", $scope.customizeObject.selectedValue[type][subType], 1, 'layer3_color', { startX: 0, startY:0, width : 295, height: 450});
			}
			else{
				loadImages("", $scope.customizeObject.selectedValue[type], 1, 'layer3_color', { startX: 0, startY:0, width : 295, height: 450});
			}
			
		};

		/*
		 * Change color of Pattern
		 */
		changePattern = function(type, subType){

			// Refernece the canvas
			var canvas = angular.element(document.getElementById("layer2_pattern"))[0];
			var ctx = canvas.getContext("2d");

			// Clear previous pattern
			ctx.clearRect(0 ,0 , 295, 450);
			if(subType){
				loadImages("", $scope.customizeObject.selectedValue[type][subType], 0.7, 'layer2_pattern', { startX: 0, startY:0, width : 295, height: 450});
			}
			else{
				loadImages("", $scope.customizeObject.selectedValue[type], 0.7, 'layer2_pattern', { startX: 0, startY:0, width : 295, height: 450});
			}			
		};

		/*
		 * Change color of Pattern
		 */
		changePatch = function(type, subType){

			// Seteup configuration object for canvas
			var subPatch = {};
			subPatch[config.conponentType.MAINFRONTCENTER] = "layer4_patch";
			subPatch[config.conponentType.MAINBACKCENTER] = "layer5_patch";
			subPatch[config.conponentType.ELBOWRIGHT] = "layer6_patch";
			subPatch[config.conponentType.ELBOWLEFT] = "layer7_patch";


			var basePatch = {};
			basePatch[config.conponentType.MAINFRONTCENTER] = {
				"image" : config.patchImages.MAINFRONTCENTER,
				"active": 1,
				"frontCoordinate": { startX :60, startY:105, width :0, height: 0},
				"baseCoordinate" : {width :165, height: 380}
			};
			basePatch[config.conponentType.MAINBACKCENTER] ={
				"image" : config.patchImages.MAINBACKCENTER,
				"active": 2,
				"frontCoordinate": { startX :60, startY:93, width :0, height: 0},
				"baseCoordinate" : {width :160, height: 380}
			}; 
			basePatch[config.conponentType.ELBOWRIGHT] = {
				"image" : config.patchImages.ELBOWRIGHT,
				"active": 3,
				"frontCoordinate": { startX :137, startY:102, width :0, height: 0},
				"baseCoordinate" : {width :100, height: 150}
			};
			basePatch[config.conponentType.ELBOWLEFT] = {
				"image" : config.patchImages.ELBOWLEFT,
				"active": 4,
				"frontCoordinate": { startX :47, startY:118, width :0, height: 0},
				"baseCoordinate" : {width :75, height: 150}
			};

			// Refernece the canvas
			var canvas = angular.element(document.getElementById(subPatch[subType]))[0];
			var ctx = canvas.getContext("2d");
			
			// set visibilty of base image on basis of patch type
			$scope.customizeObject.visibleCanvas = face[basePatch[subType].active];
			
			var url = $location.path();
			var productId = url.slice(-1);

			if(subType){
				SetPatches( $scope.customizeObject.selectedValue[type][subType], config.productImagePath + productId + basePatch[subType].image, 1, subPatch[subType], basePatch[subType].frontCoordinate, basePatch[subType].baseCoordinate);
				
			}

		};

		/*
		 * Clear canvas
		 */
		clearCanvas = function(canvas){
			var canvas = angular.element(document.getElementById(canvas))[0],
				ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, 295, 450);
		};

		/*
		 * Reset the canvas
		 */
		resetCanvas = function(){
			var mode = sharedProperties.getMode(),
				submode =  sharedProperties.getSubMode(),
				canvas,
				canvasHash = [];
			canvasHash[config.conponentType.COLOR] = "layer3_color";
			canvasHash[config.conponentType.PATTEREN] = "layer2_pattern";
			canvasHash[config.conponentType.PATCH] = [];
			canvasHash[config.conponentType.PATCH][config.conponentType.MAINFRONTCENTER] = "layer4_patch";
			canvasHash[config.conponentType.PATCH][config.conponentType.MAINBACKCENTER] = "layer5_patch";
			canvasHash[config.conponentType.PATCH][config.conponentType.ELBOWRIGHT] = "layer6_patch";
			canvasHash[config.conponentType.PATCH][config.conponentType.ELBOWLEFT] = "layer7_patch";
			canvasHash[config.conponentType.ARTWORK] = [];
			canvasHash[config.conponentType.ARTWORK][config.conponentType.CUSTOUMIMAGE] = "layer8_customart";
			canvasHash[config.conponentType.ARTWORK][config.conponentType.CUSTOUMTEXT] = "layer9_customart";
			
			if(submode){
				canvas = canvasHash[mode][submode];
				if( mode == config.conponentType.ARTWORK ){
					clearCanvas(canvas);
				}
				else if($scope.customizeObject.selectedValue[mode][submode]){
					$scope.customizeObject.selectedValue[mode][submode] = "";
					clearCanvas(canvas);
				}
			}
			else{
				canvas = canvasHash[mode];
				if($scope.customizeObject.selectedValue[mode]){
					$scope.customizeObject.selectedValue[mode] = "";
					clearCanvas(canvas);
				}				
			}		
				
		};

		/********************** Broadcast Events of controoler *********************/

		// Excute when section is changed
		$rootScope.$on("eventLoadSectionData", function ( event, args ) {
			
			// Create mapping for of event to component
			var HashArray = {};
			HashArray[config.section.PATCH] = config.sectionImgs.PATCH;
			HashArray[config.section.COLOR] = config.sectionImgs.COLOR;
			HashArray[config.section.PATTEREN] = config.sectionImgs.PATTEREN;
			HashArray[config.section.ARTWORK] = config.sectionImgs.ARTWORK;		

			HashArray[config.section.MAINFRONTCENTER] = 1;	
			HashArray[config.section.MAINBACKCENTER] = 2;	
			HashArray[config.section.ELBOWRIGHT] = 3;	
			HashArray[config.section.ELBOWLEFT] = 4;
			HashArray[config.section.CUSTOUMIMAGE] = 1;	
			HashArray[config.section.CUSTOUMTEXT] = 1;	

			// Set component prperty and value 
			$scope.customizeObject.type = args.tabName;
			$scope.customizeObject.data = HashArray[args.tabValue];
			$scope.customizeObject.subType = args.subTabName;

				

			if($scope.customizeObject.selectedValue[args.tabName]){
				if(args.subTabName){
					//set visibilty of base image on basis of patch type
					$scope.customizeObject.visibleCanvas = face[HashArray[args.subTabValue]];
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
			else{
				if(args.subTabName){
					//set visibilty of base image on basis of patch type
					$scope.customizeObject.visibleCanvas = face[HashArray[args.subTabValue]];
				}
			}
		});

		// Excute for resetting the canvas
		$rootScope.$on("eventResetCanvas", function ( event, args ) {
			resetCanvas();
		});

		/********************** Scope method **************************/

		/*
		 * Swipe the canvas to show view
		 */
		$scope.swipecanvas = function(currentIndex, increment){
			var newIndex = currentIndex + increment;
			
			if(newIndex != 0 && newIndex <= 4){
				console.log("swiping ...");
				$scope.customizeObject.visibleCanvas = face[newIndex];
			};
		};

		
		/*
		 * Excute on every image process
		 */
		$scope.processImage = function (option){
			console.log(option, $scope.customizeObject.selectedValue);

			//Initilaise the objectn
			//Set selected data in model object
			var temp = $scope.customizeObject.selectedValue[option.type] || {};
			console.log("temp", temp, "op", option);
			if(option.subType){				
				temp[option.subType] = option.value;
				$scope.customizeObject.selectedValue[option.type] = temp;
			}
			else{
				$scope.customizeObject.selectedValue[option.type] = option.value;
			}

			// Call methods basis on component to process
			if(config.conponentType.COLOR == option.type){
				changeColor(option.type, option.subType);
			}
			else if(config.conponentType.PATTEREN == option.type){
				changePattern(option.type, option.subType);
			}
			else if(config.conponentType.PATCH == option.type){
				changePatch(option.type, option.subType);
			}
		};

		/*
		 * Load custom Image
		 */
		$scope.loadCustomImage = function(imageStream){

			// Initilise coordinate with default value
			var coordinate = { startX: 120, startY:210, width : 80, height: 80 };

			// Refernece the canvas
			var activeCanvas = "layer8_customart";
			var canvas = angular.element(document.getElementById(activeCanvas))[0];
			var ctx = canvas.getContext("2d");

			//Clear the canvas area
			//ctx.clearRect(coordinate.startX, coordinate.startY, coordinate.width, coordinate.height);
			ctx.clearRect(0, 0, 295, 450);

			//Load image on canvas
			loadImages("", URL.createObjectURL(imageStream), 0.6, activeCanvas, coordinate);
			
		};

		/*
		 * Load custom Text
		 */
		$scope.loadCustomText = function(){

			// Initilise coordinate with default value
			var coordinate = { startX: 120, startY:210, width : 80, height: 80 };  

			// Refernece the canvas
			var activeCanvas = "layer9_customart";
			var canvas = angular.element(document.getElementById(activeCanvas))[0];
			var ctx = canvas.getContext("2d");

			//Clear the canvas area
			//ctx.clearRect(coordinate.startX, coordinate.startY, coordinate.width, coordinate.height);
			ctx.clearRect(0, 0, 295, 450);

			// Drawing text on canvas
			// Font width and font style
			ctx.font = $scope.customizeObject.text.fontSize + "pt " + $scope.customizeObject.text.fontStyle;

			
		   	// Font stroke color
		    ctx.strokeStyle = $scope.customizeObject.text.strokeColor;

		    // write text only when text is exist
		    if($scope.customizeObject.text.label){

		    	//wrapText(ctx, $scope.customizeObject.text.label, coordinate.startX, coordinate.startY, coordinate.width, coordinate.height);
			   	if($scope.customizeObject.text.fontType == "Filled"){

			   		// Font color
			   		ctx.fillStyle = $scope.customizeObject.text.color;

			   		// Write text on canvas
			   		ctx.fillText($scope.customizeObject.text.label, coordinate.startX, coordinate.startY+ coordinate.height/2);

			   	}
			   	else{
			   		// Stroke Text Write
			   		ctx.strokeText($scope.customizeObject.text.label, coordinate.startX, coordinate.startY+ coordinate.height/2);
			   	}
			   	$scope.customizeObject.text.label = "";	
		    }
		    
		   	
		};


		/****************** Initial Page Load Event *********************/

		/*
 		 * Excute at start up
 		 */
 		initlise();
				
	}]);
})();
