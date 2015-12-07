(function () {

    app.directive('customCheckBox', function () {

        return {
            restrict: 'E',            
            templateUrl: "./app/directives/utility/custom-checkbox.html",
            scope: { 
                ctype: "=componenttype",
                csource: "=componentcontent",
                cvalue: "=componentvalue",
                excute : "&call"
            },
            controller: "CustomCheckboxController",
            link: function (scope, element, attrs) {
               
            }         
        }
    });

})();

