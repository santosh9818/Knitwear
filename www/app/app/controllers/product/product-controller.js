( function(){

	app.controller( "ProductController", [ '$scope', '$rootScope', '$state', function ( $scope , $rootScope, $state) {	

		/*
		 * populate the product object with all products listing from config
		 */
		$scope.productObject = {
			products :config.productImages
		};

		/*
		 * Redirect to particular product for customize
		 */
		$scope.customizeProduct = function(id){
			$state.go('customemain.customize', {"productId": id});
		};

	}]);
})();

