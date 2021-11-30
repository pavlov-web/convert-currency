<template>
  <div
    :class="[`s-switcher`, { 's-switcher--active': modelValue }]"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span class="s-switcher-check" />
  </div>
</template>

<script>
export default {
  name: "SRadio",
  emits: ["update:modelValue"],
  props: {
    modelValue: Boolean,
  },
};
</script>

<style scoped lang="scss">
.s-switcher {
  display: flex;
  align-items: center;
  width: 40px;
  min-width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: #bec8cd;
  cursor: pointer;
  padding: 2px;
  box-shadow: inset -1px 1px 2px rgba(42, 49, 53, 0.1),
    inset 1px -1px 2px rgba(255, 255, 255, 0.5);

  &--active {
    background-color: #26de81;

    .s-switcher-check {
      margin-left: 20px;
    }
  }

  &-check {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: 0.3s;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(42, 49, 53, 0.3),
      inset -1px 1px 1px rgba(42, 49, 53, 0.1);
  }
}
</style>
