const burMenuBtn = document.querySelector(".bur-menu");
const menu = document.querySelector(".wraper-menu-and-auth");

burMenuBtn.addEventListener("click", ()=>{
    burMenuBtn.classList.toggle("active");
    menu.classList.toggle("active");
});

document.addEventListener("click", (e)=>{
    if(!e.target.closest(".wraper-menu-and-auth") && !e.target.closest(".bur-menu")){
        burMenuBtn.classList.remove("active");
        menu.classList.remove("active");
    }
});

document.addEventListener("scroll", ()=>{
    burMenuBtn.classList.remove("active");
    menu.classList.remove("active");
});