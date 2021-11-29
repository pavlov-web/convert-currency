<template>
  <teleport to="body">
    <transition name="fade">
      <div class="s-modal" v-if="isOpen">
        <div class="s-modal-header">
          <h3>{{ title }}</h3>
          <s-icon
            name="close"
            size="big"
            pointer
            @click="$emit('update:isOpen', false)"
          />
        </div>
        <div class="s-modal-content">
          <slot name="content" />
        </div>
      </div>
    </transition>
  </teleport>

  <teleport to="body">
    <transition name="fade">
      <div
        v-if="isOpen"
        class="s-modal-background"
        @click="$emit('update:isOpen', false)"
      />
    </transition>
  </teleport>
</template>

<script>
import SIcon from "@/components/ui/SIcon";
export default {
  name: "SModal",
  components: { SIcon },
  emits: ["update:isOpen"],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: String,
  },
};
</script>

<style scoped lang="scss">
.s-modal {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(134, 140, 144, 0.05);
  border-radius: 16px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  min-width: 300px;

  &-background {
    width: 100vw;
    height: 100vh;
    z-index: 1001;
    background-color: rgba(42, 49, 53, 0.3);
    position: fixed;
    left: 0;
    top: 0;
  }

  &-header {
    padding: 32px 32px 12px;
    border-bottom: 1px solid #f3f5f9;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      margin-right: 30px;
    }
  }

  &-content {
    padding: 24px 36px;
  }
}
</style>
