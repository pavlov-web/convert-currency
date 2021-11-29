<template>
  <div
    :class="`s-icon s-icon-${size}`"
    v-html="getIcon"
    :style="pointer && 'cursor: pointer'"
  />
</template>

<script>
export default {
  name: "SIcon",
  props: {
    name: String,
    pointer: Boolean,
    size: {
      type: String,
      default: "medium",
    },
  },
  computed: {
    getIcon() {
      try {
        return require(`!!raw-loader!../../assets/icons/${this.name}.svg`)
          .default;
      } catch (e) {
        return console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.s-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  &-big {
    width: 32px;
    height: 32px;
  }
  &-medium {
    width: 20px;
    height: 20px;
  }
  &-small {
    width: 12px;
    height: 12px;
  }
}
</style>
