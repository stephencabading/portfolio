const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav-menu");

toggle?.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.querySelector("#year").textContent = new Date().getFullYear();

const track = document.querySelector("#carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

prevBtn?.addEventListener("click", () => {
  track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" });
});
nextBtn?.addEventListener("click", () => {
  track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" });
});

const modal = document.querySelector("#project-modal");
const modalGallery = document.querySelector("#modal-gallery");
const modalTitle = document.querySelector("#modal-title");
const modalRole = document.querySelector("#modal-role");
const modalDescription = document.querySelector("#modal-description");
const modalLink = document.querySelector("#modal-link");
const modalTags = document.querySelector("#modal-tags");
let lastFocusedSlide = null;

function openProjectModal(slide) {
  const images = slide.dataset.images
    ? slide.dataset.images.split(",").map(src => src.trim())
    : [slide.dataset.image];

  modalTitle.textContent = slide.dataset.title;
  modalRole.textContent = slide.dataset.role || "";
  modalRole.hidden = !slide.dataset.role;
  modalDescription.textContent = slide.dataset.description;

  if (slide.dataset.link) {
    modalLink.href = slide.dataset.link;
  } else {
    modalLink.removeAttribute("href");
  }

  modalGallery.innerHTML = "";
  images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${slide.dataset.title} — image ${i + 1}`;
    img.loading = "lazy";
    modalGallery.appendChild(img);
  });
  modalGallery.scrollLeft = 0;

  modalTags.innerHTML = "";
  slide.dataset.tags.split(",").forEach(tag => {
    const chip = document.createElement("span");
    chip.textContent = tag.trim();
    modalTags.appendChild(chip);
  });

  lastFocusedSlide = slide;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeProjectModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lastFocusedSlide?.focus();
}

document.querySelectorAll(".project-slide").forEach(slide => {
  slide.addEventListener("click", () => openProjectModal(slide));
});

modal?.querySelectorAll("[data-close]").forEach(el => {
  el.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal?.getAttribute("aria-hidden") === "false") {
    closeProjectModal();
  }
});