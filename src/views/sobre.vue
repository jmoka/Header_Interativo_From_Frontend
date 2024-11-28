<template>

    <Header/>
    {{ text }}

</template>

<script>
import Header from "../components/header.vue"
export default {

  name: "name",
  data() {
    return {
      text:"Sobre Nós"
    };
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
</style>