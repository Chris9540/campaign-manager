<template>
  <div data-grid-layout="child" :style="css" v-if="!building">
    <slot/>
  </div>
</template>

<script>

  export default {
    name: 'GridItem',
    props: {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required:true,
      },
      w: {
        type: Number,
        required: false,
        default: 1,
      },
      h: {
        type: Number,
        required: false,
        default: 1,
      },
    },
    data() {
      return {
        css: {},
        building: true
      }
    },
    mounted () {
      const { x, y, w, h} = {x:this.x,y:this.y,w:this.w,h:this.h}
      this.css = {
        gridColumn: `${x+1} / ${x+1+w}`,
        gridRow: `${y+1} / ${y+1+h}`
      }
      this.$nextTick(()=>{
        this.building = false
      })
    },
    computed: {
    },
  }
</script>

<style lang="scss" scoped>

</style>