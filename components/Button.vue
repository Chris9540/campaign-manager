<template>
  <button
    type="button"
    :class="css"
    :data-color="color"
    data-hover-elevation="up"
    @click="$emit('click', $event, payload)"
  >
    <fa icon="circle-notch" v-if="async && loading" class="fa-spin left"/>
    <div v-if="async && !loading" class="async left"/>
    <slot />
    <div v-if="async" class="async right"/>
  </button>
</template>
<script>

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    payload: null,
    color: {
      type: String,
      required: false,
      default: 'default',
      validator: prop => ['primary', 'secondary', 'danger', 'success', 'default', 'blue', 'purple', 'yellow'].includes(prop)
    },
    icon: {
      type: Boolean,
      required: false,
      default: false
    },
    async: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    css () {
      if (this.icon) {
        return ['button-icon', 'elevation-1', `button-${this.color}`].join(' ')
      }
      return ['button', 'elevation-1', `button-${this.color}`].join(' ')
    }
  }
}
</script>

<style lang="scss">
.button {
  transition: all ease-out .25s !important;
  border: none;
  outline: none;
  padding: $size-1;
  height: 32px;
  font-weight: bold;
  text-align: center;
  min-width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .async {
  height:16px;
  width:16px;
  }
  .left{
    margin-right: 4px;
  }
  .right {
    margin-left: 4px;
  }
  cursor: pointer;
  &:focus {
    outline: none;
  }
}
.button-icon {
  transition: all ease-out .25s !important;
  border: none;
  outline: none;
  padding: $size-1;
  width: 32px;
  height: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:focus {
    outline: none;
  }
}
@each $key, $map in $color-map {
  .button-#{$key} {
    background-color: map-get($map, 'background');
    color: map-get($map, 'color');
    &:hover {
      background-color: map-get($map, 'background-light');
      color: choose-contrast-color(map-get($map, 'background-light'))
    }
  }
}
</style>
