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
  background-color: $header-bg;
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
    padding-bottom: $size-2;
    scrollbar-color: $screen-bg $grey-3;
    scrollbar-width: thin;
    scrollbar-track-color: $screen-bg;
    z-index: 2;
  }
  .site-footer {
    background-color: $header-bg;
    z-index: 1;
  }
}
::-webkit-scrollbar {
  width: $size-1;
}

/* Track */
::-webkit-scrollbar-track {
  background: $screen-bg;
  transition: $transition;
  &:hover {
    background: darken($screen-bg, 4%);
  }
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $grey-3;
  transition: $transition;
  &:hover {
    background: $grey-2; 
  }
}
</style>
