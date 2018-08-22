(function($){
  "use strict";

  function MovieSearch() {
    const APIKEY = '';
    let lastTerm = '';

    this.waitForInput= (searchTerm) => {
      lastTerm = searchTerm;
      setTimeout(() => {
        if (lastTerm === searchTerm) {
          getMovies(searchTerm);
        }
      }, 500);
    };


    this.init = () => {
      hide(document.querySelector(".error-message"));
      addMovies(initData);
    };

    const hide = element => { element.classList.add("hidden"); };
    const show = element => { element.classList.remove("hidden"); };

    const getMovies = (searchTerm) => {
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
           }).done(r => {
            if (r.Response === "False" && r.Error) {
              showError(r.Error);
            }

            if (r.Response === "True") {
              addMovies(r.Search);
            }
          }).fail(r => {
            console.log(r.responseJSON.Error);
          });
      }
    };

    const getDetails = tile => {
      const detailsContainer = tile.querySelector(".details");
      if (detailsContainer.childElementCount) {
        show(detailsContainer);
        return false;
      }

      const imdbID = tile.dataset.id;
      if (imdbID === "") {
        return false;
      }

      $.ajax('http://www.omdbapi.com/', {
        method: 'GET',
        data: {
          'apikey': APIKEY,
          'i': imdbID
        }
      }).done(r => {
        if (r.Response === "True") {
          showDetails(r, detailsContainer);
        }
      }).fail(r => {
        console.log(r.responseJSON.Error);
      });
    }

    const showDetails = (details, detailsContainer) => {
      const topics = ["Title", "Year", "Genre", "Director", "imdbRating"];
      for (const topic of topics) {
        const infoDiv = document.createElement("div");
        infoDiv.appendChild(document.createTextNode(topic + ": " + details[topic]));
        detailsContainer.appendChild(infoDiv);
      }
      show(detailsContainer);
    };


    const addMovies = movies => {
      hide(document.querySelector(".error-message"));
      const current = document.querySelector(".tiles");
      const newContainer = document.createElement("div");
      newContainer.classList.add("tiles");

      for (const movieData of movies) {
        const tile = createMovieTile(movieData);
        newContainer.appendChild(tile);
      }

      current.replaceWith(newContainer);
    };

    const createMovieTile = movieData => {
      const tileTemplate = document.querySelector(".tile");
      const tile = tileTemplate.cloneNode(true);

      removeChildren(tile.querySelector(".details"));
      tile.addEventListener("mouseenter", function(e) { e.stopPropogation; getDetails(this); });
      tile.addEventListener("mouseleave", function(e) { e.stopPropogation; hide(this.querySelector(".details")); });
      tile.setAttribute("data-id", movieData.imdbID);
      tile.querySelector(".poster img").src = movieData.Poster;
      tile.querySelector(".title").innerText = movieData.Title;
      tile.querySelector(".type").innerText = movieData.Type;

      return tile;
    };

    const removeChildren = parent => {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }

    const showError = message => {
      const errContainer = document.querySelector(".error-message");
      removeChildren(errContainer);
      errContainer.appendChild(document.createTextNode(message));
      show(errContainer);
      hide(document.querySelector(".tiles"));
    };
  };

  window.MovieSearch = MovieSearch;
})(jQuery);
