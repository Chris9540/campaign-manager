<template>
  <div class="input-control">
    <label class="input-label pr-2 text-secondary">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted () {
    this.$slots.default.forEach((child) => {
      const { tag, elm } = child
      if (tag === 'input' || tag === 'select') {
        elm.classList.add(tag)
      }
    })
  }
}
</script>

<style lang="scss">
.input-control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 6px;
  height: 42px;
  .input-label {
    min-width: 50px;
    line-height: 1;
  }
  .input, .select {
    flex: 1;
    max-width: 400px;
  }
}
</style>
