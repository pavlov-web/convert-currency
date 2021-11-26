<template>
  <div class="content">
    <s-button disabled @click="add">Кнопка</s-button>
    <s-button @click="add">Кнопка</s-button>
    <s-card title="Конвертер" />
    <s-input type="number" min="1" />
    <s-select :options="currencies" label-key="title" value-key="symbol" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SButton from "@/components/ui/SButton";
import SCard from "@/components/ui/SCard";
import SInput from "@/components/ui/SInput";
import SSelect from "@/components/ui/SSelect";

export default {
  name: "App",
  components: { SSelect, SInput, SCard, SButton },

  computed: {
    ...mapGetters({
      currencies: "GET_CURRENCIES",
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
@import "src/assets/scss/base";
</style>
