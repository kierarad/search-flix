describe("MovieSearch", function() {
  it("should be able to make request to get movies with the search term", function() {
    jasmine.Ajax.install();
    var movieSearch = new MovieSearch();
    movieSearch.getMovies("fab");
    var request = jasmine.Ajax.requests.mostRecent();

    expect(request.url).toBe('http://www.omdbapi.com/?apikey=aba065d3&s=fab');
    expect(request.method).toBe('GET');

    jasmine.Ajax.uninstall();
  });
});
