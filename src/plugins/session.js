
export default function (Vue) {
  Vue.session = {
    setAccessToken (token) {
      localStorage.setItem('access_token', token)
    },

    getAccessToken () {
      const token = localStorage.getItem('access_token')

      const storageIsEmpty = () => (!token)
      if (storageIsEmpty())
        return null

      return token
    },
    setRefreshToken (token) {
    localStorage.setItem('refresh_token', token)
    },

    getRefreshToken () {
    const token = localStorage.getItem('refresh_token')

    const storageIsEmpty = () => (!token)
    if (storageIsEmpty())
        return null

    return token
    },
    destroySession () {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },

    isAuthenticated () {
      return this.getAccessToken() != null
    },
    setUser (user) {
      localStorage.setItem('user', user)
    },
    getUser () {
      const user = localStorage.getItem('user')
      
      const userIsEmpty = () => (!user)
      if (userIsEmpty()) 
        return null 

      return user
    },
    removeUser () {
      localStorage.removeItem('user')
    }
  }

  Object.defineProperties(Vue.prototype, {
    $session: {
      get () {
        return Vue.session
      }
    }
  })
}