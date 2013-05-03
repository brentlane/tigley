
theApp.directive('customButtons', function(){
    return{
        //replace: true,
        restrict: 'E',
        scope: {
            options: '=',
//           selected: '=',
            handlers: '=',
            addlClasses: '@'

        },
        controller: function($scope){
            $scope.activate = function(option){
                var callbacks = $scope.handlers;
                callbacks.setActive(option);
            };

            // $scope.selected = option;

            $scope.currentlyActive = function(){
                var callbacks = $scope.handlers;
                return callbacks.getActive();
            }

            $scope.getTitle = function(option){
                console.log("option: " + option)
                var callbacks = $scope.handlers;
                return callbacks.titleText(option);
            }

        },
        // see the file, button_partial.html for a better read, but
        // need to use the inline template since there's no web server
        template: "<button class='cust-button {{addlClasses}}' " +
            "ng-repeat='option in options' " +
            "ng-class='{active: option == currentlyActive()}'" +
            "title='{{getTitle(option)}}'" +
            "ng-click='activate(option)'>" +
            "{{option}}" +
            "</button>"

    };
});

