<template>
  <div class="content">
    <s-button disabled @click="add">Кнопка</s-button>
    <s-button @click="add">Кнопка</s-button>
    <s-card title="Конвертер">
      <template v-slot:tools>
        <s-icon name="settings" @click="add" pointer />
      </template>
    </s-card>
    <s-input type="number" min="1" />
    <s-select :options="currencies" label-key="title" value-key="symbol" />
    {{ values }}
    <ul v-if="currencies?.length">
      <li v-for="option in currencies.slice(0, 5)" :key="option.value">
        {{ option.title }}
        <s-radio name="name" v-model="values" :value="option" />
      </li>
    </ul>
    <s-modal title="Title" v-model:is-open="isOpenModal">
      <template v-slot:content>
        <s-button @click="add">Кнопка</s-button>
      </template>
    </s-modal>
    <s-card title="Конвертер">
      <template v-slot:tools>
        <s-icon name="settings" @click="add" pointer />
      </template>
      <s-table :data="currencies">
        <s-column field="symbol" size="10%" />
        <s-column size="100px">
          <template #body>
            <s-icon name="double-down" />
          </template>
        </s-column>
        <s-column field="symbol" header="Валюта:" size="5vw" />
      </s-table>
    </s-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SButton from "@/components/ui/SButton";
import SCard from "@/components/ui/SCard";
import SInput from "@/components/ui/SInput";
import SSelect from "@/components/ui/SSelect";
import SRadio from "@/components/ui/SRadio";
import SIcon from "@/components/ui/SIcon";
import SModal from "@/components/ui/SModal";
import STable from "@/components/ui/STable/STable";
import SColumn from "@/components/ui/STable/SColumn";

export default {
  name: "App",
  components: {
    SColumn,
    STable,
    SModal,
    SIcon,
    SRadio,
    SSelect,
    SInput,
    SCard,
    SButton,
  },

  data() {
    return {
      values: { symbol: "AFN", title: "Афганский афгани" },
      isOpenModal: false,
    };
  },

  computed: {
    ...mapGetters({
      currencies: "GET_CURRENCIES",
    }),
  },

  methods: {
    add() {
      this.isOpenModal = true;
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
