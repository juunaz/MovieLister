// Movie class: Creates movie object
class Movie {
    constructor(title,director,isan){
        this.title = title;
        this.director = director;
        this.isan = isan;
    }
}
// UI Class: Handles everything UI related
class UI {
    static displayMovies(){
        const StoredMovies = [
            {
                title: 'Leffa 1',
                director: 'Director 1',
                isan: '11111'
            },
            {
                title: 'Leffa 2',
                director: 'Director 2',
                isan: '22222'
            }
        ];

        const movies = StoredMovies;

        movies.forEach((movie) => UI.addMovieToList(movie));
    }

    static addMovieToList(movie){
        const list = document.querySelector("#movie-list");

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.director}</td>
        <td>${movie.isan}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteMovie(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            UI.showAlert("Movie deleted.", "warning");
        }
    }
    static showAlert(msg, className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector(".container");
        const form = document.querySelector("#movie-form");
        container.insertBefore(div, form.nextSibling);
        setTimeout(() => document.querySelector(".alert").remove(), 2500);
    }
}
/* // Store class: LocalStorage
class Store {
    static getMovies() {
      let movies;
      if(localStorage.getItem('movies') === null) {
        movies = [];
      } else {
        movies = JSON.parse(localStorage.getItem('movies'));
      }
  
      return movies;
    }
  
    static addMovie(movie) {
      const movies = Store.getMovies();
      movies.push(movie);
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  
    static removeMovie(isan) {
      const movies = Store.getMovies();
  
      movies.forEach((movie, index) => {
        if(movie.isan === isan) {
          movies.splice(index, 1);
        }
      });
  
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  } */

// Event: Display movies
document.addEventListener("DOMContentLoaded", UI.displayMovies);

// Event: Add a movie
document.querySelector("#movie-form").addEventListener('submit', (e) => {
    e.preventDefault();
    // Get form values
    const title = document.querySelector("#title").value;
    const director = document.querySelector("#director").value;
    const isan = document.querySelector("#isan").value;

    if(title === "" || director == "" || isan === ""){
        //Error alert
        UI.showAlert('Please fill in all fields.', 'danger');
    } else{
        // Instantiate a movie
        const movie = new Movie(title, director, isan);

        //Add movie to the list
        UI.addMovieToList(movie);

        //Movie added "alert"
        UI.showAlert('Movie added', 'success');

        //Reset form
        document.querySelector("#movie-form").reset();
    };
});

// Event: Remove a movie
document.querySelector("#movie-list").addEventListener("click", (e) => {
    UI.deleteMovie(e.target);
});