<template>
  <section class="site-root">
    <Header />
    <div class="site-content">
      <Nuxt />
    </div>
    
  </section>
</template>

<script>


export default {
  name: 'DefautLayout',
}
</script>
<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
.site-root {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: $header-height 1fr;
  .site-content{
    overflow-y: scroll;
    background-color: $screen-bg;
  }
}
</style>
