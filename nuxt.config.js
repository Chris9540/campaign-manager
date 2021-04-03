module.exports = {
  router: { middleware: ['auth'] },
  dev: process.env.NODE_ENV !== 'production',
  head: {
    title: 'My Feathers + Nuxt App'
  },
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = '#source-map'
      }
    }
  },
  buildModules: [
    '@nuxtjs/svg'
  ],
  telemetry: false,
  components: true,
  css: ['~/assets/scss/global.scss'],
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-fontawesome',
    '@nuxtjs/axios',
    '@nuxtjs/moment'
  ],
  fontawesome: {
    component: 'fa',
    imports: [
      // import whole set
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },
  styleResources: {
    scss: ['~/assets/scss/*.scss']
  },
  plugins: [
    { src: '~/plugins/authenticateBeforeNuxtRender.client' },
    { src: '~/plugins/sweet-modal-vue.js', mode: 'client' },
    { src: '~/plugins/vue-select.js', mode: 'client' },
    { src: '~/plugins/vuelidate.js', mode: 'client' },
    { src: '~/plugins/vue-toast-notification.js', mode: 'client' },
    { src: '~/plugins/vue-grid-layout.js', ssr: false}
  ]
}
