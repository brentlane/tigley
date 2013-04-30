
var theApp = angular.module('theApp',[]);

theApp.controller('mainController', ['$scope', 'movieServices', function mainController($scope, movieServices){

    //   $scope.selectedMovie;
    $scope.movies = movieServices.getMovieList();

    var callbacks = $scope.movieCallbacks = {};
    callbacks.setActive = function(movie){
        $scope.selectedMovie = movie;
        var m_info = movieServices.getMovieInfo(movie);
        $scope.synopsis = m_info.synopsis;
        $scope.quote = m_info.quote;
        $scope.ratingLevel = m_info.rating;
        $scope.ratingColor = movieServices.getMovieColor(m_info.rating);
    }

    callbacks.getActive
        = function(){
        return $scope.selectedMovie;
    }

    callbacks.titleText = function(movie){
        console.log("movie: " + movie)
        var m_info = movieServices.getMovieInfo(movie);
        return m_info.tagline;
    }

}]);


theApp.factory('movieServices',["$rootScope", function($rootScope){

    var movieDB = {
        "Dark City": {
            synopsis: "A man struggles with memories of his past, including a wife he cannot remember, in a nightmarish world with no sun and run by beings with telekinetic powers who seek the souls of humans."
            ,quote:"Dr. Schreber: Remember John, never talk to strangers!"
            ,rating:"R"
            ,tagline:"a film nior favorite"
        },
        "Ironman":{
            synopsis:"When wealthy industrialist Tony Stark is forced to build an armored suit after a life-threatening incident, he ultimately decides to use its technology to fight against evil."
            ,quote:"Tony Stark: I'd like to show you firsthand."
            ,rating:"PG13"
            ,tagline: "Tony Stark, nuf said"

        },
        "Angel Heart": {
            synopsis:"Harry Angel has a new case, to find a man called Johnny Favourite. Except things aren't quite that simple, and Johnny doesn't want to be found. Let's just say that, amongst the period detail and beautiful scenery, it all gets really, really nasty."
            ,quote:"Louis Cyphre: The flesh is weak, Johnny. Only the soul is immortal."
            ,rating:"R"
            ,tagline: "the young Mickie Rourke"

        },
        "Spartacus: 'Blood and Sand'":{
            synopsis:"Before Spartacus struck down his first opponent in the arena, there were many gladiators who passed though the gates onto the sand.'"
            ,quote:"Aurelia: He was not a perfect man; but he was mine! He was mine!"
            ,rating:"Unrated"
            ,tagline: "wicked and intense"
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

    that.getMovieColor = function(rating){
        var color;
        switch(rating){
            case "PG13":
                color = "green";
                break;
            case "R":
                color = "orange";
                break;
            case "Unrated":
                color = "red";
                break;
            default:
                color = "blue";
                break;
        }
        return color;
    }

    return that;

}]);





angular.module('theApp.values', []).
    value('version', '0.1').
    value('releaseLevel', 'alpha');

