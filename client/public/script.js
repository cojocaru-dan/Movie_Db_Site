import { data } from "/data.js";

const loadEvent = function () {
  const page = window.location.pathname.substring(1);
  // Write your JavaScript code after this line

  console.log("data: ", data);
  console.log("page: ", page);

  const rootElement = document.getElementById("root");

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
