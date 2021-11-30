<template>
  <div class="content">
    <div class="header">
      <s-icon name="wallet" size="big" />
      <s-icon name="settings" size="big" pointer @click="isOpenModal = true" />
    </div>

    <div class="dashboard">
      <!-- converter start -->
      <s-card title="Конвертер" class="converter">
        <div class="converter-content">
          <div class="col">
            <h4>Имеющаяся валюта:</h4>
            <s-select
              :options="currencies"
              label-key="title"
              value-key="symbol"
              v-model="d_fromSymbol"
              @input="updateRate"
            />

            <h4>обменять такую сумму:</h4>
            <s-currency-input
              v-model:from="convertedFromTo"
              v-model:to="convertedToFrom"
              :rate="rateToFrom"
              :symbol="fromSymbol"
              primary
            />
            <h4>1 {{ fromSymbol }} → {{ rateToFrom + " " + toSymbol }}</h4>
          </div>
          <div class="col">
            <h4>Нужная валюта:</h4>
            <s-select
              :options="currencies"
              label-key="title"
              value-key="symbol"
              v-model="d_toSymbol"
              @input="updateRate"
            />

            <h4>по этой цене:</h4>
            <s-currency-input
              v-model:from="convertedToFrom"
              v-model:to="convertedFromTo"
              :rate="rateFromTo"
              :symbol="toSymbol"
            />
            <h4>1 {{ toSymbol }} → {{ rateFromTo + " " + fromSymbol }}</h4>
          </div>
          <div class="row">
            <s-button @click="swapCurrency">Поменять валюты местами</s-button>
          </div>
        </div>
      </s-card>
      <!-- converter end -->
      <!-- history start -->
      <s-card
        v-if="widgets[0].visible"
        title="История за 10 дней"
        class="history"
      >
        <template v-slot:tools>
          <s-icon
            size="big"
            name="close"
            pointer
            @click="widgets[0].visible = false"
          />
        </template>

        <s-table :data="history">
          <s-column field="date" header="Дата:" size="80px" />
          <s-column field="rate" header="Цена:" style="justify-content: end">
            <template #body="{ row }">
              {{ currencyFormat(1, row.fromSymbol) }} =
              {{ currencyFormat(row.rate, row.toSymbol) }}
            </template>
          </s-column>
        </s-table>
      </s-card>
      <!-- history end -->
      <!-- chart start -->
      <s-card
        v-if="widgets[1].visible"
        title="Последние тенденции"
        class="chart"
      >
        <template v-slot:tools>
          <s-icon
            size="big"
            name="close"
            pointer
            @click="widgets[1].visible = false"
          />
        </template>

        <div ref="getHeightChart" style="height: 100%">
          <LineChart
            v-if="getHeightChart"
            :height="getHeightChart"
            :chart-data="dataChart"
          />
        </div>
      </s-card>
      <!-- chart end -->
      <!-- costs start -->
      <s-card v-if="widgets[2].visible" title="Список стоимостей" class="costs">
        <template v-slot:tools>
          <s-icon
            size="big"
            name="close"
            pointer
            @click="widgets[2].visible = false"
          />
        </template>

        <s-table :data="costsList" border>
          <s-column field="index" header="Количество:">
            <template #body="{ row }">
              {{ currencyFormat(row.index, row.fromSymbol) }}<br />
              {{ currencyFormat(row.index, row.toSymbol) }}
            </template>
          </s-column>

          <s-column
            field="index"
            header="Стоимость:"
            style="justify-content: end; text-align: right"
          >
            <template #body="{ row }">
              {{ row.rateFromTo }}<br />
              {{ row.rateToFrom }}
            </template>
          </s-column>
        </s-table>
      </s-card>
    </div>
    <!-- costs end -->
    <s-modal title="Отображение виджетов" v-model:is-open="isOpenModal">
      <template v-slot:content>
        <ul class="modal-list">
          <li v-for="widget in widgets" :key="widget">
            {{ widget.title }}
            <s-radio name="name" v-model="widget.visible" />
          </li>
        </ul>
      </template>
    </s-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SButton from "@/components/ui/SButton";
import SCard from "@/components/ui/SCard";
import SCurrencyInput from "@/components/ui/SCurrencyInput";
import SSelect from "@/components/ui/SSelect";
import SIcon from "@/components/ui/SIcon";
import STable from "@/components/ui/STable/STable";
import SColumn from "@/components/ui/STable/SColumn";
import { currencyFormat } from "@/helpers";
import { LineChart } from "vue-chart-3";
import SModal from "@/components/ui/SModal";
import SRadio from "@/components/ui/SRadio";

export default {
  name: "App",
  components: {
    SRadio,
    SModal,
    SColumn,
    STable,
    SIcon,
    SSelect,
    SCurrencyInput,
    SCard,
    SButton,
    LineChart,
  },

  data() {
    return {
      isOpenModal: false,
      getHeightChart: null,
      convertedFromTo: 1,
      convertedToFrom: 0,
      d_fromSymbol: "RUB",
      d_toSymbol: "USD",
      widgets: [
        { title: "История за 10 дней:", visible: true },
        { title: "Список стоимостей:", visible: true },
        { title: "Последние тенденции:", visible: true },
      ],
    };
  },

  computed: {
    ...mapGetters({
      currencies: "GET_CURRENCIES",
      history: "GET_HISTORY",
      fromSymbol: "GET_FROM_SYMBOL",
      toSymbol: "GET_TO_SYMBOL",
      rateFromTo: "GET_RATE_FROM_TO",
      rateToFrom: "GET_RATE_TO_FROM",
    }),

    costsList() {
      const index = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];
      if (!this.rateFromTo || !this.rateToFrom) return;
      return index.map((idx) => {
        return {
          toSymbol: this.toSymbol,
          fromSymbol: this.fromSymbol,
          rateFromTo: currencyFormat(this.rateFromTo * idx, this.toSymbol),
          rateToFrom: currencyFormat(this.rateToFrom * idx, this.fromSymbol),
          index: idx,
        };
      });
    },

    dataChart() {
      return {
        labels: this.history?.map((h) => h.date),
        datasets: [
          {
            data: this.history?.map((h) => h.rate),
            borderColor: "#26DE81",
            backgroundColor: "#ffffff",
          },
        ],
      };
    },
  },

  methods: {
    currencyFormat,

    async updateRate() {
      await this.$store.dispatch("GET_RATE", {
        fromSymbol: this.d_fromSymbol,
        toSymbol: this.d_toSymbol,
      });
      this.$store.dispatch("GET_HISTORY");
    },

    swapCurrency() {
      [this.d_fromSymbol, this.d_toSymbol] = [this.toSymbol, this.fromSymbol];
      this.updateRate();
    },
  },

  async mounted() {
    this.getHeightChart = this.$refs.getHeightChart.offsetHeight;
    await this.$store.dispatch("GET_CURRENCIES");
    await this.updateRate();
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

  @media screen and (max-width: 540px) {
    padding: 10px 20px;
  }

  & .s-icon--wallet {
    path {
      fill: #f2911b;
    }
  }
}

.dashboard {
  height: calc(100vh - 200px);
  padding-left: 20px;
  padding-right: 20px;
  min-height: 700px;
  display: grid;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  grid-template-areas:
    "converter history"
    "chart costs ";

  grid-template-columns: calc(60% - 40px) 40%;
  grid-template-rows: calc(50% - 16px) calc(50% - 16px);
  grid-column-gap: 32px;
  grid-row-gap: 32px;

  @media screen and (max-width: 1023px) {
    height: auto;
    grid-template-areas:
      "converter converter"
      "history costs"
      "chart chart";

    grid-template-columns: 50%;
    grid-template-rows: auto;
  }

  @media screen and (max-width: 760px) {
    grid-template-areas:
      "converter"
      "history"
      "costs"
      "chart";

    grid-template-columns: 100%;
  }

  & .converter {
    grid-area: converter;
    @media screen and (max-width: 1023px) {
      min-height: 350px;
    }

    &-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .col {
        width: calc(50% - 16px);

        @media screen and (max-width: 540px) {
          width: 100%;
          margin-top: 40px;

          &:first-child {
            margin-top: 0;
          }
        }

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
    @media screen and (max-width: 1023px) {
      min-height: 400px;
    }
  }
  & .costs {
    grid-area: costs;
  }
}
</style>
