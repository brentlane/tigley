
var theApp = angular.module('theApp',[]);

theApp.controller('mainController', ['$scope', 'movieServices', function mainController($scope, movieServices){

    $scope.selectedMovie = "none";
    $scope.movies=["Ironman", "Darkcity", "Angelheart", "Spartacus"];
    $scope.movies = movieServices.getMovieList();

    var callbacks = $scope.callbacks = {};
    callbacks.setValue = function(movie){
        $scope.selectedMovie = movie;
       var m_info = movieServices.getMovieInfo(movie);
       $scope.synopsis = m_info.synopsis;
       $scope.quote = m_info.quote;
    }

    $scope.movieCallbacks = function(){
          return $scope.callbacks;
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
            selected: '=',
            handlers: '=',
            addlClasses: '@'
        },
        link: function($scope, elm, attrs){
            $scope.activate = function(option){
                var callbacks = $scope.handlers;
                console.log("callbacks: " + callbacks.setValue)
                callbacks.setValue(option);
                //var setter = callbacks().setValue;
                //console.log("setter: " + setter)
                //setter("WUBBA");

                //$scope.selected = option;
            };
        },
        //templateUrl: "templateFilePath",
        template: "<button class='cust-button {{addlClasses}}' " +
            "ng-repeat='option in options' " +
            "ng-class='{active: option == selected}'" +
            "ng-click='activate(option)'>" +
            "{{option}}" +
            "</button>"

    };
});

theApp.factory('movieServices',["$rootScope", function($rootScope){

    var movieDB = {
        "Dark City": {
            synopsis: "A man struggles with memories of his past, including a wife he cannot remember, in a nightmarish world with no sun and run by beings with telekinetic powers who seek the souls of humans."
            ,quote:"Dr. Schreber: Remember John, never talk to strangers!"
        },
        "Ironman":{
            synopsis:"When wealthy industrialist Tony Stark is forced to build an armored suit after a life-threatening incident, he ultimately decides to use its technology to fight against evil."
            ,quote:"Tony Stark: I'd like to show you firsthand."

        },
        "Angel Heart": {
            synopsis:"Harry Angel has a new case, to find a man called Johnny Favourite. Except things aren't quite that simple, and Johnny doesn't want to be found. Let's just say that, amongst the period detail and beautiful scenery, it all gets really, really nasty."
            ,quote:"Louis Cyphre: The flesh is weak, Johnny. Only the soul is immortal."

        },
        "Spartacus: 'Blood and Sand'":{
            synopsis:"Before Spartacus struck down his first opponent in the arena, there were many gladiators who passed though the gates onto the sand.'"
            ,quote:"Aurelia: He was not a perfect man; but he was mine! He was mine!"
        }
    };
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

