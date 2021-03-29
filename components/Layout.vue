<template>
  <div class="grid-layout" data-grid-layout="parent" v-if="!building" :style="css">
    <slot/>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        building: true,
        rowGap: '',
        columnGap: '',
        gridTemplateRows: ''
      }
    },
    props: {
      margin: {
        type: Array,
        default() {
          return [0, 0]
        },
        required: false
      },
      rowHeight: {
        type: String,
        required: true,
        default: '32px'
      },
      width: {
        type: String,
        required: false,
        default: '100%'
      },
      layout: {
        type: Array,
        required: true,
      }
    },
    computed: {
      css() {
        return {
          gridTemplateRows: this.gridTemplateRows,
          gridColumnGap: this.columnGap,
          gridRowGap: this.rowGap,
          width: this.width

        }
      }
    },
    mounted() {
      this.rowGap = this.margin[1]+'px'
      this.columnGap = this.margin[0]+'px'
      const css = []
      let max = 1
      for (let i = 0; i < this.layout.length; i++) {
        const gridItem = this.layout[i];
        const tempMax = gridItem.y+gridItem.h+1
        max = Math.max(max, tempMax)
      }
      for(let i = 0; i < max; i++) {
        css.push(this.rowHeight)
      }
      this.gridTemplateRows = css.join(' ')
      this.$nextTick(()=>{
        this.building = false
      })
    }
  }
</script>

<style lang="scss" scoped>
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>