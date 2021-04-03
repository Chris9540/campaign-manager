<template>
<div>
  <div style="width:100%" class="f-c p-1">
    <InputControl label="Size" v-if="!build">
      <select name="size" v-model="cols" >
        <option v-for="(size, key) in colSizes" :key="key" :value="size">{{ size }}</option>
      </select>
    </InputControl>
  </div>
  <no-ssr>
    <GridLayout
      :layout="layout"
      :col-num="colNum"
      :row-height="16"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="false"
      :margin="[0, 0]"
      :use-css-transforms="true"
      :style="style"
      class="fixed-map elevation-1 walls"
    >
      <GridItem
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        class="room"
        :title="`Room ${item.i} width: ${item.w*5}f, height: ${item.h*5}f`"

      >
        {{ item.i }}
      </GridItem>
    </GridLayout>
  </no-ssr>
</div>
</template>

<script>
var rooms = [
  { x: 0, y: 0, w: 2, h: 2, i: "0" },
  { x: 2, y: 0, w: 2, h: 4, i: "1" },
  { x: 4, y: 0, w: 2, h: 5, i: "2" },
  { x: 6, y: 0, w: 2, h: 3, i: "3" },
  { x: 8, y: 0, w: 2, h: 3, i: "4" },
  { x: 10, y: 0, w: 2, h: 3, i: "5" },
  { x: 0, y: 5, w: 2, h: 5, i: "6" },
  { x: 2, y: 5, w: 2, h: 5, i: "7" },
  { x: 4, y: 5, w: 2, h: 5, i: "8" },
  { x: 6, y: 4, w: 2, h: 4, i: "9" },
  { x: 8, y: 4, w: 2, h: 4, i: "10" },
  { x: 10, y: 4, w: 2, h: 4, i: "11" },
  { x: 0, y: 10, w: 2, h: 5, i: "12" },
  { x: 2, y: 10, w: 2, h: 5, i: "13" },
  { x: 4, y: 8, w: 2, h: 4, i: "14" },
  { x: 6, y: 8, w: 2, h: 4, i: "15" },
  { x: 8, y: 10, w: 2, h: 5, i: "16" },
  { x: 10, y: 4, w: 2, h: 2, i: "17" },
  { x: 0, y: 9, w: 2, h: 3, i: "18" },
  { x: 2, y: 6, w: 2, h: 2, i: "19" },
];

export default {
  data() {
    return {
      build: true,
      layout: [{ x:2, y:2, w:10, h:10, i:"0" }],
      cols: 20,
      colSizes: [20, 30, 32, 40, 50, 60, 64, 70, 80, 90, 100, 128],
      size: 32
    };
  },
  mounted () {
    this.$nextTick(()=>{
      this.build = false
    });
  },
  computed: {
    style() {
      return {
        width: (this.cols*this.size)+'px'
      }
    },
    colNum() {
      return this.cols + 2
    },
  },
};
</script>

<style lang="scss">
  .fixed-map {
    transition: $transition;
    margin-left: auto;
    margin-right: auto;
    background-color: $grey-1;
      border-image-slice:32 32 32 32;
      border-image-width:32px 32px 32px 32px;
      border-image-outset:0px 0px 0px 0px;
      border-image-repeat:repeat repeat;
      border-image-source: url('/img/tiles/light/walls.png');
      border-width: 32px;
      border-style: solid;
      box-sizing: content-box;
    .room {
      color: black;
      background: white;
    }
  }
</style>