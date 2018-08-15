var TestResponses = {
  getMovies: {
    successWithResults: {
      status: 200,
      responseText: '{"Search": [{"Title": "Kimora: House of Fab", "Year": "2013–", "imdbID": "tt2738084", "Type": "series", "Poster": "https://images-na.ssl-images-amazon.com/images/M/M…DIyMDRjXkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_SX300.jpg"}, {"Title": "The Fab 4: Volume One", "Year": "2011", "imdbID": "tt2238957", "Type": "movie", "Poster": "N/A"}], "totalResults": "2", "Response": "True"}'

    },
    successWithError: {
      status: 200,
      responseText: '{"Response": "False", "Error": "Test Error Message"}'
    }
  }
};
