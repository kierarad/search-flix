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
      });
    };

    return {
      getMovies: getMovies
    };
  };

  window.MovieSearch = MovieSearch;

})(jQuery);
