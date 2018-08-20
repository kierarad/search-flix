(function($){
  "use strict";

  function MovieSearch() {
    const APIKEY = '';

    var hide = function hide(element) {
      element.classList.add("hidden");
    };

    var show = function show(element) {
      element.classList.remove("hidden");
    };

    var getMovies = function getMovies(searchTerm) {
      switch (searchTerm.length) {
        case 0:
          init();
          return false;
        case 1:
          showError("Please narrow your search...")
          return false;
        case 2:
          showError("Please narrow your search...")
          return false;
        default:
          $.ajax('http://www.omdbapi.com/', {
            method: 'GET',
            data: {
              'apikey': APIKEY,
              's': searchTerm
            }
          }).done(function onSuccess(r) {
            if (r.Response === "False" && r.Error) {
              showError(r.Error);
            }

            if (r.Response === "True") {
              addMovies(r.Search);
            }
          }).fail(function onFailure(r) {
            console.log(r.responseJSON.Error);
          });
      }
    };

    var init = function init(){
      hide(document.querySelector(".error-message"));
      addMovies(initData);
    };

    var getDetails = function getDetails(tile) {
      var detailsContainer = tile.querySelector(".details");
      if (detailsContainer.childElementCount) {
        show(detailsContainer);
        return false;
      }

      var imdbID = tile.dataset.id;
      if (imdbID === "") {
        return false;
      }

      $.ajax('http://www.omdbapi.com/', {
        method: 'GET',
        data: {
          'apikey': APIKEY,
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
        infoDiv.appendChild(document.createTextNode(topic + ": " + details[topic]));
        detailsContainer.appendChild(infoDiv);
      }
      show(detailsContainer);
    };


    var addMovies = function addMovies(movies) {
      hide(document.querySelector(".error-message"));
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
      tile.addEventListener("mouseleave", function(e) { e.stopPropogation; hide(this.querySelector(".details")); });
      tile.setAttribute("data-id", movieData.imdbID);
      tile.querySelector(".poster img").src = movieData.Poster;
      tile.querySelector(".title").innerText = movieData.Title;
      tile.querySelector(".type").innerText = movieData.Type;

      return tile;
    };

    var showError = function showError(message) {
      var errContainer = document.querySelector(".error-message");
      while (errContainer.lastChild) {
        errContainer.removeChild(errContainer.lastChild);
      }
      errContainer.appendChild(document.createTextNode(message));
      show(errContainer);
      hide(document.querySelector(".tiles"));
    };

    return {
      getMovies: getMovies,
      init: init
    };
  };

  window.MovieSearch = MovieSearch;
})(jQuery);
