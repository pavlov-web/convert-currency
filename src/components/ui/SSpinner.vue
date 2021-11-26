<template>
  <div :class="`s-spinner s-spinner--${size}`">
    <s-icon name="spinner" />
  </div>
</template>

<script>
import SIcon from "@/components/ui/SIcon";
export default {
  name: "SSpinner",
  components: { SIcon },
  props: {
    size: {
      type: String,
      default: "medium",
    },
  },
};
</script>

<style scoped lang="scss">
.s-spinner {
  animation: spin 1s linear infinite;

  .s-icon {
    width: 100%;
    height: auto;
  }

  &-big {
    width: 60px;
    height: 60px;
  }
  &-medium {
    width: 30px;
    height: 30px;
  }
  &-small {
    width: 20px;
    height: 20px;
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
