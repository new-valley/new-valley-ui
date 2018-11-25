import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

function castTopicParams(route) {
  let ret = {
    id: route.params.id
  }
  if(route.query.offset) {
    ret.fetchOffset = Number(route.query.offset)
  }
  if(route.query.n_items) {
    ret.numItems = Number(route.query.n_items)
  }
  return ret
}

function castSubforumParams(route) {
  let ret = {
    id: route.params.id
  }
  if(route.query.offset) {
    ret.fetchOffset = Number(route.query.offset)
  }
  if(route.query.n_items) {
    ret.numItems = Number(route.query.n_items)
  }
  return ret
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/s/:id',
      component: () => import('./views/Subs.vue'),
      name: 's',
      props: castSubforumParams
    },
    {
      path: '/t/:id',
      component: () => import('./views/Topic.vue'),
      name: 't',
      props: castTopicParams
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
