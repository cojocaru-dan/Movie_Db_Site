import * as fs from 'node:fs';


const movieDB = {
	professionals: [],
	movies: [],
  genres: []
}

//write you code after this line
const checkInclusion = (object, MovieDBObject) => {
  // iterate through roles in professionals
	for (let i = 0; i < MovieDBObject.professionals.length; i++) {
		const element = MovieDBObject.professionals[i];
    // check if the name and the role are the same --> exit
		if (element.name === object.name && element.roles.includes(object.roles[0])) {
			return -1;
    // check if the name is the same and the roles are different --> add role
		} else if (element.name === object.name && !element.roles.includes(object.roles[0])) {
			return i;
		}
	}
  // add new object to professionals
	return -2;
};

const addProfessionals = (role, movieData) => {
  // iterate through the movies
  for (const movie of movieData.movies) {
    // iterate through the roles
    for (const element of movie[role]) {
      // create object format
      const obj = {
        id: countId,
        name: element,
        roles: [`${role.substring(0, role.length-1)}`]
      };
      // check for duplicates
      const index = checkInclusion(obj, movieDB);
      if (index >= 0) {
        movieDB.professionals[index].roles.push(obj.roles[0]);
      } else if (index === -2) {
        movieDB.professionals.push(obj);
        countId++;
      }
    }
  }
};

const movieData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// console.log(movieData);
let countId = 1;
addProfessionals("writers", movieData);
addProfessionals("actors", movieData);
addProfessionals("directors", movieData);

// console.log(movieDB.professionals);

// Prepare the movies

// Populate the movies key in moviesDB
for(const movie of movieData.movies){
  movieDB.movies.push(movie);
};

const replaceWithId = (movieObj, role) => {
// Iterate through the roles in the movieDB array
  for (let i = 0; i < movieObj.movies.length; i++) {
    let profession = movieObj.movies[i][role];
    // Iterate through the roles in professionals
    for (let j = 0; j < profession.length; j++) {
      // Check if the names are the same
      for (const element of movieObj.professionals){
        if (profession[j] === element.name){
          // Replace the name with the ID in professionals 
          movieObj.movies[i][role][j] = element.id;
        }
      }
    }
  }
};

replaceWithId(movieDB, "writers");
replaceWithId(movieDB, "actors");
replaceWithId(movieDB, "directors");

// console.log(movieDB.movies);




//write your code brefore this line

export {movieDB};
