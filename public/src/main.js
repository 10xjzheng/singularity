// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import UserCenter from './components/UserCenter'
import ApplyList from './components/ApplyList'
import Pos from './components/Pos'
import CreditCard from './components/CreditCard'
import Loan from './components/Loan'
import Insurance from './components/Insurance'
import Join from './components/Join'
import NewsList from './components/NewsList'
import NewsDetail from './components/NewsDetail'
import Msg from './components/Msg'
import About from './components/About'
import MyApply from './components/MyApply'
import Config from './config'
Vue.use(VueRouter)
Vue.use(Config)

const routes = [
  { path: '/home', component: Home },
  { path: '/', component: Home },
  { path: '/userCenter', component: UserCenter },
  { path: '/applyList', component: ApplyList },
  { path: '/pos', component: Pos },
  { path: '/creditCard', component: CreditCard },
  { path: '/loan', component: Loan },
  { path: '/join', component: Join },
  { path: '/newsList', component: NewsList },
  { path: '/newsDetail/:id', component: NewsDetail },
  { path: '/msg', component: Msg },
  { path: '/about', component: About },
  { path: '/insurance', component: Insurance },
  { path: '/myApply/:type', component: MyApply }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
