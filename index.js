const API_KEY = "5e78d0de3d7a05661e85587fae4693b4";
const API_URL ='https://api.themoviedb.org/3/trending/movie/day?api_key=5e78d0de3d7a05661e85587fae4693b4'
//   "https://api.themoviedb.org/3/movie/top_rated?api_key=5e78d0de3d7a05661e85587fae4693b4&language=en-US&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const topRatedMovies = document.querySelector(".top-rated-movies");
const close = document.querySelector(".close");
const backdrop = document.querySelector(".backdrop");
const aboutMovie = document.querySelector(".about-movie");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
const movieCard = document.querySelector(".movie-card");

async function fetchTopRate() {
  const resp = await fetch(API_URL);
  const respData = await resp.json();
  respData.results.forEach((movie) => {
    //   console.log(movie)
    const { title, vote_average, poster_path, id } = movie;
    const topRated = document.createElement("div");
    topRated.classList.add("movies");
    topRated.id = id;
    topRated.innerHTML = `
    <a class="favorite" title="ADD TO FAVORITES"><i class="fas fa-heart"></i></a>
    <a class="wishlist" title="ADD TO WISHLIST "><i class="fas fa-bookmark"></i></a>
        <img class ="movie-poster" loading="lazy" src=${IMG_PATH + poster_path}>
                <div class="movie-info">
                    <h3 class="movie-title">${title}</h3>
                    <span class="movie-rating">${vote_average}</span>
                </div>`;
    topRatedMovies.append(topRated);
  });
}
fetchTopRate();





window.addEventListener('load', () => {
  const menuButton = document.querySelector(".menu-icon");
  const menu = document.querySelector(".menu");
  const closeButon = document.querySelector(".cancel-icon");
 

  menuButton.onclick = () => {
    menu.classList.add("active");
    menuButton.style.display = "none";
    closeButon.style.display = "block";
  };
  
  closeButon.addEventListener("click", () => {
    menu.classList.remove("active");
    menuButton.style.display = "block";
    closeButon.style.display = "none";
  });
  
  setTimeout(()=>{
    const movies = document.querySelectorAll(".movies");
    console.log(movies,'outside load')
    for (let i = 0; i < movies.length; i++) {
      
      movies[i].addEventListener("click", function (event) {
        const movieId = movies[i].id;
        getMovieById(movieId);
  
        body.style.overflow = "hidden";
        overlay.classList.toggle("active");
        event.preventDefault();
      });
    }
  },2000
  
  
  )
  

  
  
});
close.addEventListener("click", () => {
  body.style.overflow = "auto";
  overlay.classList.toggle("active");
  movieCard.innerHTML='<h1>LOADING...</h1>';
});
const getMovieById = async (id) => {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  const respData = await resp.json();
  const {
    title,
    tagline,
    overview,
    genres,
    poster_path,
    release_date,
    vote_average,
    revenue,
    runtime,
  } = respData;
  let genre = "";
  if(genres!=undefined)genres.forEach((x) => (genre += x.name + " "));
  
  const img=new Image;
  img.src= `https://image.tmdb.org/t/p/w500/${poster_path}`;
  img.addEventListener("load", function () {
    movieCard.innerHTML = `<div class="movie-title">
    <h1>${title}</h1>
    <span class="tagline">${tagline}</span>
    <p>${overview}</p>
    <div class="additional-details">
        <span class="genre-list">${genre}</span>
        
        <div class="release-details">
            <div class='movie-data'>
                <p> Original Release:</p><span class="">${release_date}</span>
            </div>
            <div class='movie-data'>
                <p>Running Time:</p><span class="">${runtime} mins</span>
            </div>
            <div class="movie-data">
                <p> Box Office:</p><span class="">$${revenue}</span>
            </div>
            <div class="movie-data">
                <p> Vote Average:</p><span class="">${vote_average} / 10</span>
            </div>
        </div>
    </div>
  </div>
      
      `;
    movieCard.appendChild(img)
    });
    
 
  
  // <img src="https://image.tmdb.org/t/p/w500/${poster_path}">

};


