<template>
  <div>
    <div class="p-1 f-c">
        <select v-model="zoom">
          <option v-for="i in 10" :key="i" :value="i">
            {{ i }}x
          </option>
        </select>
        <input type="range" min="0" :max="width" step="1" v-model="viewBox.x"  style="width:300px"/>
        <input type="range" min="0" :max="height" step="1" v-model="viewBox.y" style="width:300px"/>
        <Button color="primary" @click.prevent="png">to png</Button>
    </div>
    <div ref="map" class="map-box" v-html="require('../assets/uploads/Vala2.svg?raw')"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        width: 0,
        svg: null,
        height: 0,
        zoom: 1,
        viewBox: {
          x:0,
          y:0,
          w:0,
          h:0,
        }
      }
    },
    watch: {
      zoom(value) {
        this.viewBox.w = this.width / value
        this.viewBox.h = this.height / value
      },
      viewBox: {
        deep: true,
        handler(value) {
          this.svg.setAttribute('viewBox', `${value.x} ${value.y} ${value.w} ${value.h}`)
        }
      }
    },
    methods: {
      png() {
        htmlToImage.toPng(this.$refs.map)
          .then(function (dataUrl) {
            console.log(dataUrl)
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      }
    },
    mounted () {
      const svg = this.$refs.map.querySelector('#fantasyMap')
      this.svg = svg
      this.height = parseInt(svg.getAttribute('height'))
      this.width =  parseInt(svg.getAttribute('width'))
      this.viewBox.w = this.width
      this.viewBox.h = this.height
      this.$nextTick(()=>{
        svg.setAttribute('width', '1000')
        svg.removeAttribute('height')
      })
      
    },
  }
</script>

<style lang="scss" scoped>
.map-box {
  width: 1000px;
  height: 600px;
  margin: auto;
  overflow: hidden;
}
</style>