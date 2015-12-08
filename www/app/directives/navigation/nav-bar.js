(function () {

    app.directive('navBar', function () {

        return {
            restrict: 'E',            
            templateUrl: './app/directives/navigation/nav.html',
            scope: { 
                getContext: "=type" 
            },
            controller: "NavigationController",
            link: function (scope, element, attrs) {
            }         
        }
    });

})();

