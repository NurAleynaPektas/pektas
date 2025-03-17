import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";

const apiKey = "49228326-f0295c59acbd8047419a0b87e";
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const gallery = document.querySelector(".gallery");

button.addEventListener("click", () => {
  const inputValue = input.value;
  if (inputValue === "") {
    izitoast.info({
      title: "Bilgi",
      message: "Lütfen aramak istediğiniz kelimeyi yazınız.",
    });
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
        izitoast.error({
          title: "Hata",
          message: "Üzgünüz, aramanızla eşleşen resim yoktur.",
        });
        return;
      }

      result.hits.forEach((element) => {
        const galleryItem = document.createElement("a");
        galleryItem.href = element.largeImageURL;
        galleryItem.classList.add("gallery-item");

        const img = document.createElement("img");

        img.src = element.webformatURL;
        img.alt = element.tags;
        img.classList.add("img");
        gallery.appendChild(img);
        gallery.appendChild(galleryItem);
      });
      izitoast.success({
        title: "Başarılı",
        message: `${result.hits.length} görsel bulundu.`,
      });
      const lightbox = new SimpleLightbox(".gallery a");
      lightbox.refresh();
    })

    .catch((err) => {
      console.log("Hata oluştu", err);
      izitoast.error({
        title: "Hata",
        message: "Bir hata oluştu, lütfen tekrar deneyin.",
      });
    });
});
