<template>
  <button class="s-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: "SButton",
};
</script>

<style scoped lang="scss">
.s-button {
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  padding: 10px 20px;
  background-color: rgba(38, 222, 129, 0.8);
  border: none;
  border-radius: 30px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(38, 222, 129, 1);
  }

  &[disabled] {
    background-color: rgba(38, 222, 129, 0.5);
  }
}
</style>
