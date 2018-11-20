import axios from 'axios'

export default function (Vue, options) {
    axios.defaults.baseURL = 'http://35.226.124.10:7310/api/'
    Vue.Client = {
        data: {
            access_token: null,
            refresh_token: null
        },
        getUri(baseUri, id, resource) {
            let uri = baseUri
            if(id) {
                uri = `${uri}/${id}`
                if(resource) {
                    uri = `${uri}/${resource}`
                }
            }
            return uri
        },
        getAuthHeaders(access=true) {
            let token = access?this.data.access_token:this.data.refresh_token
            return token?{'Authorization': `Bearer ${token}`}:{}
        },
        async get (uri, id, resource, querystring) {
            uri = this.getUri(uri, id, resource)
            if(querystring) {
                uri = `${uri}?${querystring}`
            }
            const response = await axios.get(uri, {
                headers: this.getAuthHeaders()
            })
            return response.data
        },
        async post (uri, id, resource, form) {
            uri = this.getUri(uri, id, resource)
            let formData = new FormData()
            for (let key in form) {
                formData.set(key, form[key])
            }
            const response = await axios.post(uri, formData, {
                headers: this.getAuthHeaders()
            })
            return response.data
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
        async login (username, password) {
            let form = {
                'username': username,
                'password': password
            }
            const data = await this.post('/auth/login', null, null, form)
            this.data.access_token = data.access_token
            this.data.refresh_token = data.refresh_token
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

