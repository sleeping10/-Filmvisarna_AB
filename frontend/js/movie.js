function renderMovie(cssSelector, movie) {
  let html = "";
  html += '<div class="movieTrailerContainer">';
  html += '<div class="box" id="movie-box">';
  html += '<div id="box-img" class="box-img" >';
  html += '<img src="./resources/' + movie.image2 + '" alt="" />';
  html += "</div>";
  html += '<h3 id="h3">' + movie.titel + "</h3>";
  html += '<h3 id="h3">' + "Director: " + movie.director + "</h3>";
  html += '<h3 id="h3">' + "Actors: " + movie.actors + "</h3>";
  html += '<h3 id="h3">' + "Age Limit: +" + movie.ageLimit + "</h3>";
  html += '<h3 id="h3">' + "Movie's language: " + movie.language + "</h3>";
  html += "<span>" + movie.duration + " / " + movie.genre + "</span>";
  html += "</div >";
  html += '<div class="video-box">';
  html += '<iframe class="responsive-iframe" src=' + movie.trailer + ">";
  html += "</iframe>";
  html += "</div >";
  html += "</div >";

  return html;
}

async function showMovieById(movieId) {
  document.querySelector("main").innerHTML = renderMovie(
    ".movieTrailerContainer",
    await getData("/api/allActiveMovies/" + movieId)
  );
  console.log(
    (document.querySelector("main").innerHTML = renderMovie(
      ".movieTrailerContainer",
      await getData("/api/allActiveMovies/" + movieId)
    ))
  );
}