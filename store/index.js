import Vuex from 'vuex'
import feathersVuex, { initAuth } from 'feathers-vuex'
import { CookieStorage } from 'cookie-storage'
import feathersClient from '../feathersClient'

let plugins = []
// Create services for the browser
if (process.client) {
  const browserClient = feathersClient('', new CookieStorage())
  const { service: browserService, auth: browserAuth } = feathersVuex(browserClient, { idField: 'id', enableEvents: true })

  plugins = [
    browserService('users', { paginate: true }),
    browserService('campaigns', { paginate: true}),
    browserService('campaign-roles', { paginate: false}),
    browserService('kingdoms', {paginate: true}),
    browserService('populations', {paginate: false}),
    browserService('races', {paginate: false}),
    browserService('uploads', {paginate: false}),
    browserAuth({
      userService: 'users',
      state: {
        publicPages: [
          'index',
          'authenticate'
        ]
      }
    })
  ]
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      page: {
        name: 'Home',
        route: '/'
      },
    },
    mutations: {
      setPage(state, page) {
        state.page = page
      },
      setUserId(state, id) {
        state.userId = id
      },
    },
    actions: {
      nuxtServerInit({ commit, dispatch, state }, { req, store }) {
        let origin = req.headers.host.split(':')
        origin = `http://${origin[0]}`

        const storage = {
          getItem(key) {
            return store.state.auth ? store.state.auth.accessToken : ''
          },
          setItem(key, value) {
            store.state.auth.accessToken = value
          },
          removeItem(key) {
            store.state.auth.accessToken = null
          }
        }
        // Create a new client for the server
        const client = feathersClient(origin, storage)
        const { service, auth } = feathersVuex(client, { idField: 'id', enableEvents: true })
        // Register services for the server
        service('users', { paginate: true })(store)
        service('campaigns', { paginate: true })(store)
        service('campaign-roles', {paginate: false})(store)
        service('kingdoms', {paginate: true})(store)
        service('populations', {paginate: false})(store)
        service('races', {paginate: false})(store)
        service('uploads', {paginate: false})(store)
        auth({
          userService: 'users',
          state: {
            publicPages: [
              'index',
              'authenticate',
              'login',
              'signup'
            ]
          }
        })(store)

        return initAuth({
          commit,
          dispatch,
          req,
          moduleName: 'auth',
          cookieName: 'feathers-jwt'
        })
          .then((response) => {
            // console.log('AfterAuth', response)
            return dispatch('auth/authenticate', { accessToken: store.state.auth.accessToken, strategy: 'jwt' }).then(res => {
              console.log('User re-authenticated')
            })
              .catch((_) => {})
          })
      }
    },
    plugins
  })
}

export default createStore
