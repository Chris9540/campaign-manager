<template>
  <span :class="style">
    <slot/>
  </span>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        required: false,
        default: 'default',
        validator: prop => ['primary', 'secondary', 'danger', 'success', 'default', 'blue', 'purple', 'yellow'].includes(prop)
      },
    },
    computed: {
      style() {
        return `pill-root button-${this.color} p-1 ml-1 mr-1 elevation-1`
      }
    },
  }
</script>

<style lang="scss" scoped>
.pill-root {
  border-radius: 999px;
  transition: $transition;
  cursor: pointer;
}
</style>