<template>
  <div class="s-radio" @click="$emit('update:modelValue', value)">
    <input ref="input" type="radio" :name="name" :checked="isChecked" />
    <span class="s-radio-check" />
  </div>
</template>

<script>
export default {
  name: "SRadio",
  emits: ["update:modelValue"],
  props: {
    modelValue: [String, Object],
    value: [String, Object],
    name: {
      type: String,
      default: "radio",
    },
  },
  computed: {
    isChecked() {
      return JSON.stringify(this.modelValue) === JSON.stringify(this.value);
    },
  },
};
</script>

<style scoped lang="scss">
.s-radio {
  display: flex;

  input {
    display: none;
  }

  &-check {
    border: 2px solid #bec8cd;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    transition: 0.3s;

    &:after {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #3777a2;
      content: "";
      left: 50%;
      top: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: 0.3s;
    }

    &:before {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background-color: rgba(55, 119, 162, 0.1);
      content: "";
      left: 50%;
      top: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: 0.3s;
      z-index: -1;
    }
  }

  input:checked + .s-radio-check {
    border: 2px solid #3777a2;

    &:after,
    &:before {
      opacity: 1;
    }
  }
}
</style>
