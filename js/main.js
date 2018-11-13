$(document).ready(() => {
   // Listen for input in search bar
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  })
});

// Function to retrieve data from API
function getMovies(searchText){

  // Send request to the API
  axios.get(`http://www.omdbapi.com/?s=${searchText}&apikey=d3561ec4`)
    .then((response) => {
      let movies = response.data.Search;
      let output = '';

      // Loop through results and format in html tags
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center" id="movieContainer">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `
      });
      // Output the results in the results container in index.html
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Session stroage data function
function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

// Function to display info for selected movie
function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  // Make request to API
  axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=d3561ec4`)
    .then((response) => {
      let movie = response.data;

      // Format output in html tags
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div
          <div class="col-md-8">
            <h2 id="movieTitle">${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Back to Search</a>
          </div>
        </div>
      `;

      // Display results in container in movie.html
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
