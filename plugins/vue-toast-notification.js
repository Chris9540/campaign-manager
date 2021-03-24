import Vue from 'vue'
import VueToast from 'vue-toast-notification'

Vue.use(VueToast, {
  position: 'top-right',
  queue: true,
  duration: 3000,
  dismissible: false
})
