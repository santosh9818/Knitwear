(function(){
	app.controller("NavigationController", [ '$scope' , '$rootScope', function( $scope, $rootScope ) {
	
		if($scope.getContext == 1){
			$scope.subNavigation = [
			{
				"name": "Home",
				"tabbedValue": config.section.HOME,
				"icon": "glyphicon glyphicon-home"
			},
			{
				"name": "Color",
				"tabbedValue": config.section.COLOR,
				"icon": "glyphicon glyphicon-picture"
			},
			{
				"name":"Patteren",
				"tabbedValue": config.section.PATTEREN,
				"icon":"glyphicon glyphicon-move"
			},
			{
				"name": "Art Work",
				"tabbedValue": config.section.ARTWORK,
				"icon":"glyphicon glyphicon-edit"
			}
			];
		}

		/*
		 * Load images for every sub section
		 */
		$scope.getTabData = function(tabbedValue, tabName){
			
			// Notify the change of section
			$rootScope.$broadcast("eventLoadSectionData", { "tabValue": tabbedValue, "tabName":tabName});
		};
		
	}]);
})();