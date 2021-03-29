<template>
  <main class="page-root" style="z-index: 10">
    <slot/>
    <div style="width:100%; font-size: 32px">
      &nbsp; 
    </div>
  </main>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$store.commit('setPage', {
      name: this.name,
      route: this.route
    })
  }
}
</script>

<style lang="scss">
.page-root {
  width: 100%;
  height: 100%;
  padding: $size-4 $size-6 - $size-1 $size-4 $size-6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

</style>