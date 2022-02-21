
document.querySelector('body').addEventListener('click', function (event) {
  let aTag = event.target.closest('a');
  if (!aTag) { return; }

  let href = aTag.getAttribute('href');
  if (href.indexOf('http') === 0) {
    aTag.setAttribute('target', '_blank');
    return;
  }
  event.preventDefault();

  history.pushState(null, null, href);
  router();
});

function makeMenuChoiceActive(route) {

  let aTagsInNav = document.querySelectorAll('nav a');
  for (let aTag of aTagsInNav) {
    aTag.classList.remove('active');
    let href = aTag.getAttribute('href');
    if (href === route) {
      aTag.classList.add('active');
    }
  }
}

async function router() {
  let route = location.pathname;
  makeMenuChoiceActive(route);
  route = route === '/' ? '/start' : route;
  route = '/partials' + route + '.html';
  let content = await (await fetch(route)).text();
  content.includes('<title>Error</title>') && location.replace('/');
  document.querySelector('main').innerHTML = content;
  route === '/partials/film&trailer.html' && loadJsonAndDisplayProducts();
}
window.addEventListener('popstate', router);
router();