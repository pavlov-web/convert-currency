<template>
  <div class="s-table">
    <slot />
    <div class="s-table-header">
      <template v-for="(col, idx) in columns" :key="idx">
        <div
          v-if="col.props.header"
          class="s-table-column"
          :style="columnSize(col)"
        >
          {{ col.props.header }}
        </div>
      </template>
    </div>
    <div class="s-table-content">
      <div
        v-for="(row, idx) in data"
        :key="idx"
        :class="[
          's-table-row',
          {
            's-table-row--border': border,
          },
        ]"
      >
        <template v-for="(col, idx) in columns" :key="idx">
          <div class="s-table-column" :style="columnSize(col)">
            <component
              v-if="col.children"
              :is="col.children.body"
              :column="row"
              :field="col.props.field"
            />
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
    border: Boolean,
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
    columnSize(col) {
      return col.props.size && `width: ${col.props.size}`;
    },
  },
};
</script>

<style scoped lang="scss">
.s-table {
  color: #bec8cd;
  font-weight: bold;
  font-size: 12px;
  max-height: 100%;
  overflow: auto;

  &-header,
  &-row {
    display: flex;

    &--border {
      border-top: 1px solid #bec8cd;
    }
  }

  &-column {
    width: 100%;
    padding: 4px 8px;
    display: flex;
    align-items: center;
  }
}
</style>
