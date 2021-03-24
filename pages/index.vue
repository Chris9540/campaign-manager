<template>
  <div>
    <h1>Home</h1>
    <button @click.prevent="show">show</button>
    
    <sweet-modal modal-theme="dark" overlay-theme="dark" ref="modal">
	    This is modal
    </sweet-modal>
  </div>
</template>
<script>
import Navigation from '~/components/Navigation'
export default {
  name: 'Home',
  components: { Navigation },
  methods: {
    show() {
      this.$refs.modal.open()
    }
  },
  created() {
    // console.log('Created', this.$store.state.counter)
    // console.log('Created', this.$store.getters.getCalculated)
    // this.$store.mutations.increment()
    // this.$store.commit('increment')
    // this.$store.dispatch('increment')
    // console.log('Created', this.$store.state.counter)

  }
}
</script>
