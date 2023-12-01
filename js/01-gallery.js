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

  const dataSrc = target.dataset.source;
  const galleryItemIndex = galleryItems.findIndex(
    (item) => item.original === dataSrc
  );

  if (galleryItemIndex !== -1) {
    openLightbox(galleryItemIndex);
  }
}

function openLightbox(index) {
  const lightbox = basicLightbox.create(
    `<img src="${galleryItems[index].original}" alt="${galleryItems[index].description}">`,
    {
      onClose: () => {
        document.removeEventListener("keydown", onKeyPress);
      },
      onShow: () => {
        document.addEventListener("keydown", onKeyPress);
      },
    }
  );

  lightbox.show();

  function onKeyPress(event) {
    if (event.key === "Escape") {
      lightbox.close();
    }
  }
}

console.log(galleryItems);
