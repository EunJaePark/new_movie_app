import store from "../store";

// (MainPage) 영화 검색 api
function fetch_data(inputText) {
  return store.dispatch("FETCH_DATA", inputText);
}

// 클릭한 영화 api (InformPage)
function fetch_click_movie(inputText) {
  return store.dispatch("FETCH_CLICK_MOVIE", inputText);
}

// 클릭한 영화 키워드 api (InformPage)
function fetch_keyword(inputText) {
  return store.dispatch("FETCH_KEYWORD", inputText);
}

// 클릭한 영화 img api (InformPage)
function fetch_img(inputText) {
  return store.dispatch("FETCH_IMG", inputText);
}

function cutYear(date) {
  return date.substring(0, 4);
}

function changeHyphen(date) {
  return date.replace(/-/g, ".");
}

export {
  fetch_data,
  fetch_click_movie,
  fetch_keyword,
  fetch_img,
  cutYear,
  changeHyphen
};
