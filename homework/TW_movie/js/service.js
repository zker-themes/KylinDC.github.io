function getMovieDiscuss(movieId, discussType, callback, count = 2, start = 0) {
  $.ajax({
    type: "get",
    url: `https://api.douban.com/v2/movie/subject/${movieId}/${discussType}`,
    dataType: "jsonp",
    jsonp: "callback",
    data: {
      apikey: "0b2bdeda43b5688921839c8ecb20399b",
      start: start,
      count: count,
      client: "",
      udid: ""
    },
    success: function(json) {
      callback(json);
    },
    error: function() {
      console.log(`failed to get movie ${discussType}`);
    }
  });
}

function getMovieDetailInfo(movieId, callback) {
  $.ajax({
    type: "get",
    url: `https://api.douban.com/v2/movie/subject/${movieId}`,
    dataType: "jsonp",
    jsonp: "callback",
    data: {
      apikey: "0b2bdeda43b5688921839c8ecb20399b",
      client: "",
      udid: ""
    },
    success: function(json) {
      callback(json);
    },
    error: function() {
      console.log(`failed to get movie detail information`);
    }
  });
}

function getMovieInfoByID(movieID) {
  let movies = JSON.parse(localStorage.moviesStorage);
  return movies[movieID];
}

function getMoviesInfoByName(movieName) {
  let movies = JSON.parse(localStorage.moviesStorage);

  return Object.values(movies).filter(
    movie => movieName === movie.title || movieName === movie.original_title
  );
}

function getMoviesInfoByGenre(movieGenre) {
  let movies = JSON.parse(localStorage.moviesStorage);

  return Object.values(movies).filter(movie =>
    movie.genres.includes(movieGenre)
  );
}

function searchMovies(searchKey) {
  let idResult = getMovieInfoByID(searchKey);
  let nameResult = getMoviesInfoByName(searchKey);
  let genreResult = getMoviesInfoByGenre(searchKey);

  return idResult
    ? idResult
    : nameResult.length
    ? nameResult
    : genreResult.length
    ? genreResult
    : false;
}

function getMoviesByRange(firstNum, secondNum) {
  if (firstNum > secondNum) {
    [firstNum, secondNum] = [secondNum, firstNum];
  }
  firstNum = firstNum >= 0 ? firstNum : 0;
  secondNum = secondNum <= 249 ? secondNum : 249;

  let movies = JSON.parse(localStorage.moviesStorage);
  return Object.values(movies).slice(firstNum, secondNum + 1);
}

function getMovieBySequence(sequence) {
  sequence = sequence >= 0 ? (sequence <= 249 ? sequence : 249) : 0;

  let movies = JSON.parse(localStorage.moviesStorage);
  return Object.values(movies)[sequence];
}

function getRandomMovies(count) {
  let movies = [];
  for (let i = 0; i < count; i++) {
    let sequence = getRandomNumByRange(0, 249);
    let movie = getMovieBySequence(sequence);
    movies.push(movie);
  }
  return movies;
}

function getRandomNumByRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
