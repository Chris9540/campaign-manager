<template>
  <div class="input-control">
    <label class="input-label pr-2 text-secondary">
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
          elm.addEventListener('input', ()=>{
            elm.style.height = ""
            elm.style.height = elm.scrollHeight + 3 + 'px'
          })
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
    max-width: 400px;
  }
  .textarea {
    min-height: 40px;
  }
}
</style>
