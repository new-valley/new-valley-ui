import axios from 'axios'

export default function (Vue, options) {

    Vue.Client = {
        log () {
            console.log('log')
        }
    }

    Object.defineProperties(Vue.prototype, {
        $client: {
          get () {
            return Vue.Client
          }
        }
      })
}

