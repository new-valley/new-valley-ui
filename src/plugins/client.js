import axios from 'axios'

export default function (Vue, options) {
    axios.defaults.baseURL = 'http://35.226.124.10:7310/api/'
    Vue.Client = {
        async get (uri, id, resource, querystring) {
            if(id) {
                uri = `${uri}/${id}`
                if(resource)
                    uri = `${uri}/${resource}`
            }
            if(querystring) {
                uri = `${uri}?{querystring}`
            }
            const response = await axios.get(uri)
            return response.data.data
        },
        async getSubForums (id, resource, querystring) {
            return await this.get('/subforums', id, resource, querystring)
        },
        async getAvatars (id, querystring) {
            return await this.get('/avatars', id, null, querystring)
        },
        async getPosts (id, querystring) {
            return await this.get('/posts', id, null, querystring)
        },
        async getUsers (id, resource, querystring) {
            return await this.get('/users', id, resource, querystring)
        },
        async getTopics (id, resource, querystring) {
            return await this.get('/topics', id, resource, querystring)
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

