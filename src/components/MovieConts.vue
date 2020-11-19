<template>
  <div class="movieConts">
    <button class="gomainBtn" @click.prevent="goMain">
      <span class="arrow">← </span>
      <span class="text">BACK</span>
    </button>

    <!-- 영화 검색한 단어 출력 -->
    <h2>{{ searchText }}</h2>

    <div class="person" v-if="savedSearchText.type === 'person'">
      <div class="movieCount">
        <span class="count">
          총 {{ moviedata.length }}명이 검색되었습니다.
        </span>
        <!-- <span class="informText">
          ( 오른쪽으로 스크롤 하면 순서대로 모든 영화 목록을 볼 수 있습니다. )
        </span> -->
      </div>

      <div class="movieListBox clear">
        <div
          class="movieList"
          v-for="person in moviedata"
          :key="person.id"
          v-bind="savePersonKnownFor(person)"
        >
          <div class="imgBox">
            <img :src="getPoster(person.profile_path)" alt="" />
          </div>
          <span class="title" v-if="person.name">{{ person.name }}</span>
          <button @click="goInform(person.id)">자세히</button>
        </div>
      </div>
    </div>

    <div class="movieTv" v-else>
      <div class="movieCount">
        <span class="count">
          총 {{ moviedata.length }}개의 영화가 검색되었습니다.
        </span>
        <!-- <span class="informText">
          ( 오른쪽으로 스크롤 하면 순서대로 모든 영화 목록을 볼 수 있습니다. )
        </span> -->
      </div>

      <div class="movieListBox clear" v-if="moviedata">
        <div class="movieList" v-for="movie in moviedata" :key="movie.id">
          <!-- v-bind="bgPoster(movie)" -->
          <div class="imgBox">
            <img :src="getPoster(movie.poster_path)" alt="" />
          </div>
          <div class="detailBox">
            <span class="title" v-if="movie.title">{{ movie.title }}</span>
            <span class="title" v-else>{{ movie.name }}</span>
            <span class="originalTitle">{{ movie.original_title }}</span>
            <span class="year" v-if="movie.release_date">
              {{ `( ${getReleaseYear(movie.release_date)} )` }}
            </span>
            <span class="year" v-else>
              {{ `( ${getReleaseYear(movie.first_air_date)} )` }}
            </span>

            <span class="score">{{ movie.vote_average }}</span>
          </div>

          <button @click="goInform(movie.id)">영화 상세 페이지 바로가기</button>
          <!--.showInform-->
        </div>
        <!--.movieList-->
      </div>
      <!--.movieTv-->
    </div>
    <!--.movieListBox-->
  </div>
</template>

<script>
import { eventbus } from "@/main.js";
import InformConts from "@/components/InformConts.vue";
import {
  saveGenreList,
  saveValue,
  saveClickMovieId,
  saveKeyword,
  savePersonData,
  getCookieSearchText
  // getClickMovieId
} from "@/utils/cookies.js";
import {
  fetch_data,
  fetch_click_movie,
  fetch_keyword,
  // fetch_img,
  cutYear
} from "@/utils/common.js";
export default {
  data() {
    return {
      InformConts,
      savedSearchText: "",
      knownForArr: [],
      checkNum: 0,
      goInformCheck: false
    };
  },
  computed: {
    searchText() {
      return this.$store.state.searchText;
    },
    moviedata() {
      return this.$store.state.moviedata;
    }
  },
  created() {
    // 페이지 새로고침 할 경우 cookie에 저장 된 검색어로 다시 검색.
    this.savedSearchText = JSON.parse(getCookieSearchText());
    fetch_data(this.savedSearchText);
  },
  methods: {
    goMain() {
      // main페이지로 넘어갈 때 모든 쿠키데이터 초기화.
      const blank = "";
      saveGenreList(blank);
      saveValue(blank);
      saveClickMovieId(blank);
      saveKeyword(blank);
      savePersonData(blank);
      this.$router.push("/main");
    },
    goInform(movieId) {
      // 클릭한 영화 api 실행.
      const clickData = `${this.savedSearchText.type}/${movieId}`;
      saveClickMovieId(clickData); // 클릭한 영화ID cookie에 저장.
      fetch_click_movie(clickData);
      fetch_keyword(`${clickData}/keywords`);
      // fetch_img(`${clickData}/rating`);

      // 배우별 작품 cookie에 저장.
      this.saveCookieKnownFor(movieId);

      // 이동 버튼 눌렀다는 신호 InformConts.vue로 전달.
      this.goInformCheck = true;
      eventbus.$emit("checkGoInform", this.goInformCheck);

      // // informConts컴포넌트로 이동.
      // this.$router.push("/inform");
    },
    getPoster(url) {
      return `https://image.tmdb.org/t/p/w200/${url}`;
    },
    getReleaseYear(date) {
      if (!date) return;
      return cutYear(date);
    },
    savePersonKnownFor(data) {
      // 해당 함수가 무한반복되어 멈추기 위한 조건을 줌.
      if (this.checkNum === this.moviedata.length) return;
      console.log("사람 데이터 저장되나...?");
      const saveData = {
        id: data.id,
        knownForData: data.known_for
      };
      this.knownForArr.push(saveData);
      this.checkNum++;
    },
    saveCookieKnownFor(personId) {
      this.knownForArr.forEach(ele => {
        if (ele.id === personId) {
          // 클릭한 배우 id와 같은 id를 가진 작품들을 함수 인자로 넣음.
          savePersonData(ele);
        }
      });
    }
    // bgPoster(movie) {
    //   // console.dir(movie);
    // }
  }
};
</script>

<style scoped></style>
