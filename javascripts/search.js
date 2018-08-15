(function($){
  "use strict";

  function MovieSearch() {
    var getMovies = function getMovies(searchTerm) {
      $.ajax('http://www.omdbapi.com/', {
        method: 'GET',
        data: {
          'apikey': 'aba065d3',
          's': searchTerm
        }
      }).done(function(r) {
        if (r.Response === "False" && r.Error){
          document.getElementById("error-message").innerText = r.Error;
        }

        if (r.Response === "True"){
          var container = document.getElementById("movie-tiles");
          for (var movieData of r.Search) {
            var tile = createMovieTile(movieData);
            container.appendChild(tile);
          }
        }
      }).fail(function(r) {
        console.log(r.responseJSON.Error);
      });
    };

    var createMovieTile = function createMovieTile(movieData) {
      return document.createElement("div");
    };

    return {
      getMovies: getMovies
    };
  };

  window.MovieSearch = MovieSearch;

})(jQuery);
