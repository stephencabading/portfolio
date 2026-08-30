const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav-menu");

toggle?.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.querySelector("#year").textContent = new Date().getFullYear();