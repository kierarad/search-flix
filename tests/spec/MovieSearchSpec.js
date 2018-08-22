describe("MovieSearch", function() {
  var movieSearch;
  var request;

  beforeEach(function() {
    jasmine.Ajax.install();

    movieSearch = new MovieSearch();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("should be able to make request to get movies with the search term", function() {
    movieSearch.getMovies("fab");
    request = jasmine.Ajax.requests.mostRecent();

    expect(request.url).toBe('http://www.omdbapi.com/?apikey=&s=fab');
    expect(request.method).toBe('GET');
  });

  it("should display error if response includes an error", function() {
    movieSearch.getMovies("f");
    request = jasmine.Ajax.requests.mostRecent();
    request.respondWith(TestResponses.getMovies.successWithError);

    expect(document.getElementById("error-message").innerText).toMatch(/Test Error Message/);
  });

  it("should create movie tile for each movie returned", function() {
    movieSearch.getMovies("fab");
    request = jasmine.Ajax.requests.mostRecent();
    request.respondWith(TestResponses.getMovies.successWithResults);


    expect(document.getElementsByClassName("tile").length).toBe(3);
  });
});
