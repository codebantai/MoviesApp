window.addEventListener("load", () => {
    setTimeout(()=>{

        const toasts = document.getElementById("toasts"); 
        const createNotification = (info) => {
          const notif = document.createElement("div");
          notif.classList.add("toast");
          info=='add'?notif.style.color='#00fc87':notif.style.color='#e31b23';
          info=='add'?notif.innerText = ' ADDED TO WISHLIST 🌠':notif.innerText = ' REMOVED FROM WISHLIST 💫';  
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




    },1000)


   
})