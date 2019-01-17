require.config({
  shim: {
    papaparse: {
      exports: "Papa"
    }
  },

  paths: {
    papaparse: "./libs/papaparse/4.6.0/papaparse.min"
  }
});

define(["papaparse"], function(Papa) {
  "use strict";

  function loadMoviesToStorage(filePath, callback) {
    Papa.parse(filePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(result) {
        saveMoviesToStorage(result.data);
        callback();
      }
    });
  }

  function saveMoviesToStorage(moviesData) {
    moviesData.forEach(movieData => {
      movieData.genres = movieData.genres.split(",");
      movieData.casts = movieData.casts.split(",");
      movieData.directors = movieData.directors.split(",");
    });
    let movies = {};
    moviesData.forEach(movieDate => {
      movies[movieDate.id] = Object.assign({}, movieDate);
    });
    localStorage.setItem("moviesStorage", JSON.stringify(movies));
  }

  return {
    loadMoviesToStorage: loadMoviesToStorage
  };
});
