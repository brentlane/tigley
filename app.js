
var theApp = angular.module('theApp',[]);

theApp.controller('mainController', ['$scope', function mainController($scope){

    $scope.selectedMovie = "none";
    $scope.movies=["ironman", "darkcity", "angelheart", "spartacus"];

    $scope.anotherValue = function(){
        return "another value";
    }
 /*
    $scope.$watch('selectedMovie', function(){
       prompt("movie changed")
    });
   */

}]);

theApp.controller('customController1',[ function customController1($scope){

}]);

theApp.directive('customButtons', function(){
    return{
        //replace: true,
        restrict: 'E',
        scope: {
            //replace: true,
            options: '=',
            selected: '='
        },
        link: function($scope){
            $scope.activate = function(option){
                //prompt(option);
                $scope.selected = option;
            };
        },
        //templateUrl: "templateFilePath",
        template:
            "<button class='{{addlClasses}}' " +
            "ng-repeat='option in options' " +
            "ng-click='activate(option)'>{{option}}" +
            "</button>"

    };
});



angular.module('theApp.values', []).
    value('version', '0.1').
    value('releaseLevel', 'alpha');

