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
          addMovies(r.Search);
        }
      }).fail(function onFailure(r) {
        console.log(r.responseJSON.Error);
      });
    };

    var init = function init(){
      addMovies(initData);
    };

    var addMovies = function addMovies(movies) {
      var newContainer = document.createElement("div");
      newContainer.setAttribute("id", "tiles");
      newContainer.setAttribute("class", "tiles");

      for (var movieData of movies) {
        var tile = createMovieTile(movieData);
        newContainer.appendChild(tile);
      }

      var current = document.getElementById("tiles");
      current.replaceWith(newContainer);
    };

    var createMovieTile = function createMovieTile(movieData) {
      var tileTemplate = document.getElementById("tile");
      var tile = tileTemplate.cloneNode(true);
      tile.removeAttribute("style");
      tile.querySelector(".poster").style.backgroundImage ="url(" + validateImgURL(movieData.Poster) + ")";
      tile.querySelector(".title").innerText = movieData.Title;
      tile.querySelector(".type").innerText = movieData.Type;

      return tile;
    };

    var validateImgURL = function validateImgURL(url) {
      if (url === "N/A") {
        return "";
      }

      return url;
    };


    return {
      getMovies: getMovies,
      init: init
    };
  };

  window.MovieSearch = MovieSearch;
})(jQuery);
