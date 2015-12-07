(function(){
	app.controller("CustomCheckboxController", [ '$scope' , '$rootScope', function( $scope, $rootScope ) {
	$scope.model ={};
	//$scope.model.isSelected = '1';
	//$scope.model.isSelected = index;
//	$scope.cvalue = image;

	console.log($scope.model.isSelected);

	/*
	 * Change selected option and populate it in parenet controller
	 */
	$scope.changeOptionValue = function(index, image){
		console.log(index, image);
		$scope.model.isSelected = index;
		$scope.cvalue = image;
		$scope.excute({"option" : {"value":$scope.cvalue, "type": $scope.ctype }});
	};

	}]);
})();