<!--著色模版-->
<template>
  <h1>{{ msg }}</h1>
</template>

<!--型態描述-->
<style scoped>
  h1 {
    color: red;
  }
</style>

<!--元件邏輯-->
<script>
  export default {
    data() {
      return {
        msg: 'Hello,Webpack'
      }
    }
  }
</script>
