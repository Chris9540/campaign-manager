<template>
  <div class="input-control">
    <label class="input-label pr-2 text-secondary" :style="labelCSS">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    bindHeight: {
      type: Boolean,
      required: false,
      default: true,
    },
    labelPos: {
      type: String,
      required: false,
      default: 'bottom',
    },
  },
  computed: {
    labelCSS() {
      let alignment = ''
      switch(this.labelPos) {
        case 'top':
          alignment = 'flex-start';
          break;
        case 'middle':
          alignment = 'center';
          break;
        default :
          alignment = 'flex-end';
          break;
      }
      return {
        alignSelf: alignment,
      }
    }
  },
  mounted () {
    this.$slots.default.forEach((child) => {
      const { tag, elm } = child
      switch (tag) {
        case 'input':
          elm.classList.add(tag)
          break;
        case 'select':
          elm.classList.add(tag)
          break;
        case 'textarea':
          elm.classList.add(tag)
          if(this.bindHeight) {
            elm.addEventListener('input', ()=>{
              elm.style.height = ""
              elm.style.height = elm.scrollHeight + 3 + 'px'
            })
          }

      }
    })
  }
}
</script>

<style lang="scss">
.input-control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 6px;
  min-height: 42px;
  .input-label {
    min-width: 50px;
    line-height: 1;
  }
  .input, .select, .textarea {
    flex: 1;
    max-width: 600px;
  }
  .textarea {
    min-height: 40px;
  }
}
</style>
