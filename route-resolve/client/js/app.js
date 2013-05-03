'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.values', 'myApp.directives']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {redirectTo: '/welcome'});
        $routeProvider.when('/welcome', {
            templateUrl: 'partials/welcome.html',
            controller: 'OuterController',
            resolve: {
                resolvePage : ['PageConfigResolver', function(PageConfigResolver) {
                    var result = {
                        page: "Welcome",
                        configs: {
                            header: {
                                size: 'massive',
                                format: 'welcome'
                            },
                            menubar: {visible: true}
                        }
                    };

                    PageConfigResolver.resolved(result);
                }]}
        });
        $routeProvider.when('/neato', {
            templateUrl: 'partials/view1.html',
            resolve: {
                resolvePage : ['PageConfigResolver', function(PageConfigResolver) {
                    var result = {
                        page: "ResourceDashboard",
                        configs: {
                            header: {
                                size: 'normal',
                                format: 'style1'
                            },
                            menubar: {visible: true}
                        }
                    };

                    PageConfigResolver.resolved(result);
                }]}
        });

        $routeProvider.when('/wicked', {
            templateUrl: 'partials/view2.html',
            resolve: {
                resolvePage : ['PageConfigResolver', function(PageConfigResolver) {
                    var result = {
                        page: "Inner",
                        configs: {
                            header: {
                                size: 'normal',
                                format: 'style2'
                            },
                            menubar: {visible: true}
                        }
                    };

                    PageConfigResolver.resolved(result);
                }]}
        });

        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(false);
    }]);

angular.module('myApp.directives', []).
directive('appVersion', ['releaseVersion', function(releaseVersion){
    return{
        restrict: 'A',
        link: function(scope, elm, attrs){
            elm.text(releaseVersion);
        }
    };
}]).directive('ourTeam', ['teamName', function(teamName){
    return{
        restrict: 'A',
        link: function(scope, elm, attrs){
            elm.text(teamName);
        }
    };
}]);

// a simple value service for defaults, etc.
angular.module('myApp.values', []).
    value('releaseVersion', 'Alpha 0.1').
    value('teamName', 'Angular Hackers').
    value('resDashSize', 'small');
