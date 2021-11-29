<template>
  <div class="s-table">
    <slot />
    <div class="s-table-header">
      <template v-for="(col, idx) in columns" :key="idx">
        <div
          class="s-table-column"
          :style="[columnStyle(col), col.props.style]"
        >
          {{ col.props.header }}
        </div>
      </template>
    </div>
    <div class="s-table-content">
      <div v-for="(row, idx) in data" :key="idx" :class="['s-table-row']">
        <template v-for="(col, idx) in columns" :key="idx">
          <div
            class="s-table-column"
            :style="[columnStyle(col), col.props.style]"
          >
            <component v-if="col.children" :is="col.children.body" :row="row" />
            <template v-else>
              {{ row[col.props.field] }}
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "STable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    columns() {
      return this.$slots.default ? this.$slots.default() : null;
    },
  },
  methods: {
    columnStyle(col) {
      return (
        col.props.size &&
        `min-width: ${col.props.size}; width: ${col.props.size};`
      );
    },
  },
};
</script>

<style scoped lang="scss">
.s-table {
  color: #bec8cd;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  height: 100%;

  &-header {
    padding-bottom: 10px;
    padding-right: 10px;
  }

  &-header,
  &-row {
    display: flex;
  }

  &-row {
    &:nth-child(2n) {
      background-color: #f3f5f9;
    }
  }

  &-content {
    overflow: auto;
    height: calc(100% - 32px);
    padding-right: 10px;
  }

  &-column {
    width: 100%;
    padding: 4px 8px;
    display: flex;
    align-items: center;
  }
}
</style>
