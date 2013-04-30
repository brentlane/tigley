
var theApp = angular.module('theApp',[]);

theApp.controller('mainController', ['$scope', 'movieServices', function mainController($scope, movieServices){

    //   $scope.selectedMovie = "none";
    $scope.movies = movieServices.getMovieList();

    var callbacks = $scope.movieCallbacks = {};
    callbacks.setValue = function(movie){
        movieServices.selected = $scope.selectedMovie = movie;
        var m_info = movieServices.getMovieInfo(movie);
        $scope.synopsis = m_info.synopsis;
        $scope.quote = m_info.quote;
        $scope.ratingLevel = m_info.rating;
        $scope.ratingColor = $scope.getMovieColor(m_info.rating);
    }

    callbacks.getValue = function(){
        return movieServices.selected;
    }

    $scope.getMovieColor = function(rating){
        var color;
        switch(rating){
            case "PG13":
                color = "green";
                break;
            case "R":
                color = "orange"
                break;
            case "Unrated":
                color = "red"
                break
            default:
                color = "blue"
                break;
        }
        return color;
    }

    /*
     $scope.$watch('selectedMovie', function(){
     prompt("movie changed")
     });
     */

}]);


theApp.directive('customButtons', function(){
    return{
        //replace: true,
        restrict: 'E',
        scope: {
            //replace: true,
            options: '=',
            //           selected: '=',
            hoverText: '=',
            handlers: '=',
            addlClasses: '@'

        },
        link: function(scope, elm, attrs){
            scope.activate = function(option){
                var callbacks = scope.handlers;
                callbacks.setValue(option);
            };

            scope.currentlyActive = function(){
                var callbacks = scope.handlers;
                return callbacks.getValue();
            }

            //           elm.css('title', $cope.hoverText);

        },
        //templateUrl: "templateFilePath",
        template: "<button class='cust-button {{addlClasses}}' " +
            "ng-repeat='option in options' " +
            "ng-class='{active: option == currentlyActive()}'" +
            "ng-click='activate(option)'>" +
            "{{option}}" +
            "</button>"

    };
});

theApp.directive( 'moviecoloring', ['movieServices', function(movieServices) {
    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            scope.$watch(movieServices.selected, function(value){
                console.log("at watch " + value);

            });
        }
    }
}]);


theApp.factory('movieServices',["$rootScope", function($rootScope){

    var movieDB = {
        "Dark City": {
            synopsis: "A man struggles with memories of his past, including a wife he cannot remember, in a nightmarish world with no sun and run by beings with telekinetic powers who seek the souls of humans."
            ,quote:"Dr. Schreber: Remember John, never talk to strangers!"
            ,rating:"R"
        },
        "Ironman":{
            synopsis:"When wealthy industrialist Tony Stark is forced to build an armored suit after a life-threatening incident, he ultimately decides to use its technology to fight against evil."
            ,quote:"Tony Stark: I'd like to show you firsthand."
            ,rating:"PG13"

        },
        "Angel Heart": {
            synopsis:"Harry Angel has a new case, to find a man called Johnny Favourite. Except things aren't quite that simple, and Johnny doesn't want to be found. Let's just say that, amongst the period detail and beautiful scenery, it all gets really, really nasty."
            ,quote:"Louis Cyphre: The flesh is weak, Johnny. Only the soul is immortal."
            ,rating:"R"

        },
        "Spartacus: 'Blood and Sand'":{
            synopsis:"Before Spartacus struck down his first opponent in the arena, there were many gladiators who passed though the gates onto the sand.'"
            ,quote:"Aurelia: He was not a perfect man; but he was mine! He was mine!"
            ,rating:"Unrated"
        }
    };
    var selected = "None";
    var movieList = [];
    for( m in movieDB ){
        if(movieDB.hasOwnProperty(m)){
            movieList.push(m);
        }
    }

    var that={};

    that.getMovieList = function(){
        return movieList;
    }

    that.getMovieInfo = function(movie){
        return movieDB[movie];
    }

    return that;

}]);





angular.module('theApp.values', []).
    value('version', '0.1').
    value('releaseLevel', 'alpha');
