document.querySelector('header').addEventListener('click', function (event) {
  // event = an object with info about the event
  // event.target = the innermost HTML-element I clicked
  // closest - a method all HTML-element have
  // that you can send a selector to to see if it matches
  // the element or any of its parents

  let aTag = event.target.closest('a');

  // do nothing if not click on an atag
  if (!aTag) { return; }

  let href = aTag.getAttribute('href');

  // check if external link then open in a new window
  if (href.indexOf('http') === 0) {
    aTag.setAttribute('target', '_blank');
    return;
  }




  // it's an internal link

  // prevent the default behavior of the browser
  // (that is - follow the link/reload the page)
  event.preventDefault();

  // Use HTML5 history and push a new state
  history.pushState(null, null, href);

  // Call the router
  router();
})

function makeMenuChoiceActive(route) {
  // change active link in the menu
  let aTagsInUl = document.querySelectorAll("ul a");
  for (let aTag of aTagsInUl) {
    aTag.classList.remove("active");
    let href = aTag.getAttribute("href");
    if (href === route) {
      aTag.classList.add("active");
    }
  }
}



async function router() {
  let route = location.pathname;
  console.log(location.pathname)
  makeMenuChoiceActive(route);

  route = route === "/" ? "/start" : route;
  route = "/partials" + route + ".html";

  let content = await (await fetch(route)).text();

  content.includes("<title>Error: Could not find page</title>")

  document.querySelector("main").innerHTML = content;

  route === "/partials/start.html" && start();

}

window.addEventListener("popstate", router);

router()



function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}