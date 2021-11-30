<template>
  <input
    class="s-input"
    :type="focus ? 'number' : 'text'"
    :value="value"
    @input="emitValue"
    @focus="focus = true"
    @blur="focus = false"
  />
</template>

<script>
import { currencyFormat, toFixed } from "@/helpers";

export default {
  name: "SCurrencyInput",
  emits: ["update:from", "update:to"],
  props: {
    from: {
      type: Number,
      default: 0,
    },
    to: {
      type: Number,
      default: 0,
    },
    rate: Number,
    symbol: String,
    primary: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focus: false,
      convertTo: null,
    };
  },

  methods: {
    emitValue(e) {
      const trimValue = toFixed(+e.target.value);
      this.$emit("update:from", trimValue);
      this.$emit("update:to", toFixed(trimValue * this.rate));
    },
  },

  computed: {
    value() {
      return this.focus ? this.from : currencyFormat(this.from, this.symbol);
    },
  },

  watch: {
    rate() {
      if (this.primary) {
        this.$emit("update:to", toFixed(this.from * this.rate));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.s-input {
  height: 32px;
  background: transparent;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #bec8cd;
  padding-left: 12px;
  padding-bottom: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #2a3135;
  transition: 0.3s;
  width: 100%;

  &:focus {
    border-bottom: 1px solid rgba(38, 222, 129, 1);
  }
}
</style>
