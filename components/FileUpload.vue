<template>
  <div class="file-upload-root" :data-text="data.name">
    <input type="file" name="file-upload" class="file-upload" @change="read" :accept="accept">
  </div>
</template>

<script>
  const asyncReadAsDataURL = require('../helpers/asyncReadAsDataURL')
  const asyncReadDataAsText = require('../helpers/asyncReadDataAsText');
  export default {
    data() {
      return {
        data: {
          name: ''
        }
      }
    },
    props:{
      value: {
        type: Object,
        required: false,
      },
      accept: {
        type: String,
        required: false,
        default: ''
      },
      name: {
        type: String,
        required: false,
        default: 'file.ext'
      },
      text: {
        type: Boolean,
        required: false,
        default:false
      }
    },
    watch: {
      data(value) {
        this.$emit('input', value)
      }
    },
    mounted () {
      this.data.name = this.name;
    },
    methods: {
      async read(event) {
        this.data = (!this.text) ? await asyncReadAsDataURL(event.target.files[0]) : await asyncReadDataAsText(event.target.files[0])
      }
    },
  }
</script>

<style lang="scss" scoped>
.file-upload-root {
  $height: 27px;
  position: relative;
  width: 100% !important;
  max-width: 400px;
  height: $height;
  background-color: $card-body-bg;
  transition: $transition;
  flex: 1;
  max-width: 600px;
  &:hover {
      background-color: darken($card-body-bg, 10%);
  }
  &:after {
    content: attr(data-text);
    font-size: 18px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: inherit;
    font-family: monospace !important;
    border-bottom: 1px solid $grey-5;
    padding: 10px 0.25rem;
    display: block;
    width: calc(100% - 40px);
    pointer-events: none;
    z-index: 20;
    height: $height - 21px;
    line-height: $height - 21px;
    color: white;
    font-weight: 300;
  }
  
  &:before {
    content: 'Select File';
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    height: $height;
    background: $primary;
    color: $primary-text;
    font-weight: 700;
    z-index: 25;
    font-size: 16px;
    line-height: $height;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 0 15px;
    pointer-events: none;
    border-radius: 0;
  }
  
  &:hover {
    &:before {
      background: $primary-light
    }
  }
  input {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    height: $height;
    margin: 0;
    padding: 0;
    display: block;
    cursor: pointer;
    width: 100%;
  }
}
</style>