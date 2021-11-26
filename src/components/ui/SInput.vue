<template>
  <input
    class="s-input"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "SInput",
  emits: ["update:modelValue"],
  props: {
    classes: String,
    modelValue: String,
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

  &:focus {
    border-bottom: 1px solid rgba(38, 222, 129, 1);
  }
}
</style>
