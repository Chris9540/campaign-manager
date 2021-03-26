import Vuex from 'vuex'
import feathersVuex, { initAuth } from 'feathers-vuex'
import { CookieStorage } from 'cookie-storage'
import feathersClient from '../feathersClient'
import serviceList  from './service.register'
let plugins = []



// Create services for the browser
const vuexConfig = { idField: 'id', enableEvents: true, serverAlias: 'api', whitelist: ['$regex', '$options'] }
if (process.client) {
  const browserClient = feathersClient('', new CookieStorage())
  const { service: browserService, auth: browserAuth } = feathersVuex(browserClient, vuexConfig)
  serviceList.forEach(s=>{
    plugins.push(browserService(s.name, s.options))
  })
  plugins.push(browserAuth({userService: 'users',state: {publicPages: ['index','signup','login']}}))

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
        const { service, auth } = feathersVuex(client, vuexConfig)
        // Register services for the server
        for (let i = 0; i < serviceList.length; i++) {
          const s = serviceList[i]
          service(s.name, s.options)(store)
        }
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
