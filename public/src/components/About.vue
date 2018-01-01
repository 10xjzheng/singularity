<template>
  <div>
    <div class="main-pic"><img :src="detail.logo"/></div>
    <div class="title">{{ detail.company }}</div>
    <div class="content">{{ detail.content }}</div>
    <div style="position:relative;width:100%;min-height:60px"></div>
    <div>
      <div class='contract'><img :src="detail.tel"/>联系我们 0757-63929948</div>
    </div>
  </div>
</template>

<script>
var logo = require('../assets/logo.jpg')
var tel = require('../assets/tel.png')
export default {
  data () {
    return {
      detail: {
        company: '佛山市奇点引擎网络科技有限公司',
        logo: logo,
        tel: tel,
        content: '   佛山市奇点引擎网络科技有限公司是一家专注于佛山市奇点引擎网络科技有限公司是一家专注于佛山市奇点引擎网络科技有限公司是一家专注于佛山市奇点引擎网络科技有限公司是一家专注于'
      }
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
.title {
  text-align: center;
  font-size: 18px;
  padding: 5px
}
.main-pic {
  text-align: center;
  padding: 15px
}
.main-pic img {
  width: 30%;
}
.content {
  padding: 15px;
}
.contract {
   width: 70%;
   height: 50px;
   background-color: #fea614;
   text-align: center;
   color: white;
   font-size: 17px;
   line-height: 3em;
   margin-left: 15%;
}
.contract > img {
   width: 25px;
}
</style>

