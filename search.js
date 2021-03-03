const API_KEY = "5e78d0de3d7a05661e85587fae4693b4";
const SEARCH_API='https://api.themoviedb.org/3/search/company?api_key=<<api_key>>&query=kgf&page=1'
const moviesInput = document.querySelector(".movies-input");
const searchedMovies=document.querySelector(".searched-movies");
const close = document.querySelector(".close");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const movieCard = document.querySelector(".movie-card");
const form = document.querySelector(".form");


const IMG_PATH = "https://image.tmdb.org/t/p/w500";
window.addEventListener("load", () => {
    const menuButton = document.querySelector(".menu-icon");
    const menu = document.querySelector(".menu");
    const closeButon = document.querySelector(".cancel-icon");
  
    menuButton.onclick = () => {
      menu.classList.add("active");
      menuButton.style.display = "none";
      closeButon.style.display = "block";
    };
    // menuButton.addEventListener("click", () => {
    // });
    closeButon.addEventListener("click", () => {
      menu.classList.remove("active");
      menuButton.style.display = "block";
      closeButon.style.display = "none";
    });


     
    

    
  
});
close.addEventListener("click", () => {
  body.style.overflow = "auto";
  overlay.classList.toggle("active");
  movieCard.innerHTML='<h1>LOADING...</h1>';
    

})

const inputChange=(e)=>{
    e.preventDefault();
    let query=moviesInput.value;
    if(query!=''){
        const URL=`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=1&query=${query}`
        fetchSearchedMovies(URL);
    }


}

async function fetchSearchedMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    // console.log(respData)
    searchedMovies.innerHTML=''
    const posterPath=document.querySelectorAll('.movie-poster')
    respData.results.forEach((movie) => {
      //   console.log(movie)
      const { title, vote_average, poster_path, id } = movie;
      const topRated = document.createElement("div");
      topRated.classList.add("movies");
      topRated.id = id;
      topRated.innerHTML = `
      <a class="favorite" title="ADD TO FAVORITES"><i class="fas fa-heart"></i></a>
      <a class="wishlist" title="ADD TO WISHLIST "><i class="fas fa-bookmark"></i></a>
          <img class ="movie-poster" loading="lazy" src=${
              poster_path== null ? './404PosterNotFound.jpg' :IMG_PATH + poster_path }>
                  <div class="movie-info">
                      <h3 class="movie-title">${title}</h3>
                      <span class="movie-rating">${vote_average}</span>
                  </div>`;
                  searchedMovies.append(topRated);
                  
                 
                  
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
        genres.forEach((x) => (genre += x.name + " "));
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

    const movies = document.querySelectorAll(".movies");
  
  for (let i = 0; i < movies.length; i++) {
    movies[i].addEventListener("click", function () {
      const movieId = movies[i].id;
      getMovieById(movieId);

      body.style.overflow = "hidden";
      overlay.classList.toggle("active");
    });
  }


  const favorite = document.querySelectorAll(".favorite");
    // console.log(favorite)
for (let i = 0; i < favorite.length; i++) {
    let favoriteArray = JSON.parse(localStorage.getItem("favorite"));
    if(favoriteArray.includes(favorite[i].parentElement.id)){
        favorite[i].classList.add('favorite-active')
    }
    
favorite[i].addEventListener("click", (e) => {
    
    favorite[i].classList.toggle("favorite-active");

      e.stopPropagation();

  if (localStorage.favorite == null) {
    let favoriteArray = [];
    if (favorite[i].classList.contains("favorite-active")) {
      favoriteArray.push(favorite[i].parentElement.id);
      console.log("added to fav");
    } else {
      favoriteArray.pop(favorite[i].parentElement.id);
      console.log("removed from fav");
    }

    localStorage.setItem("favorite", JSON.stringify(favoriteArray));
  } else {
    let favoriteArray = JSON.parse(localStorage.getItem("favorite"));
    if (favorite[i].classList.contains("favorite-active")) {
      favoriteArray.push(favorite[i].parentElement.id);
      console.log("added to fav");
    } else {
      favoriteArray.pop(favorite[i].parentElement.id);
      console.log("removed from fav");
    }
    localStorage.setItem("favorite", JSON.stringify(favoriteArray));
  }
})
} 


  const toasts = document.getElementById("toasts"); 
  const createNotification = (info) => {
    const notif = document.createElement("div");
    notif.classList.add("toast");
    info=='add'?notif.style.color='#00fc87':notif.style.color='#e31b23';
    info=='add'?notif.innerText = ' ADDED TO 🌠 ':notif.innerText = ' REMOVED FROM 🌠 ';  
    toasts.appendChild(notif);
    setTimeout(() => notif.remove(), 
    1000);
  };
  
  const wishlist = document.querySelectorAll(".wishlist");
  console.log(wishlist)

  
  
for (let i = 0; i < wishlist.length; i++) {
  let wishlistArray = JSON.parse(localStorage.getItem("wishlist"));
  if(wishlistArray!=null){
  if(wishlistArray.includes(wishlist[i].parentElement.id)){
      wishlist[i].classList.add('wishlist-active')
  }
}
}

for (let i = 0; i < wishlist.length; i++) {
  wishlist[i].addEventListener("click", (e) => {
    e.stopPropagation();
    wishlist[i].classList.toggle("wishlist-active");
    if (localStorage.wishlist == null) {
      let wishlistArray = [];
      if (wishlist[i].classList.contains("wishlist-active")) {
        wishlistArray.push(wishlist[i].parentElement.id);
        console.log("added to wislist");
      } else {
        wishlistArray.pop(wishlist[i].parentElement.id);
        console.log("removed from wislist");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlistArray));
    } else {
      let wishlistArray = JSON.parse(localStorage.getItem("wishlist"));
      if (wishlist[i].classList.contains("wishlist-active")) {
        wishlistArray.push(wishlist[i].parentElement.id);
        createNotification('add');
        console.log("added to wislist");
      
      } else {
        wishlistArray.pop(wishlist[i].parentElement.id);
        createNotification('rem');
        console.log("removed from wislist");
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlistArray));
    }
   
   
  })


}





  }

form.addEventListener('submit',inputChange)




