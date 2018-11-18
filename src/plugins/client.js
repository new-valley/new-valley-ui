import axios from 'axios'

export default function (Vue, options) {
    axios.defaults.baseURL = 'http://35.226.124.10:7310/api/'
    Vue.Client = {
        async get (uri, id, resource) {
            if(id) {
                uri = `${uri}/${id}`
                if(resource)
                    uri = `${uri}/${resource}`
            }
            const response = await axios.get(uri)
            return response.data.data
        },
        async getSubForums (id, resource) {
            return await this.get('/subforums', id, resource)
        },
        async getAvatars (id) {
            return await this.get('/avatars', id)
        },
        async getPosts (id) {
            return await this.get('/posts', id)
        },
        async getUsers (id, resource) {
            return await this.get('/users', id, resource)
        },
        async getTopics (id, resource) {
            return await this.get('/topics', id, resource)
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

