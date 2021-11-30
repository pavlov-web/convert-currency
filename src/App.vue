<template>
  <div class="content">
    <div class="header">
      <s-icon name="wallet" size="big" />
      <s-icon name="settings" size="big" />
    </div>

    <div class="dashboard">
      <s-card title="Конвертер" class="converter">
        <div class="converter-content">
          <div class="col">
            <h4>Имеющаяся валюта:</h4>
            <s-select
              :options="currencies"
              label-key="title"
              value-key="symbol"
              :default="from"
              @input="updateRate($event, undefined)"
            />
            <h4>обменять такую сумму:</h4>
            <s-input
              v-model:from="from_currency"
              v-model:to="to_currency"
              :rate="rate?.from_to"
              :symbol="from"
            />
            <h4>1 {{ from }} → {{ rate?.from_to?.toFixed(5) + " " + to }}</h4>
          </div>
          <div class="col">
            <h4>Нужная валюта:</h4>

            <s-select
              :options="currencies"
              label-key="title"
              value-key="symbol"
              :default="to"
              @input="updateRate(undefined, $event)"
            />
            <h4>по этой цене:</h4>
            <s-input
              v-model:from="to_currency"
              v-model:to="from_currency"
              :rate="rate?.to_from"
              :symbol="to"
            />
            <h4>1 {{ to }} → {{ rate?.to_from?.toFixed(5) + " " + from }}</h4>
          </div>
          <div class="row">
            <s-button @click="swap">Поменять валюты местами</s-button>
          </div>
        </div>
      </s-card>

      <s-card title="История за 10 дней" class="history">
        <template v-slot:tools>
          <s-icon name="settings" pointer />
        </template>

        <s-table :data="history">
          <s-column field="date" header="Дата:" size="80px" />
          <s-column field="rate" header="Цена:" style="justify-content: end">
            <template #body="{ row }">
              {{ currencyFormat(1, row.from) }} =
              {{ currencyFormat(row.rate, row.to) }}
            </template>
          </s-column>
        </s-table>
      </s-card>

      <s-card title="Последние тенденции" class="chart">
        <template v-slot:tools>
          <s-icon name="settings" pointer />
        </template>
        <div ref="getHeightChart" style="height: 100%">
          <LineChart
            :height="getHeight"
            v-if="isChart"
            :chart-data="testData"
          />
        </div>
      </s-card>

      <s-card title="Список стоимостей" class="costs">
        <template v-slot:tools>
          <s-icon name="settings" pointer />
        </template>

        <s-table :data="costs" border>
          <s-column field="index" header="Количество:">
            <template #body="{ row }">
              {{ currencyFormat(row.index, row.from) }}<br />
              {{ currencyFormat(row.index, row.to) }}
            </template>
          </s-column>
          <s-column
            field="index"
            header="Стоимость:"
            style="justify-content: end; text-align: right"
          >
            <template #body="{ row }">
              {{ row.from_to }}<br />
              {{ row.to_from }}
            </template>
          </s-column>
        </s-table>
      </s-card>
    </div>

    <!--    <ul v-if="currencies?.length">-->
    <!--      <li v-for="option in currencies.slice(0, 5)" :key="option.value">-->
    <!--        {{ option.title }}-->
    <!--        <s-radio name="name" v-model="values" :value="option" />-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--    <s-modal title="Title" v-model:is-open="isOpenModal">-->
    <!--      <template v-slot:content>-->
    <!--        <s-button @click="add">Кнопка</s-button>-->
    <!--      </template>-->
    <!--    </s-modal>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SButton from "@/components/ui/SButton";
import SCard from "@/components/ui/SCard";
import SInput from "@/components/ui/SInput";
import SSelect from "@/components/ui/SSelect";
import SIcon from "@/components/ui/SIcon";
import STable from "@/components/ui/STable/STable";
import SColumn from "@/components/ui/STable/SColumn";
import { currencyFormat } from "@/helpers";
import { LineChart } from "vue-chart-3";

export default {
  name: "App",
  components: {
    SColumn,
    STable,
    SIcon,
    SSelect,
    SInput,
    SCard,
    SButton,
    LineChart,
  },

  data() {
    return {
      isOpenModal: false,
      isChart: false,
      from_currency: 1,
      to_currency: null,
    };
  },

  computed: {
    ...mapGetters({
      currencies: "GET_CURRENCIES",
      history: "GET_HISTORY",
      from: "GET_FROM",
      to: "GET_TO",
      rate: "GET_RATE",
    }),

    costs() {
      const index = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];
      if (!this.rate) return;
      return index.map((idx) => {
        return {
          to: this.to,
          from: this.from,
          from_to: currencyFormat(this.rate.from_to * idx, this.to),
          to_from: currencyFormat(this.rate.to_from * idx, this.from),
          index: idx,
        };
      });
    },

    getHeight() {
      return this.$refs.getHeightChart.offsetHeight;
    },

    testData() {
      return {
        labels: this.history?.map((h) => h.date),
        datasets: [
          {
            label: false,
            data: this.history?.map((h) => h.rate),
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
            ],
          },
        ],
      };
    },
  },

  methods: {
    currencyFormat,
    async updateRate(from, to) {
      this.$store.dispatch("GET_RATE", {
        from: from?.symbol || this.from,
        to: to?.symbol || this.to,
      });
      this.$store.dispatch("GET_HISTORY");
    },

    swap() {
      [this.from, this.to] = [this.to, this.from];
      this.updateRate(this.from, this.to);
    },
  },

  async mounted() {
    await this.$store.dispatch("GET_CURRENCIES");
    await this.$store.dispatch("GET_RATE", {
      from: this.from,
      to: this.to,
    });
    await this.$store.dispatch("GET_HISTORY");
    this.isChart = true;
    console.log(this.$store.state);
    this.to_currency = this.rate.from_to;
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/base";

.header {
  display: flex;
  align-items: center;
  padding: 20px 60px;
  background-color: #fff;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(134, 140, 144, 0.05);
  margin-bottom: 70px;

  & .s-icon--wallet {
    path {
      fill: #f2911b;
    }
  }
}

.dashboard {
  height: calc(100vh - 200px);
  min-height: 700px;
  display: grid;
  max-width: 1360px;
  margin-left: auto;
  margin-right: auto;
  grid-template-areas:
    "converter history"
    "chart costs ";

  grid-template-columns: 60% 40%;
  grid-template-rows: calc(50% - 16px) calc(50% - 16px);
  grid-column-gap: 32px;
  grid-row-gap: 32px;

  & .converter {
    grid-area: converter;

    &-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .col {
        width: calc(50% - 16px);

        h4 {
          margin-bottom: 8px;
        }

        .s-select {
          margin-bottom: 20px;
        }
      }

      .row {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
    }
  }
  & .history {
    grid-area: history;
  }
  & .chart {
    grid-area: chart;
  }
  & .costs {
    grid-area: costs;
  }
}
</style>
