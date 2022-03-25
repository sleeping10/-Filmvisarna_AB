async function getData(restRoute) {
  let rawData = await fetch(restRoute);
  let result = {};
  result = await rawData.json();
  return result;
}

function renderMovieList(cssSelector, list) {
  let html = "";
  for (let movie of list) {
    html += '<div class="box" id=' + movie.id + ">";
    html += "<div id=" + movie.id + "></div>";
    html += '<div id="box-img" class="box-img">';
    html += '<img src="./resources/' + movie.image2 + '" alt="" />';
    html += "</div>";
    html += "<h3>" + movie.titel + "</h3>";
    html += "<span>" + movie.duration + " / " + movie.genre + "</span>";
    html += "</div >";
  }

  document.querySelector(cssSelector).innerHTML = html;
  movieDetails();

  return html;
}

function movieDetails(cssSelector, movie) {
  var items = document.getElementsByClassName("box");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      console.log(items[i]);
      var movieId = items[i].id;
      //not implemented!
      movieshows(movieId);
    });
  }
} async function start() {
  console.log("In Start");
  renderMovieList(
    ".active-movies-container",
    await getData("/api/allActiveMovies")
  );
}

// For the responsive nav


document.querySelector("body").addEventListener("click", function (event) {
  console.log("nav in")
  let navDropDown = event.target.closest(".mobile-nav-dropdown")  
  if (!navDropDown) {
    console.log("inne i if")
    return;

  }
  console.log("primarynav")
  
  const primaryNav = document.querySelector('.primary-navigation');
  const visibility = primaryNav.getAttribute('data-visible');
console.log("nav in in")
  if (visibility === "false") {
    primaryNav.setAttribute('data-visible', true);
    navDropDown.setAttribute('aria-expanded', true);
  } else if (visibility === "true") {
    primaryNav.setAttribute('data-visible', false);
    navDropDown.setAttribute('aria-expanded', false);
  }
  

})


//document.querySelector("body").addEventListener("submit", function (event) {
  
  //event.preventDefault()
  //console.log(event.target.closest("form").getAttribute("name"))


//})
console.log("outsidJJJJJ")
const button1 = document.querySelector(".test1")
function loadBooking() {
  console.log("är inne i button ")
  let route = location.pathname;
console.log(location.pathname);
  
    console.log("in button selector")
    let button = event.target.closest("button")
    if (!button) {
      return
    }
    let name = button.getAttribute("name")
    history.pushState(null, null, "biljetter-" + name)
  router()
}
  
  
/*document.querySelector("body").addEventListener("click", function (event) {
 // let route = location.pathname;
//console.log(location.pathname);
  if (route.includes("booo")) {
     console.log("in button selector")
  let button = event.target.closest("button")
  if (!button) {
    return
  }
  let name = button.getAttribute("name")
  history.pushState(null, null, "biljetter-" + name)
  router()
  }
 */
  
 // alert("trying to buy tickets to" + name)
//})

