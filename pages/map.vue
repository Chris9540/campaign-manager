<template>
  <div class="map-root ml-3 mt-3">
    <div class="room dark">
      <div class=floor></div>
    </div>
    <div class="grid"></div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.map-root {
  width: 320px;
  height:320px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  .room {
    box-sizing: border-box;
    position: relative;
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    border-width: 32px;
    border-style: solid;
    border-image-slice:32 32 32 32;
    border-image-width:32px 32px 32px 32px;
    border-image-outset:0px 0px 0px 0px;
    border-image-repeat:repeat repeat;
    .floor {
      border-width: 16px;
      border-style: solid;
      border-image-slice: 16 16 16 16;
      border-image-width: 16px 16px 16px 16px;
      border-image-outset:0px 0px 0px 0px;
      border-image-repeat:repeat repeat;
      height:100%
    }
  }
  .dark {
    border-image-source: url('/img/tiles/dark/walls.png');
    .floor {
      border-image-source: url('/img/tiles/dark/border.png');
      background-image: url('/img/tiles/dark/floor.png');
    }
  }
  .light {
    border-image-source: url('/img/tiles/light/walls.png');
    .floor {
      border-image-source: url('/img/tiles/light/border.png');
      background-image: url('/img/tiles/light/floor.png');
    }
  }
  .grid {
    grid-row: 1 / -1;
    grid-column: 1 / -1;
  }
}
</style>