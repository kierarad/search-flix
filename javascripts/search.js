(function($){
  "use strict";

  function MovieSearch() {
    var getMovies = function getMovies(searchTerm) {
      if (searchTerm === "") {
        return false;
      }

      $.ajax('http://www.omdbapi.com/', {
        method: 'GET',
        data: {
          'apikey': 'aba065d3',
          's': searchTerm
        }
      }).done(function onSuccess(r) {
        if (r.Response === "False" && r.Error) {
          document.getElementById("error-message").innerText = r.Error;
        }

        if (r.Response === "True") {
          var container = document.getElementById("tiles");
          for (var movieData of r.Search) {
            var tile = createMovieTile(movieData);
            container.appendChild(tile);
          }
        }
      }).fail(function onFailure(r) {
        console.log(r.responseJSON.Error);
      });
    };

    var createMovieTile = function createMovieTile(movieData) {
      var tileTemplate = document.querySelector(".tile");
      var tile = tileTemplate.cloneNode(true);
      tile.removeAttribute("style");
      tile.querySelector(".poster img").setAttribute("src", movieData.Poster);
      tile.querySelector(".title").innerText = movieData.Title;
      tile.querySelector(".type").innerText = movieData.Type;

      return tile;
    };

    return {
      getMovies: getMovies
    };
  };

  window.MovieSearch = MovieSearch;

})(jQuery);
