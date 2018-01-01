export default{
  install (Vue, options) {
    // Vue.prototype.getHost = 'http://www.sglpay.cn'
    Vue.prototype.getHost = location.protocol + '//' + location.host
  }
}
