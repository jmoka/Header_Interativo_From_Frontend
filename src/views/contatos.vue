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
      text:"Contatos"
    };
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
</style>