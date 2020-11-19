<template>
  <div class="informConts" v-if="this.goInformCheck === true">
    <img
      class="fullBG"
      :src="getIMG(movieData.backdrop_path)"
      alt=""
      v-if="movieData.backdrop_path"
    />
    <img :src="getIMG(movieData.poster_path)" alt="" class="fullBG" v-else />
    <button class="closeBtn" @click="goMovie()">✕</button>

    <div class="movie clear" v-if="type === 'movie'">
      <div class="bgBox">
        <img
          :src="getIMG(movieData.poster_path)"
          alt=""
          v-if="movieData.poster_path"
        />
        <img :src="getIMG(movieData.backdrop_path)" alt="" v-else />
      </div>

      <div class="titleBox">
        <h2>
          {{ movieData.title }} ( {{ getReleaseYear(movieData.release_date) }} )
        </h2>
        <span class="originalTitle" v-if="movieData.original_title">
          {{ movieData.original_title }}
        </span>
      </div>

      <div class="detailBox">
        <ul class="similarGenre">
          <li v-for="genre in movieData.genres" :key="genre.id">
            {{ genre.name }}
          </li>
        </ul>
        <span class="releaseDate" v-if="movieData.release_date"
          >{{ changehyphen(movieData.release_date) }} 개봉</span
        >
        <span class="runtime">{{ movieData.runtime }} 분</span>
        <span class="score">{{ movieData.vote_average }} / 10</span>
        <a class="homepage" :href="movieData.homepage" target="blank"
          >영화 상세정보</a
        >
      </div>

      <div class="overviewBox">
        <p>{{ movieData.tagline }}</p>
        <span class="overview">{{ movieData.overview }}</span>
      </div>

      <ul class="keyword">
        <li v-for="keyword in keywords" :key="keyword.id">
          # {{ keyword.name }}
        </li>
      </ul>

      <div class="backdropImg">
        <img :src="getIMG(movieData.backdrop_path)" alt="" />
      </div>
    </div>
    <!--.movie-->

    <div class="tv" v-if="type === 'tv'">
      <img
        :src="getIMG(movieData.poster_path)"
        class="fullBG"
        alt=""
        v-if="movieData.poster_path"
      />
      <img
        :src="getIMG(movieData.backdrop_path)"
        class="fullBG"
        alt=""
        v-else
      />

      <div class="titleBox">
        <h2>
          {{ movieData.name }} (
          {{ getReleaseYear(movieData.first_air_date) }} )
        </h2>
        <span class="originalTitle" v-if="movieData.original_name">
          {{ movieData.original_name }}
        </span>
      </div>

      <div class="detailBox">
        <ul class="similarGenre">
          <li v-for="genre in movieData.genres" :key="genre.id">
            {{ genre.name }}
          </li>
        </ul>
        <span class="releaseDate"
          >{{ movieData.first_air_date }} ~ {{ movieData.last_air_date }}</span
        >
        <span class="seasons"
          >시즌 {{ movieData.number_of_seasons }}개
          {{ movieData.number_of_episodes }}부작</span
        >
        <span class="director">(감독) {{ movieData.created_by[0].name }}</span>
        <a
          class="homepage"
          :href="movieData.homepage"
          target="blank"
          v-if="movieData.homepage"
          >관련 링크</a
        >
      </div>
    </div>
    <!--.tv-->

    <div class="person" v-if="type === 'person'">
      <div class="titleBox">
        <h2>{{ movieData.name }}</h2>
      </div>

      <img :src="getIMG(movieData.profile_path)" alt="" />

      <div class="detailBox">
        <span class="department" v-if="movieData.known_for_department">
          {{ movieData.known_for_department }}
        </span>
        <p class="releaseDate">
          <span v-if="movieData.birthday">{{
            changehyphen(movieData.birthday)
          }}</span>
          <span v-if="movieData.deathday"
            >~ {{ changehyphen(movieData.deathday) }}</span
          >
        </p>
        <span class="placeOfBirth" v-if="movieData.place_of_birth">{{
          movieData.place_of_birth
        }}</span>
        <a
          class="homepage"
          :href="movieData.homepage"
          target="blank"
          v-if="movieData.homepage"
          >웹사이트</a
        >
      </div>

      <div class="personMovieBox">
        <h3>출연 작품</h3>
        <ul>
          <li v-for="movie in personMovieArr" :key="movie.id">
            <img :src="getIMG(movie.poster_path)" alt="" />
            <span class="title"
              >{{ movie.title }}
              <span class="date"
                >( {{ getReleaseYear(movie.release_date) }} )</span
              ></span
            >
            <span class="overview">{{ movie.overview }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--.person-->
  </div>
</template>

<script>
import { eventbus } from "@/main.js";
import { getClickMovieId, getPersonData } from "@/utils/cookies.js";
import {
  fetch_click_movie,
  fetch_keyword,
  // fetch_img,
  cutYear,
  changeHyphen
} from "@/utils/common.js";
export default {
  data() {
    return {
      type: "",
      personMovieArr: JSON.parse(getPersonData()).knownForData,
      goInformCheck: ""
    };
  },
  computed: {
    movieData() {
      return this.$store.state.clickMovieData;
    },
    keywords() {
      return this.$store.state.keywordList;
    },
    images() {
      console.log(this.$store.state.imgList);
      return this.$store.state.imgList;
    }
  },
  created() {
    const movieId = getClickMovieId();
    this.type = movieId.split("/")[0];

    // 새로고침시 cookie에 저장 된 click한 영화 id 불러와 url완성.
    if (this.type === "person") {
      fetch_click_movie(movieId);
    } else {
      fetch_click_movie(movieId);
      fetch_keyword(`${movieId}/keywords`);
      // fetch_img(`${movieId}/rating`);
    }

    // MovieConts.vue에서 보내준 goInform 체크 값 받음.
    eventbus.$on("checkGoInform", data => {
      this.goInformCheck = data;
    });
  },
  methods: {
    getIMG(url) {
      return `https://image.tmdb.org/t/p/w300/${url}`;
    },
    getReleaseYear(date) {
      if (!date) return;
      return cutYear(date);
    },
    changehyphen(date) {
      return changeHyphen(date);
    },
    goMovie() {
      this.goInformCheck = false;
      // this.$router.push("/movie");
    }
  }
};
</script>

<style scoped></style>
