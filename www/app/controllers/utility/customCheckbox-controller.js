(function(){
	app.controller("CustomCheckboxController", [ '$scope' , '$rootScope', '_', function( $scope, $rootScope, _ ) {
	
	$scope.model ={};

	/*
	 * Change selected option and populate it in parenet controller
	 */
	$scope.changeOptionValue = function(index, image){
		console.log(index, image);
		$scope.model.isSelected = index;
		$scope.cvalue = image;
		// 		//if($scope.cvalue[$scope.ctype.type]){
			// if($scope.ctype.subType){
			// 	$scope.cvalue = image;
			// 	$scope.csource.indexOf($scope.cvalue[$scope.ctype.type][$scope.ctype.subType]);        
			// }
			// else{
			// 	$scope.csource.indexOf($scope.cvalue[$scope.ctype.type]);        
			// }			
		//}
		$scope.excute({"option" : {"value":$scope.cvalue, "type": $scope.ctype.type, "subType": $scope.ctype.subType}});
	};

	/*
	 * Select value in directive
	 */
	$scope.$watch("ctype", function(){	
		console.log($scope.cvalue);
		var tempCtype = angular.fromJson($scope.cvalue);
		console.log("Wtach", tempCtype , $scope.ctype);
		if(tempCtype[$scope.ctype.type]){
			if(tempCtype[$scope.ctype.type][$scope.ctype.subType]){
				$scope.model.isSelected = $scope.csource.indexOf(tempCtype[$scope.ctype.type][$scope.ctype.subType]);        
			}
			else{
				$scope.model.isSelected = $scope.csource.indexOf(tempCtype[$scope.ctype.type]);        
			}			
		}
		else{
			$scope.model.isSelected = -1;
		}			
	});

	}]);
})();