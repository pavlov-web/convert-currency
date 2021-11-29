<template>
  <div :class="['s-select', { 's-select--focus': focus }]">
    <div class="s-select-value">
      {{ selected[labelKey] }}
    </div>
    <s-icon v-if="!loaded" name="down" />
    <s-spinner v-if="loaded" name="spinner" />
    <teleport to="body">
      <transition name="fade">
        <ul
          ref="options"
          v-show="focus && options?.length"
          class="s-select-options"
        >
          <li
            v-for="option in options"
            :key="option[valueKey]"
            :class="['s-select-option', isSelected(option)]"
            @click="selected = option"
          >
            {{ option[labelKey] }}
          </li>
        </ul>
      </transition>
    </teleport>
  </div>
</template>

<script>
import SIcon from "@/components/ui/SIcon";
import SSpinner from "@/components/ui/SSpinner";

export default {
  name: "SSelect",
  components: { SSpinner, SIcon },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
      default: "label",
    },
    valueKey: {
      type: String,
      default: "value",
    },
    default: {
      type: Object,
      default: () => {},
    },
    loader: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      loaded: this.loader,
      focus: false,
      selected: {},
    };
  },

  methods: {
    toggle(e) {
      this.focus = this.$el.contains(e.target);
      if (this.focus) {
        const { left, top, height, width } = this.$el.getBoundingClientRect();
        Object.assign(this.$refs.options.style, {
          left: `${left + pageXOffset}px`,
          top: `${top + pageYOffset + height}px`,
          width: `${width}px`,
        });
      }
    },

    isSelected(option) {
      return option[this.valueKey] === this.selected[this.valueKey]
        ? "s-select-option--selected"
        : "";
    },
  },

  watch: {
    options: function (value) {
      if (value?.length) {
        this.selected = this.default || this.options[0];
        this.loaded = false;
      }
    },
  },

  created() {
    document.addEventListener("click", this.toggle);
  },

  deactivated() {
    document.removeEventListener("click", this.toggle);
  },
};
</script>

<style scoped lang="scss">
.s-select {
  background: #ffffff;
  border-radius: 4px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 6px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  user-select: none;
  margin: 20px;
  transition: 0.3s;
  box-shadow: 0 1px 2px rgba(97, 97, 97, 0.2), 0 2px 4px rgba(97, 97, 97, 0.2);

  &--focus {
  }

  &-value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    padding-right: 30px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }

  &-options {
    margin-top: 2px;
    position: absolute;
    z-index: 1000;
    list-style: none;
    max-height: 180px;
    overflow: scroll;
    border-top: none;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(97, 97, 97, 0.2), 0 2px 4px rgba(97, 97, 97, 0.2);
    border-radius: 4px;
    padding: 12px;
  }

  &-option {
    background: #ffffff;
    padding: 6px 12px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    transition: 0.3s;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #f3f5f9;
    }

    &--selected {
      background-color: #f3f5f9;
    }
  }
}
</style>
