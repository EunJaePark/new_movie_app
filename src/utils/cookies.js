function saveGenreList(data) {
  document.cookie = `GENRE_LIST = ${JSON.stringify(data)}`;
}
function saveValue(value) {
  document.cookie = `SEARCH_TEXT = ${JSON.stringify(value)}`;
}
function saveClickMovieId(data) {
  document.cookie = `CLICK_MOVIE_ID = ${data}`;
}
function saveKeyword(data) {
  document.cookie = `KEYWORD = ${data}`;
}
function savePersonData(data) {
  console.log("save person data");
  console.log(data);
  // document.cookie = `PERSON_DATA = ${data}`;
  document.cookie = `PERSON_DATA = ${JSON.stringify(data)}`;
}

function deleteCookieMovie(value) {
  document.cookie = `${value} = ''`;
}

function getGenreList() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)GENRE_LIST\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
}
function getCookieSearchText() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)SEARCH_TEXT\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
}
function getClickMovieId() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)CLICK_MOVIE_ID\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
}
function getKeyword() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)KEYWORD\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
}
function getPersonData() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)PERSON_DATA\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
}

export {
  saveGenreList,
  saveValue,
  saveClickMovieId,
  saveKeyword,
  savePersonData,
  getGenreList,
  deleteCookieMovie,
  getCookieSearchText,
  getClickMovieId,
  getKeyword,
  getPersonData
};
