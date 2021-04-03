<template>
  <div>
    <ul>
      <li>
        <InputControl label="Zoom">
          <select name="zoom" v-model="zoom" >
            <option v-for="i in 10" :key="i" :value="i">
              {{ i }}x
            </option>
          </select>
        </InputControl>
      </li>
      <li>
        <InputControl label="Horizontal Position">
          <input type="range" min="0" step="1" :max="width" name="x" v-model="viewBox.x" style="max-width:1000px"/>
        </InputControl>
      </li>
      <li>
        <InputControl label="Verticle Position">
          <input type="range" min="0" step="1" :max="height" name="y" v-model="viewBox.y" style="max-width:1000px"/>
        </InputControl>
      </li>
      <li>
        <div ref="map" class="map-box" v-html="require(`~/assets/uploads/${fileName}?raw`)"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      fileName: {
        type: String,
        required: true
      },
    },
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
          this.$emit('input', `${value.x} ${value.y} ${value.w} ${value.h}`)
        }
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
  margin: auto;
  overflow: hidden;
}
</style>