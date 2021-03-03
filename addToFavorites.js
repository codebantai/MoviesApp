window.addEventListener("load", () => {
  setTimeout(
    ()=>{
      const toasts = document.getElementById("toasts"); 
      const createNotification = (info) => {
        const notif = document.createElement("div");
        notif.classList.add("toast");
        info=='add'?notif.style.color='#00fc87':notif.style.color='#e31b23';
        info=='add'?notif.innerText = ' ADDED TO ❤ ':notif.innerText = ' REMOVED FROM ❤ ';  
        toasts.appendChild(notif);
        setTimeout(() => notif.remove(), 
        1000);
      };
    
    
    
    
    
      const favorite = document.querySelectorAll(".favorite");
      for (let i = 0; i < favorite.length; i++) {
        let favoriteArray = JSON.parse(localStorage.getItem("favorite"));
        if(favoriteArray!=null){
        if(favoriteArray.includes(favorite[i].parentElement.id)){
            favorite[i].classList.add('favorite-active')
        }
      }
      }
    
      for (let i = 0; i < favorite.length; i++) {
        favorite[i].addEventListener("click", (e) => {
          e.stopPropagation();
          favorite[i].classList.toggle("favorite-active");
          if (localStorage.favorite == null) {
            let favoriteArray = [];
            if (favorite[i].classList.contains("favorite-active")) {
              favoriteArray.push(favorite[i].parentElement.id);
              // console.log("added to fav");
            } else {
              favoriteArray.pop(favorite[i].parentElement.id);
              // console.log("removed from fav");
            }
    
            localStorage.setItem("favorite", JSON.stringify(favoriteArray));
          } else {
            let favoriteArray = JSON.parse(localStorage.getItem("favorite"));
            if (favorite[i].classList.contains("favorite-active")) {
              favoriteArray.push(favorite[i].parentElement.id);
              createNotification('add');
              // console.log("added to fav");
            
            } else {
              favoriteArray.pop(favorite[i].parentElement.id);
              createNotification('rem');
              // console.log("removed from fav");
            }
            localStorage.setItem("favorite", JSON.stringify(favoriteArray));
          }
         
         
        })
    }


    },
    
    2000)
  
})