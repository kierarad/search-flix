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

    var getDetails = function getDetails(tile) {
      var detailsContainer = tile.querySelector(".details");
      if (detailsContainer.childElementCount) {
        toggleDetails(detailsContainer);
        return false;
      }

      var imdbID = tile.dataset.id;
      if (imdbID === "") {
        return false;
      }

      $.ajax('http://www.omdbapi.com/', {
        method: 'GET',
        data: {
          'apikey': 'aba065d3',
          'i': imdbID
        }
      }).done(function onSuccess(r) {
        if (r.Response === "True") {
          showDetails(r, detailsContainer);
        }
      }).fail(function onFailure(r) {
        console.log(r.responseJSON.Error);
      });
    }

    var showDetails = function showDetails(details, detailsContainer) {
      var topics = ["Title", "Year", "Genre", "Director", "imdbRating"];
      for (var topic of topics) {
        var infoDiv = document.createElement("div");
        infoDiv.innerText = topic + ": " + details[topic];
        detailsContainer.appendChild(infoDiv);
      }
      toggleDetails(detailsContainer);
    };

    var toggleDetails = function toggleDetails(detailsContainer) {
      detailsContainer.classList.toggle("hidden");
    }

    var addMovies = function addMovies(movies) {
      var current = document.querySelector(".tiles");
      var newContainer = document.createElement("div");
      newContainer.classList.add("tiles");

      for (var movieData of movies) {
        var tile = createMovieTile(movieData);
        newContainer.appendChild(tile);
      }

      current.replaceWith(newContainer);
    };

    var createMovieTile = function createMovieTile(movieData) {
      var tileTemplate = document.querySelector(".tile");
      var tile = tileTemplate.cloneNode(true);
      tile.addEventListener("mouseenter", function(e) { e.stopPropogation; getDetails(this); });
      tile.addEventListener("mouseleave", function(e) { e.stopPropogation; toggleDetails(this.querySelector(".details")); });
      tile.setAttribute("data-id", movieData.imdbID);
      tile.querySelector(".poster img").src = movieData.Poster;
      tile.querySelector(".title").innerText = movieData.Title;
      tile.querySelector(".type").innerText = movieData.Type;

      return tile;
    };

    return {
      getMovies: getMovies,
      init: init
    };
  };

  window.MovieSearch = MovieSearch;
})(jQuery);
