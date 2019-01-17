define([], function() {
  "use strict";

  return class Movie {
    constructor(id) {
      let movieInfo = JSON.parse(localStorage.moviesStorage)[id];
      console.log(movieInfo);
      this.id = id;
      this.alt = movieInfo.alt;
      this.alt = movieInfo.alt;
      this.alt = movieInfo.alt;
      this.alt = movieInfo.alt;
      this.alt = movieInfo.alt;
      this.alt = movieInfo.alt;
      this.alt = movieInfo.alt;
    }

    get movieId() {
      return this.id;
    }
  };

  // return {
  //   Movie: Movie
  // };
});
