function loadMoviesData(filePath, callback) {
  Papa.parse(filePath, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      moviesData = result.data;
      callback(moviesData);
    }
  });
}

let loadMoviesToStorage = function(moviesData) {
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
};

function loadMovies(filePath) {
  loadMoviesData(filePath, loadMoviesToStorage);
}
