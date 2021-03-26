<template>
  <div class="card-root elevation-2" data-hover-elevation="up" :style="style">
    <div class="card-head">
      <div v-if="hasIcon" class="card-icon">
        <slot name="icon" />
      </div>
      <div class="max-width">
        <h4 v-if="name" :class="hasIcon?'':'card-title'">
          {{ name }}
        </h4>
      </div>
      <div v-if="expand" class="card-icon">
        <button type="button" class="icon-button" @click="show = !show">
          <fa v-if="show" icon="minus" />
          <fa v-else icon="plus" />
        </button>
      </div>
    </div>
    <div class="card-body" :data-expand="(show)? 'show': 'hide'">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: null
    },
    expand: {
      type: Boolean,
      required: false,
      default: true
    },
    width: {
      type: String,
      required: false,
      default: '100%'
    }
  },
  data () {
    return {
      show: true
    }
  },
  computed: {
    hasIcon () {
      return !!this.$slots.icon
    },
    style () {
      return {
        width: this.width,
        minWidth: this.width
      }
    }
  }
}
</script>

<style lang="scss">
$card-head-height: 40px;
.icon-button {
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  color: white;
  transition: color ease-out 0.25s;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    color: $primary;
  }
}
.card-root {
  max-width: 1000px;
  min-width: 500px;
  width: 100%;
  display: grid;
  grid-template-rows: $card-head-height 1fr;
  grid-template-columns: 100%;
  .card-head {
    background-color: $card-head-bg;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .max-width {
      flex: 1;
    }
    .card-icon {
      height: $card-head-height;
      width: $card-head-height;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        font-size: 10px;
      }
    }
    .card-title {
      margin-left: $size-2;
    }
  }
  .card-body {
    background-color: $card-body-bg;
    min-height: $size-10;
    color: white;
    padding: 0 $size-2;
    transition: all ease-out 0.25s;
    height: fit-content;
    &[data-expand="hide"] {
      height: 0 !important;
      min-height: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      overflow: hidden !important;
    }
    &[data-expand="hide"] {
      height: fit-content;
    }
  }
}
</style>
