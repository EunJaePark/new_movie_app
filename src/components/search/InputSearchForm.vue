<template>
  <div class="inputSearchForm">
    <div class="mainText">
      <span>찾고 싶은</span> <span>❝영화❞를</span> <span>입력해 주세요.</span>
    </div>

    <div class="searchBox">
      <form class="typeCheck" v-bind="checkNow()">
        <label
          v-for="(item, index) in searchType"
          :key="index"
          :class="{ checkStyle: check === item.type }"
        >
          <input
            type="radio"
            name="search"
            v-model="check"
            :value="item.type"
          /><span class="drawBorder meet center">{{ item.typeKR }}</span>
        </label>
      </form>

      <form class="inputBox" @submit.prevent="submitSearchData">
        <input
          type="text"
          v-model="searchText"
          :placeholder="`${checknow}를 입력하세요`"
        />
        <button :class="{ bgMint: searchText !== '' }">검색</button>
        <span class="alertText">{{ checknow }}를 입력해 주세요!</span>
      </form>
    </div>
  </div>
</template>

<script>
import { saveValue, deleteCookieMovie } from "@/utils/cookies.js";
import { fetch_data } from "@/utils/common.js";
export default {
  data() {
    return {
      searchType: [
        {
          type: "movie",
          typeKR: "영화"
        },
        {
          type: "tv",
          typeKR: "TV프로"
        },
        {
          type: "person",
          typeKR: "감독 • 배우"
        }
      ],
      searchText: "",
      check: "movie",
      checknow: ""
    };
  },
  created() {
    // main페이지 접속 시 쿠키에 저장된 검색어 삭제.
    deleteCookieMovie("SEARCH_TEXT");
  },
  methods: {
    submitSearchData() {
      console.log("검색 함수 실행된다");
      if (this.searchText === "") {
        const alertText = document.querySelector(".alertText");
        alertText.classList.add("show");
        setTimeout(() => {
          alertText.classList.add("opacity");
        }, 100);
        setTimeout(() => {
          alertText.classList.remove("opacity");
        }, 1300);
        setTimeout(() => {
          alertText.classList.remove("show");
        }, 1800);
        return;
      }

      const searchTextBox = {
        searchText: this.searchText,
        type: this.check
      };

      // cookie에 검색어 저장.
      saveValue(searchTextBox);
      // store - state에 제목검색어 넣어줌.
      fetch_data(searchTextBox);
      // movie페이지로 이동.
      this.$router.push("/movie");
      // input창 비워줌.
      this.searchText === "";
    },
    // 클릭된 검색 분야 데이터 생성.
    checkNow() {
      this.searchType.forEach(ele => {
        if (ele.type === this.check) {
          this.checknow = ele.typeKR;
        }
      });
    }
  }
};
</script>

<style scoped></style>
