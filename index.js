"use strict";
movies.splice(100);

//------------- Veraybls----------------------
let header = $("header");
let aside = $("#aside");
let inputs = $$("input");
let moviesWrapper = $(".movies");
let searchInput = $("#search-input");
let darcModeBtn = $("#darcmode-btn");
let footer = $("footer");
let p = $$("p");
let searchName = $("#name");
let searchMoviesTaitil = $("#search-movies");
let toastElement = $(".toaster");
let toastMessege = $(".toaster-titil");
let selectCategory = $("#category");
let filmRating = $("#number");
let formFilter = $("#filter-form");

let categoryData = [];

let changMovies = JSON.parse(localStorage.getItem("movies")) || [];

let tanlanganFillimlar = [];

const allMovies = movies.map((el) => {
  return {
    title: el.title,
    year: el.year,
    category: el.categories,
    id: el.imdbId,
    rating: el.imdbRating,
    time: `${Math.trunc(el.runtime / 60)} H ${Math.trunc(el.runtime % 60)} m`,
    language: el.language,
    youtube: `https://www.youtube.com/emdeb/${el.youtubeId}`,
    summary: el.summary,
    minImage: el.smallThumbnail,
    maxImage: el.bigThumbnail,
  };
});
//--------------------Movies
function getCotigory(data) {
  if (data.length) {
    data.forEach((el) => {
      el.category.forEach((e) => {
        if (!categoryData.includes(e)) {
          categoryData.push(e);
        }
      });
    });
  }
}
getCotigory(allMovies);
//--------------------------Remder catagory--------

categoryData.sort().forEach((el) => {
  let categorOption = creatElement("option", "", el);
  selectCategory.appendChild(categorOption);
});

//------------------Cards dynamic----------------
function renderAllMoves(data, tagWrapper) {
  tagWrapper.innerHTML = "";
  if (data.length) {
    data.forEach((el) => {
      const card = creatElement(
        "div",
        "card",
        `
              <img src="${el.minImage}" alt="smth">
              <div class="card-body">
                  <h2>${
                    el.title.length > 20
                      ? el.title.substring(0, 17) + "..."
                      : el.title
                  }</h2>
                  <ul>
                      <li><strong>Year:</strong> ${el.year}</li>
                      <li><strong>Categories:</strong>${el.category}</li>
                      <li><strong>Rating:</strong>${el.rating}</li>
                      <li><strong>Language:</strong>${el.language}</li>
                  </ul>

                  <div class="flex btn-wrappeer items-center gap-x-3">
                   
                      <button 
                          id="${el.id}"
                          data-like=${el.id}
                          class="liked grid hover:bg-red-700 hover:text-white duration-500 text-red-700 place-content-center p-4 border w-12 h-12 rounded-full">
                          <i data-like=${
                            el.id
                          } class="liked bi bi-suit-heart-fill "></i>
                      </button>

                      <a href="${
                        el.youtube
                      }" target="_blank" class="flex hover:bg-black hover:text-white duration-500  justify-center gap-x-2 text-xl items-center border min-w-24 px-3 h-12 rounded-full"> 
                          <i class="bi bi-play-circle-fill"></i>
                          <span>watch movie</span>
                      </a>
                  </div>

              </div> 
            `
      );

      tagWrapper.appendChild(card);
    });
  }
}

//-------------------------Searching
function searchMovies(searchTerm) {
  const searchResult = allMovies.filter((el) =>
    el.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (searchResult.length) {
    searchMoviesTaitil.innerHTML = `${searchResult.length}   movies found`;
    renderAllMoves(searchResult, moviesWrapper);
  } else {
    searchMoviesTaitil.innerHTML = "";
    moviesWrapper.innerHTML = `
        <h1 class="text-red-600 text-[32px] w-[700px] relative top-[200px] left-[300px] ">The movie you searched for was not found !!</h1>
        `;
  }
}

searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    searchMoviesTaitil.innerHTML = "";
    moviesWrapper.innerHTML = `<span class="loader"></span>`;
    setTimeout(() => {
      searchMovies(e.target.value);
    }, 1000);
  }
});

renderAllMoves(allMovies, moviesWrapper);

let isDarkMode = false;
darcModeBtn.onclick = function () {
  if (isDarkMode == false) {
    darcModeBtn.innerHTML = `<i class="bi bi-sun-fill"></i>`;
    document.body.style.transition = "ail 0.1s lener";
    document.body.style.backgroundColor = "#030712";
    document.body.style.color = "#FFF";
    header.style.backgroundColor = "#030712";
    header.style.color = "#FFF";
    searchInput.style.backgroundColor = "#030712";
    searchInput.style.color = "#FFF";
    aside.style.backgroundColor = "#030712";
    aside.style.color = "#FFF";
    selectCategory.style.backgroundColor = "#030712";
    selectCategory.style.color = "#FFF";
    inputs.forEach(
      (el) => (
        (el.style.backgroundColor = "#030712"), (el.style.color = "#FFF")
      )
    );
    footer.style.backgroundColor = "#030712";
    footer.style.color = "#FFF";
    p.forEach((el) => (el.style.color = "#FFF"));
  } else {
    darcModeBtn.innerHTML = `<i class="bi bi-moon-stars-fill"></i>`;
    document.body.style.transition = "ail 0.1s lener";
    document.body.style.backgroundColor = "#FFF";
    document.body.style.color = "black";
    header.style.backgroundColor = "#FFF";
    header.style.color = "black";
    searchInput.style.backgroundColor = "#FFF";
    searchInput.style.color = "#000";
    aside.style.backgroundColor = "#FFF";
    aside.style.color = "#000";
    selectCategory.style.backgroundColor = "#FFF";
    selectCategory.style.color = "#000";
    inputs.forEach(
      (el) => ((el.style.backgroundColor = "#FFF"), (el.style.color = "#000"))
    );
    footer.style.backgroundColor = "#FFF";
    footer.style.color = "black";
    p.forEach((el) => (el.style.color = "#000"));
  }
  isDarkMode = !isDarkMode;
};

//-------------------------ASIDBAR START----------------

function multiSearch() {
  const name = searchName.value;
  const reting = filmRating.value;
  const cotigor = selectCategory.value;

  console.log(name, reting, cotigor);
  const searchResult = allMovies.filter((el) => {
    return (
      el.title.toLowerCase().includes(name.toLowerCase()) &&
      el.category.includes(cotigor) &&
      el.rating >= reting
    );
  });
  if (searchResult.length) {
    searchMoviesTaitil.innerHTML = `${searchResult.length} Movies founding`;
    renderAllMoves(searchResult, moviesWrapper);
  } else {
    searchMoviesTaitil.innerHTML = "";
    moviesWrapper.innerHTML = `
        <h1 class="text-red-600 text-[32px] w-[700px] relative top-[200px] left-[300px] "> So Sorry Not found this movie !!!</h1>
        `;
  }
}
formFilter.addEventListener("submit", (e) => {
  e.preventDefault();

  searchMoviesTaitil.innerHTML = "";
  moviesWrapper.innerHTML = `<span class="loader"></span>`;

  setTimeout(() => {
    multiSearch();
  }, 1000);
});

moviesWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("liked")) {
    let id = e.target.getAttribute("data-like");
    let titilFilm = allMovies.filter((el) => el.id === id)[0].title;
    if (!tanlanganFillimlar.includes(titilFilm)) {
      tanlanganFillimlar.push(titilFilm);
      toaster("success", `${titilFilm.slice(0, 16) + "..."} film added`, 2000);
    } else {
      tanlanganFillimlar = tanlanganFillimlar.filter((el) => el !== titilFilm);
      toaster("arrov", `${titilFilm.slice(0, 16) + "..."} film  deleted`, 2000);
    }
  }
});

function toaster(type, message, timeout) {
  toastMessege.innerHTML = message;
  if (type == "success") {
    toastElement.classList.remove("hov");
    toastElement.classList.add("shov");
    setTimeout(() => {
      toastElement.classList.remove("shov");
      toastElement.classList.add("hov");
    }, timeout);
  } else if (type == "arrov") {
    toastElement.classList.remove("hov");
    toastElement.classList.add("shov2");
    setTimeout(() => {
      toastElement.classList.remove("shov2");
      toastElement.classList.add("hov");
    }, timeout);
  }
}
