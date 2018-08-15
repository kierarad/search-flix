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
          var container = document.getElementById("tiles");
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
      var tile = document.createElement("div");
      tile.setAttribute("class", "tile");

      var poster = document.createElement("div");
      poster.setAttribute("class", "poster");
      poster.setAttribute("alt", "poster");

      var posterImg = new Image();
      posterImg.src = movieData.Poster;
      posterImg.alt = "poster";
      poster.appendChild(posterImg);

      var type = document.createElement("div")
      type.innerText = movieData.Type;
      var title = document.createElement("div")
      title.innerText = movieData.Title;

      tile.appendChild(poster);
      tile.appendChild(type);
      tile.appendChild(title);

      return tile;
    };

    return {
      getMovies: getMovies
    };
  };

  window.MovieSearch = MovieSearch;

})(jQuery);
