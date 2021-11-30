import { createStore } from "vuex";
import api from "@/api";
import locales from "@/locales/ru.json";
import { getArrayDateOffset } from "@/helpers";

export default createStore({
  state: {
    locales,
    currencies: null,
    history: null,
    rateFromTo: null,
    rateToFrom: null,
    fromSymbol: null,
    toSymbol: null,
    error: null,
    loading: true,
  },

  getters: {
    GET_RATE_FROM_TO: (state) => state.rateFromTo,
    GET_RATE_TO_FROM: (state) => state.rateToFrom,
    GET_HISTORY: (state) => state.history,
    GET_CURRENCIES: (state) => state.currencies,
    GET_FROM_SYMBOL: (state) => state.fromSymbol,
    GET_TO_SYMBOL: (state) => state.toSymbol,
  },

  mutations: {
    SET_RATE: (state, { from, to }) => {
      state.rateFromTo = to;
      state.rateToFrom = from;
    },
    SET_HISTORY: (state, data) => (state.history = data),
    SET_CURRENCIES: (state, data) => (state.currencies = data),
    SET_FROM_SYMBOL: (state, data) => (state.fromSymbol = data),
    SET_TO_SYMBOL: (state, data) => (state.toSymbol = data),
  },

  actions: {
    GET_CURRENCIES: async ({ commit, state }) => {
      const { data } = await api.get("/currencies");
      const symbols = Object.keys(data.currencies);
      const localesCurrencies = symbols.map((symbol) => {
        return { symbol, title: state.locales[symbol] || symbols[symbol] };
      });

      commit("SET_CURRENCIES", localesCurrencies);
    },

    GET_RATE: async ({ commit }, payload) => {
      const { fromSymbol, toSymbol } = payload;

      const current = await api.get("/convert", {
        params: { from: fromSymbol, to: toSymbol, amount: 1 },
      });

      const target = await api.get("/convert", {
        params: { from: toSymbol, to: fromSymbol, amount: 1 },
      });

      commit("SET_FROM_SYMBOL", fromSymbol);
      commit("SET_TO_SYMBOL", toSymbol);
      commit("SET_RATE", {
        from: current.data.result.rate,
        to: target.data.result.rate,
      });
    },

    GET_HISTORY: async ({ commit, state }) => {
      const { fromSymbol, toSymbol } = state;

      const dates = getArrayDateOffset(10);
      const history = [];

      for (let i = 0; i < dates.length; i++) {
        const { data } = await api.get("/historical", {
          params: { from: fromSymbol, to: toSymbol, date: dates[i] },
        });

        history.push({
          fromSymbol: data.base,
          toSymbol: toSymbol,
          date: new Date(data.date).toLocaleDateString("ru-RU"),
          rate: data.results[toSymbol],
        });
      }

      commit("SET_HISTORY", history);
    },
  },
});
