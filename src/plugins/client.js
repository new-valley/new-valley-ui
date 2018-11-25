import axios from 'axios'

export default function (Vue, options) {
    axios.defaults.baseURL = 'http://35.226.124.10:7310/api/'

    Vue.Client = {
        data: {
            access_token: null,
            refresh_token: null,
            me: null,
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
            let token = access ? Vue.session.getAccessToken() : Vue.session.getRefreshToken()
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
        async put (uri, id, resource, form) {
            uri = this.getUri(uri, id, resource)
            let formData = new FormData()
            for (let key in form) {
                formData.set(key, form[key])
            }
            const response = await axios.put(uri, formData, {
                headers: this.getAuthHeaders()
            })
            return response.data
        },
        async delete (uri, id, resource, form) {
            uri = this.getUri(uri, id, resource)
            let formData = new FormData()
            for (let key in form) {
                formData.set(key, form[key])
            }
            let headers = this.getAuthHeaders()
            headers['Content-Type'] = 'application/json'
            const response = await axios.delete(uri, {
                headers: headers
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
        async login (email, password) {
            let form = {
                'email': email,
                'password': password
            }
            const data = await this.post('/auth/login', null, null, form)
            Vue.session.setAccessToken(data.access_token)
            Vue.session.setRefreshToken(data.refresh_token)
            this.data.me = null
        },
        async refreshAccessToken() {
          if(!this.wasLoggedIn()) {
            return
          }
          const resp = await axios.post('/auth/token_refresh', {}, {
              headers: this.getAuthHeaders(false)
          })
          Vue.session.setAccessToken(resp.data.access_token)
        },
        logout() {
          Vue.session.destroySession()
        },
        wasLoggedIn() {
          return !!Vue.session.getAccessToken()
        },
        isLoggedIn() {
          return !!Vue.session.getAccessToken()
        },
        async replyTopic(id, content) {
          return await this.post('/topics', id, 'posts', {content: content})
        },
        async createTopic(subforum_id, title, content) {
          this.post('/subforums', subforum_id, 'topics', {title: title})
            .then(topic => {
              this.replyTopic(topic.data.topic_id, content)
            })
        },
        async getMe() {
          return await this.get('/me')
        },
        formatErrorMessage(error) {
          let message = 'ERROR'
          if(error.response && error.response.data) {
            let errors = error.response.data.errors
            if(errors) {
              let messages = []
              for (const err of errors) {
                messages.push(err.message)
              }
              message = 'ERROR: ' + messages.join(', ')
            }
          }
          return message
        }
    }

    Object.defineProperties(Vue.prototype, {
        $client: {
          get () {
            return Vue.Client
          }
        }
      })

    axios.interceptors.response.use(function(resp) {
      return resp
    }, async function(error) {
      if(error.response && error.response.status === 401) {
        if(error.response.data.errors
          && error.response.data.errors[0].message == 'expired_token') {
          await this.refreshAccessToken()
          error.config.headers['Authorization'] = this.getAuthHeaders()['Authorization']
          return await axios.request(error.config)
        }
        throw error
      }
      throw error
    }.bind(Vue.Client))
}

