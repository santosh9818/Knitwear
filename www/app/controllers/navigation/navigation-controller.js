(function(){
	app.controller("NavigationController", [ '$scope' , '$rootScope', function( $scope, $rootScope ) {
	
		if($scope.getContext == 1){
			$scope.subNavigation = [
			{
				"name": config.conponentType.PATCH,//"Patch",
				"tabbedValue": config.section.PATCH,
				"icon": "glyphicon glyphicon-home",
				"subMode": [
					{
						"name" : "Front Vest",
						"tabbedValue" : config.section.MAINFRONTCENTER,
						"icon" : ""
					},
					{
						"name" : "Back Vest",
						"tabbedValue" : config.section.MAINBACKCENTER,
						"icon" : ""
					}
				]
			},
			{
				"name": config.conponentType.COLOR,//"Color",
				"tabbedValue": config.section.COLOR,
				"icon": "glyphicon glyphicon-picture"
			},
			{
				"name": config.conponentType.PATTEREN,//"Pattern",
				"tabbedValue": config.section.PATTEREN,
				"icon":"glyphicon glyphicon-move"
			},
			{
				"name": config.conponentType.ARTWORK,//"Art Work",
				"tabbedValue": config.section.ARTWORK,
				"icon":"glyphicon glyphicon-edit"
			}
			];
		}

		/*
		 * Load images for every sub section
		 */
		$scope.getTabData = function(tab){

			if( !tab.subMode || tab.subMode.length == 0 ){
				// Notify the change of section
				$rootScope.$broadcast("eventLoadSectionData", { "tabValue": tab.tabbedValue, "tabName": tab.name, "subTabName": "", "subTabValue": "" });
			}
			else{
				tab.showSubMenu = ! tab.showSubMenu;
			}
			
		};

		$scope.getSubTabData = function(tab, subTab){

			// Notify the change of section
			$rootScope.$broadcast("eventLoadSectionData", { "tabValue": tab.tabbedValue, "tabName": tab.name, "subTabName": subTab.name, "subTabValue": subTab.tabbedValue });
		};

		// Hide navigation bar
		$rootScope.$on("eventHideNavbar", function( events, args){
		
			if($scope.getContext == args.nav){
				$scope.navCollapsed = false;
			}
			
		});
		
		
	}]);
})();