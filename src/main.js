// import { izitoast } from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

import "simplelightbox/dist/simple-lightbox.min.css";
import { SimpleLightbox } from "simplelightbox";

const apiKey = "49228326-f0295c59acbd8047419a0b87e";
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const gallery = document.querySelector(".gallery");
const loadingSpinner = document.getElementById("loading-spinner");

button.addEventListener("click", () => {
  const inputValue = input.value;
  if (inputValue === "") {
    // izitoast.info({
    //   title: "Bilgi",
    //   message: "Lütfen aramak istediğiniz kelimeyi yazınız.",
    // });
    gallery.innerHTML = "";
    loadingSpinner.classList.remove("hidden");
    return;
  }
  gallery.innerHTML = "<div class='loading-spinner'></div>";
  fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then((response) => response.json())
    .then((result) => {
      gallery.innerHTML = "";
      if (result.hits.length === 0) {
        // izitoast.error({
        //   title: "Hata",
        //   message: "Üzgünüz, aramanızla eşleşen resim yoktur.",
        // });
        return;
      } else {
        imgDetails(result.hits);
      }
    })
    .finally(() => {
      loadingSpinner.classList.add("hidden");
    });
});

function imgDetails(element) {
  const altYazi = element
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `  <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" />
        <div class="info">
          <p>Likes: ${likes}</p>
          <p>Views: ${views}</p>
          <p>Comments: ${comments}</p>
          <p>Downloads: ${downloads}</p>
        </div>
      </a>`;
      }
    )
    .join(" ");
  gallery.innerHTML = altYazi;

  const lightbox = new SimpleLightbox(".gallery-item", {
    captionsData: "alt",
    captionDelay: 250,
  });
  lightbox.refresh();
}
