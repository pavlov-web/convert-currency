<template>
  <div class="s-card">
    <div class="s-card-header">
      <h3>{{ title }}</h3>
      <slot name="tools" />
    </div>
    <div class="s-card-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "SCard",
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.s-card {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(134, 140, 144, 0.05);
  border-radius: 16px;

  &-header {
    padding: 32px 32px 12px;
    border-bottom: 1px solid #f3f5f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-content {
    padding: 24px 36px;
    height: calc(100% - 77px);
  }
}
</style>
