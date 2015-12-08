(function(){
	app.controller("NavigationController", [ '$scope' , '$rootScope', 'sharedProperties', function( $scope, $rootScope, sharedProperties ) {
	
		if($scope.getContext == 1){
			$scope.subNavigation = [
			{
				"name": config.conponentType.PATCH,//"Patch",
				"tabbedValue": config.section.PATCH,
				"icon": "glyphicon glyphicon-home",
				"subMode": [
					{
						"name" : config.conponentType.MAINFRONTCENTER,
						"tabbedValue" : config.section.MAINFRONTCENTER,
						"icon" : ""
					},
					{
						"name" : config.conponentType.MAINBACKCENTER,
						"tabbedValue" : config.section.MAINBACKCENTER,
						"icon" : ""
					},
					{
						"name" : config.conponentType.ELBOWRIGHT,
						"tabbedValue" : config.section.ELBOWRIGHT,
						"icon" : ""
					},
					{
						"name" : config.conponentType.ELBOWLEFT,
						"tabbedValue" : config.section.ELBOWLEFT,
						"icon" : ""
					},
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
				"icon":"glyphicon glyphicon-edit",
				"subMode": [
					{
						"name" : config.conponentType.CUSTOUMIMAGE,
						"tabbedValue" : config.section.CUSTOUMIMAGE,
						"icon" : ""
					},
					{
						"name" : config.conponentType.CUSTOUMTEXT,
						"tabbedValue" : config.section.CUSTOUMTEXT,
						"icon" : ""
					}
				]
			}
			];
		}

		/*
		 * Load images for every sub section
		 */
		$scope.getTabData = function(tab){			

			if( !tab.subMode || tab.subMode.length == 0 ){

				$scope.navCollapsed = false;

				// Set properties
				setSharedProperties( tab.name, "" );

				// Notify the change of section
				$rootScope.$broadcast("eventLoadSectionData", { "tabValue": tab.tabbedValue, "tabName": tab.name, "subTabName": "", "subTabValue": "" });
			}
			else{
				tab.showSubMenu = ! tab.showSubMenu;
			}
			
		};

		$scope.getSubTabData = function(tab, subTab){

			$scope.navCollapsed = false;

			// Set properties
			setSharedProperties( tab.name, subTab.name );

			// Notify the change of section
			$rootScope.$broadcast("eventLoadSectionData", { "tabValue": tab.tabbedValue, "tabName": tab.name, "subTabName": subTab.name, "subTabValue": subTab.tabbedValue });
		};

		// // Hide navigation bar
		// $rootScope.$on("eventHideNavbar", function( events, args){
		
		// 	if($scope.getContext == args.nav){
		// 		$scope.navCollapsed = false;
		// 	}
			
		// });
		
		/*
		 * Reset the canvas
		 */
		$scope.reset = function(){
			$rootScope.$broadcast("eventResetCanvas");
		};

		/* 
		 *  Set Properties in service
		 */
		setSharedProperties =  function(mode, submode){
			sharedProperties.setMode(mode);
			sharedProperties.setSubMode(submode);
		};
		
		
	}]);
})();