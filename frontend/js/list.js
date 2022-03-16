document.querySelectorAll(".filter-label-age").forEach(setupSelectorAge);

function setupSelectorAge(selector) {
  selector.addEventListener("change", (e) => {
    console.log("changed", e.target.value);
  });

  selector.addEventListener("mousedown", (e) => {
    if (window.innerWidth >= 420) {
      // override look for non mobile
      e.preventDefault();

      const select = selector.children[0];
      const dropDown = document.createElement("ul");
      dropDown.className = "selector-options";

      [...select.children].forEach((option) => {
        const dropDownOption = document.createElement("li");
        dropDownOption.textContent = option.textContent;

        dropDownOption.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          select.value = option.value;
          selector.value = option.value;
          select.dispatchEvent(new Event("change"));
          selector.dispatchEvent(new Event("change"));
          dropDown.remove();
        });

        dropDown.appendChild(dropDownOption);
      });

      selector.appendChild(dropDown);

      // handle click out
      document.addEventListener("click", (e) => {
        if (!selector.contains(e.target)) {
          dropDown.remove();
        }
      });
    }
  });
}

function setupSelectorType(selector) {
  selector.addEventListener("change", (e) => {
    MovieType = e.target.value;
    console.log("changed", e.target.value);
  });

  selector.addEventListener("mousedown", (e) => {
    if (window.innerWidth >= 420) {
      // override look for non mobile
      e.preventDefault();

      const select = selector.children[0];
      const dropDown = document.createElement("ul");
      dropDown.className = "selector-options";

      [...select.children].forEach((option) => {
        const dropDownOption = document.createElement("li");
        dropDownOption.textContent = option.textContent;

        dropDownOption.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          select.value = option.value;
          selector.value = option.value;
          select.dispatchEvent(new Event("change"));
          selector.dispatchEvent(new Event("change"));
          dropDown.remove();
        });

        dropDown.appendChild(dropDownOption);
      });

      selector.appendChild(dropDown);

      // handle click out
      document.addEventListener("click", (e) => {
        if (!selector.contains(e.target)) {
          dropDown.remove();
        }
      });
    }
  });
}

//Click on Submit button for filtering
async function applyFilter() {
  let type = document.getElementById("filter-down-box-type").value
  if (age != "all") {
    age = Math.floor(age);
  }

  let movieList = await getData("/api/allActiveMovies");
  let filterList = [];

  for (let i = 0; i < movieList.length; i++) {
    if (age == "all" && type == "all") {
      // Will rerender the first page with all movies
      renderMovieList(".active-movies-container", filterList);
    }

    if (age != "all" && movieList[i].ageLimit <= age) {
      filterList.push(movieList[i]);
      renderMovieList(".active-movies-container", filterList);
    }
    //If no match with movies will show an empty list
    if (filterList.length == 0) {
      renderMovieList(".active-movies-container", filterList);
    }
  }

}