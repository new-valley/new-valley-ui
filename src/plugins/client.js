import axios from 'axios'

export default function (Vue, options) {
    axios.defaults.baseURL = 'http://localhost:5000/api'
    Vue.Client = {
        async get (uri, id) {
            if(id) {
                uri = `${uri}/${id}`
            }
            const response = await axios.get(uri)
            return response.data.data
        },
        async getSubForums (id) {
            return await this.get('/subforums', id)
        },
        async getAvatars (id) {
            return await this.get('/avatars', id)
        },
        async getPosts (id) {
            return await this.get('/posts', id)
        },
        async getUsers (id) {
            return await this.get('/users', id)
        },
        async getTopcs (id) {
            return await this.get('/topics', id)
        },
    }

    Object.defineProperties(Vue.prototype, {
        $client: {
          get () {
            return Vue.Client
          }
        }
      })
}

