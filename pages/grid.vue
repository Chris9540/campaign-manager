<template>
<div>
  <div style="width:100%" class="f-c p-1">
    <InputControl label="Size">
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
      class="fixed-map elevation-1"
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
      layout: rooms,
      cols: 20,
      colSizes: [20, 30, 32, 40, 50, 60, 64, 70, 80, 90, 100, 128],
      size: 16
    };
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
    .room {
      color: black;
      background: white;
      box-shadow: 0px 0px 6px 2px white;
    }
  }
</style>