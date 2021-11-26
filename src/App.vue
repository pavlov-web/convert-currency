<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    HelloWorld,
  },

  computed: {
    ...mapGetters({
      currencies: "GET_CURRENCIES",
      currentCurrency: "GET_CURRENT_CURRENCY",
      targetCurrency: "GET_TARGET_CURRENCY",
    }),
  },

  methods: {
    add() {
      console.log(this.$store.state);
    },
  },

  async mounted() {
    await this.$store.dispatch("GET_CURRENCIES");
    await this.$store.dispatch("GET_RATE");
    await this.$store.dispatch("GET_HISTORY");
    this.add();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
