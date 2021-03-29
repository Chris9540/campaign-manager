import Vue from 'vue'
import VueGridLayout from 'vue-grid-layout'
import NoSSR from 'vue-no-ssr'
https://jbaysolutions.github.io/vue-grid-layout/
Vue.component('GridLayout', VueGridLayout.GridLayout)
Vue.component('GridItem', VueGridLayout.GridItem)

Vue.component('no-ssr', NoSSR)