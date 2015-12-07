(function(){

	app.controller("MainCustomizeController", ['$scope', '$rootScope', function( $scope, $rootScope ) {	

		/*
		 * Hide navigation
		 */
		$scope.hideSideMenu = function(tabbedValue){
			
			// Notify the change of section
			$rootScope.$broadcast("eventHideNavbar", { "nav": tabbedValue });
		};
			
	}]);
})();