import { data } from "/data.js";

const loadEvent = function () {
  const page = window.location.pathname.substring(1);
  // Write your JavaScript code after this line

  console.log("data: ", data);
  console.log("page: ", page);

  const rootElement = document.getElementById("root");

  const element = function (tag, inner, index) {
    return `<${tag} class = ${index}>${inner}</${tag}>`
  };

  // const headers = (tag, inner) => {
  //     rootElement.insertAdjacentHTML("beforeend", element (tag, inner));
  // }
  // let h1 = headers("h1", "title");
  

  // data.movies.forEach((element) => rootElement.insertAdjacentHTML("beforeend", element("div", element.title)));

  let getData = (arr, id) => {
    for(let name of arr){
      if (name.id === id){
        return name.name;
      }
    }
  };




 const addMoviesData = function() {
    
    let index = 1;

    data.movies.forEach(item => {
    rootElement.insertAdjacentHTML("beforeend", element("h1", item.title, "movie"));
    document.querySelector(`.movie:nth-child(${index})`).insertAdjacentHTML("beforeend", element ("div", item.year, "year"));
    document.querySelector(`.movie:nth-child(${index})`).insertAdjacentHTML("beforeend", element ("div", item.runtime, "runtime"));
    document.querySelector(`.movie:nth-child(${index})`).insertAdjacentHTML("beforeend", element ("div", item.genres, "genres"));
    document.querySelector(`.movie:nth-child(${index})`).insertAdjacentHTML("beforeend", element ("div", item["release-date"], "release-date"));
    document.querySelector(`.movie:nth-child(${i})`).insertAdjacentHTML("beforeend", element ("div", item.storyline, "storyline"));
    
    // Add writers
    for (let i = 0; i < item.writers.length; i++) {
       document.querySelector(`.movie:nth-child(${index})`).insertAdjacentHTML("beforeend", element("div", getData(data.professionals, item.writers[i]), "writers"))
    };
    // Add actors
    for (let i = 0; i < item.actors.length; i++) {
      document.querySelector(`.movie:nth-child(${index})`).insertAdjacentHTML("beforeend", element("div", getData(data.professionals, item.actors[i]), "actors"))
   };
   // Add directors
   for (let i = 0; i < item.directors.length; i++) {
    document.querySelector(`.movie:nth-child(${index})`).insertAdjacentHTML("beforeend", element("div", getData(data.professionals, item.directors[i]), "directors"))
 };
    index++;
  })
  }

  const listProfessionals = (movieDB, role) => {
    rootElement.insertAdjacentHTML(
      `beforeend`,
      `<section id = ${role}s></section>`
    );

    movieDB.professionals.forEach((element) => {
      if (element.roles.includes(role)) {
        document
          .querySelector(`#${role}s`)
          .insertAdjacentHTML(
            `beforeend`,
            `<h1 class = ${role}>${element.name}</h1>`
          );
      }

      movieDB.movies.forEach(movie => {
        if(movie[`${role}s`].includes(element.id)) {
          document
          .querySelector(`#${role}s`)
          .insertAdjacentHTML(
            `beforeend`,
            `<h4 class = movie>${movie.title}</h4>`
          );
        }
      });

    });
  };

  switch (page) {
    case `actors`:
      listProfessionals(data, `actor`);
      break;

    case `directors`:
      listProfessionals(data, `director`);
      break;

    case `writers`:
      listProfessionals(data, `writer`);
      break;

    default:
      break;
  }

  // Write your JavaScript code before this line
};

window.addEventListener("load", loadEvent);
