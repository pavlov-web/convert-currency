import { createStore } from "vuex";
import api from "@/api";
import locales from "@/locales/ru.json";
import { getArrayDateOffset } from "@/helpers";

export default createStore({
  state: {
    locales,
    currencies: null,
    history: null,
    rate: null,
    from: "RUB",
    to: "USD",
    error: null,
    loading: true,
  },

  getters: {
    GET_RATE: (state) => state.rate,
    GET_HISTORY: (state) => state.rate,
    GET_CURRENCIES: (state) => state.currencies,
    GET_CURRENT_SYMBOL: (state) => state.from,
    GET_TARGET_SYMBOL: (state) => state.to,
  },

  mutations: {
    SET_RATE: (state, data) => (state.rate = data),
    SET_HISTORY: (state, data) => (state.history = data),
    SET_CURRENCIES: (state, data) => {
      setTimeout(() => {
        state.currencies = data;
      }, 2000);
    },
    SET_CURRENT_SYMBOL: (state, data) => (state.from = data),
    SET_TARGET_SYMBOL: (state, data) => (state.to = data),
  },

  actions: {
    GET_CURRENCIES: async ({ commit, state }) => {
      const { data } = await api.get("/currencies");

      const symbols = Object.keys(data.currencies);
      const localeCurrencies = symbols.map((symbol) => {
        return { symbol, title: state.locales[symbol] || symbols[symbol] };
      });

      commit("SET_CURRENCIES", localeCurrencies);
    },

    GET_RATE: async ({ commit, state }) => {
      const { from, to } = state;

      const current = await api.get("/convert", {
        params: { from: from, to: to, amount: 1 },
      });

      const target = await api.get("/convert", {
        params: { from: to, to: from, amount: 1 },
      });

      commit("SET_RATE", {
        from_to: current.data.result.rate,
        to_from: target.data.result.rate,
      });
    },

    GET_HISTORY: async ({ commit, state }) => {
      const { from, to } = state;

      const dates = getArrayDateOffset(10);
      const history = [];

      for (let i = 0; i < dates.length; i++) {
        const { data } = await api.get("/historical", {
          params: {
            from: from,
            to: to,
            date: dates[i],
          },
        });

        history.push({
          from: data.base,
          to: to,
          date: data.date,
          rate: data.results[to],
        });
      }

      commit("SET_HISTORY", history);
    },
  },
});
