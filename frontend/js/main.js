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

function loadBatman() {
  history.pushState(null, null, "batman");
  router();
}


function featureResponsiveText() {
  var featureTitle = document.querySelector('.featured-title');
  var featureDesc = document.querySelector('.featured-desc');
  var featureContent = document.querySelector('.featured-content');
  var featureBtn = document.querySelector('.featured-button');

  if ($(window).width() > 440) {
    featureTitle.style.marginLeft = "50px";
    featureTitle.style.fontSize = "50px";
    featureDesc.style.paddingLeft = "51px";
    featureContent.style.padding = "50px";
    featureBtn.style.marginLeft = "50px";

  } else {
    featureTitle.style.marginLeft = "0px";
    featureDesc.style.paddingLeft = "0px";
    featureContent.style.padding = "0px";
    featureBtn.style.marginLeft = "0px";
    featureTitle.style.fontSize = "25px";
    featureContent.style.paddingTop = "50px";

  }
}



