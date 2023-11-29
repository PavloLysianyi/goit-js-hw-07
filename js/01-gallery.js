import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(({ original, preview, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  })
  .join("");

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName !== "IMG") {
    return;
  }

  const galleryItemIndex = galleryItems.findIndex(
    (item) => item.preview === target.getAttribute("src")
  );

  if (galleryItemIndex !== -1) {
    openLightbox(galleryItemIndex);
  }
}

function openLightbox(index) {
  const largeImage = getLargeImage(index);

  const lightbox = basicLightbox.create(`<img src="${largeImage}" alt="">`, {
    onClose: () => {
      document.removeEventListener("keydown", onKeyPress);
    },
  });

  lightbox.show();

  document.addEventListener("keydown", onKeyPress);

  function onKeyPress(event) {
    if (event.code === "Escape") {
      lightbox.close();
    }
  }
}

function getLargeImage(index) {
  return galleryItems[index].original;
}

console.log(galleryItems);
