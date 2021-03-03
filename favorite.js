const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const API_KEY = "5e78d0de3d7a05661e85587fae4693b4";
const close = document.querySelector(".close");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const movieCard = document.querySelector(".movie-card");

// const addToFavorites = () => {};
const allFavorites=document.querySelector('.all-favorites')
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

let favorites= localStorage.getItem('favorite')
let favoriteArray = JSON.parse(localStorage.getItem("favorite"));
console.log(favoriteArray)
if(favorites==null || favorites==[]){
allFavorites.innerHTML=`
<h2>
NO FAVORITES ADDED...
ADD SOME FAVORITES...
</h2>
`
}
else{

  async function fetchTopRate(favid) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${favid}?api_key=${API_KEY}`);
    // console.log(`https://api.themoviedb.org/3/movie/${favid}?api_key=${API_KEY}`)
    const respData = await resp.json();
    console.log(favid)
    if(respData.success!=false){
      const { title, vote_average, poster_path, id } = respData;
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
      allFavorites.append(topRated);
    }
  }
  fetchTopRate();


    for(let i=0;i<favoriteArray.length;i++){
      if(favoriteArray[i]!=undefined)
      fetchTopRate(favoriteArray[i])
    }




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
    

    setTimeout(()=>{
      const movies = document.querySelectorAll(".movies");
    
      for (let i = 0; i < movies.length; i++) {
      movies[i].addEventListener("click", function () {
      const movieId = movies[i].id;
      getMovieById(movieId);
      
      body.style.overflow = "hidden";
      overlay.classList.toggle("active");
      });
      }


    },1000)
    close.addEventListener("click", () => {
      body.style.overflow = "auto";
      overlay.classList.toggle("active");
      movieCard.innerHTML='<h1>LOADING...</h1>';
    });
}


  
  
});
