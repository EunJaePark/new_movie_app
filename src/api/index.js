import axios from "axios";

const config = {
  baseURL: "https://api.themoviedb.org/3/search/",
  myKey: "&api_key=b9c7f8c401a51fce59ec2d99b08e52c8"
};

function movieSearch(searchTextBox) {
  return axios.get(
    `${config.baseURL}${searchTextBox.type}?query=${searchTextBox.searchText}${config.myKey}&language=ko-KR`
  );
}

function getMovieDetail(text) {
  console.log(
    `https://api.themoviedb.org/3/${text}?${config.myKey}&language=ko-KR`
  );
  return axios.get(
    `https://api.themoviedb.org/3/${text}?${config.myKey}&language=ko-KR`
    // movie/${movieData.id}/images
  );
}

export { movieSearch, getMovieDetail };
