// hamburgerMenu.js

export const hamMenu = document.querySelector(".ham-menu");
export const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});
