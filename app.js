
var theApp = angular.module('theApp',[]);

theApp.controller('mainController', ['$scope', function mainController($scope){

    $scope.someValue = 789;

}]);

theApp.controller('customController1',[ function customController1($scope){

}]);

theApp.directive('doSomethingCool', function(){
    return{
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
            addlClasses: '@'
        },
        controller: function($scope){
            $scope.activate = function(option){
                $scope.model = option;
            };
        },
        //templateUrl: "templateFilePath",
        template: "<button type='button' class='btn {{addlClasses}}' " +
            "ng-class='{active: option == model}'" +
            "ng-repeat='option in options' " +
            "ng-click='activate(option)'>{{option}}" +
            "</button>"

    };
});



angular.module('theApp.values', []).
    value('version', '0.1').
    value('releaseLevel', 'alpha');

