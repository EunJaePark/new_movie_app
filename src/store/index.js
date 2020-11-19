import Vue from "vue";
import Vuex from "vuex";
import {
  movieSearch,
  getMovieDetail /*similarGenreSearch*/
} from "@/api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchText: "",
    moviedata: [],
    clickMovieData: [],
    imgList: [],
    keywordList: []
  },
  mutations: {
    SAVE_SEARCHTEXT(state, text) {
      state.searchText = text;
    },
    SET_CLICK_MOVIE(state, data) {
      state.clickMovieData = data;
    },
    SET_URL(state, data) {
      console.log(data);
      state.moviedata = data;
    },
    SET_IMG(state, data) {
      state.imgList = data;
    },
    SET_KEYWORD(state, data) {
      state.keywordList = data;
    }
  },
  actions: {
    FETCH_DATA(context, searchTextBox) {
      context.commit("SAVE_SEARCHTEXT", searchTextBox.searchText);
      return movieSearch(searchTextBox)
        .then(res => {
          context.commit("SET_URL", res.data.results);
        })
        .catch(err => {
          console.log(err);
        });
    },
    FETCH_CLICK_MOVIE(context, id) {
      return getMovieDetail(id)
        .then(res => {
          console.log(res.data);
          context.commit("SET_CLICK_MOVIE", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    FETCH_IMG(context, imgURL) {
      return getMovieDetail(imgURL)
        .then(res => {
          console.log(res.data);
          context.commit("SET_IMG", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    FETCH_KEYWORD(context, keywordURL) {
      return getMovieDetail(keywordURL)
        .then(res => {
          context.commit("SET_KEYWORD", res.data.keywords);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
});
