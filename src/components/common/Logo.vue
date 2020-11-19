<template>
  <div class="logo">
    <button @click.prevent="goMain">Movie Search</button>
  </div>
</template>

<script>
export default {
  methods: {
    goMain() {
      // 그냥 '/main'을 push하니까 오류 발생해서 if문을 이용해서 main이 아닐 경우에만 이동하도록하고,
      // catch를 이용해서 만약 에러뜨면 콘솔에 뜨도록 함.
      // if(this.$router.currentRoute.name !== 'main') {  // name으로 if문을 판단했을 때에는 오류 계속 났었음. path로 판단하니 오류 안남!!
      if (this.$router.currentRoute.path !== "/main") {
        this.$router.push("/main").catch(error => {
          console.log(error);
        });
      }
    }
  }
};
</script>

<style></style>
