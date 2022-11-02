import axios from "axios";
import Notiflix from "notiflix";

export default async function searchPhotos(searchValue, pageNum) {
  const base_url = `https://pixabay.com/api/`;
  const key = '31045323-7462f031136d4d89d1797051a';

  return await axios
    .get(base_url, {
      params: {
        key: `${key}`,
        q: `${searchValue}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: `${pageNum}`,
      },
    })

    .then(res => {
      if (res.data.totalHits < 40) {
        loadBtn.hidden = true;
      }

      if (!res.data.totalHits) {
        loadBtn.hidden = true;
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (pageNum === 1 && res.data.totalHits > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${res.data.totalHits} images.`
        );
      }

      return res.data;
    });
}
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });


// else if (totalHits === 0) {
//                 loadBtn.hidden = true;
//                 return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//             }