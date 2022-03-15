// A function declaration
// we use the word "async" in order to be able
// to use await inside the function
// (needed in order to wait for json and deserialization)
async function loadJsonAndDisplayProducts() {

  // load content from the url /products.json
  // (and wait until we have done so)
  let rawData = await fetch('/jsonFiles/movies.json');
  // deserialize the json (wait for it)
  let products = await rawData.json();

  // loop through the products and build some html
  let html = '';
  for (let product of products) {
    // the backticks indicate of a special type
    // of string - called a template literal
    // template literal can span over several lines
    // and contain javascript epressions: ${...}
    html += `
      <article>
        
        <p>${product.description}</p>
       
      </article>
    `;
  }

  // grab the DOM element that has the class products
  // and replace its contents with our newly created html
  document.querySelector('.products').innerHTML = html;
}

// Call the function
loadJsonAndDisplayProducts();