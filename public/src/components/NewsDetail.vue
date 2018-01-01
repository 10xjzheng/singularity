<template>
  <div>
    <div class="title">{{ detail.title }}</div>
    <div class="main-picture"><img :src="detail.main_pic"/></div>
    <div class="content">{{ detail.content }}</div>
    <div style="position:relative;width:100%;min-height:60px"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    getDetail (id) {
      var obj = this
      axios.post(this.getHost + '/home/newsDetail', { newsId: id })
        .then(function (response) {
          var data = response.data
          if (data.errorCode === 0) {
            if (data) {
              console.log(data.data)
              obj.detail = data.data
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.getDetail(this.$route.params.id)
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
.title {
  text-algin: center;
  font-size: 18px;
  padding: 15px
}
.main-picture {
  padding: 15px
}
.main-picture img {
  width: 100%;
}
.content {
  padding: 15px;
}
</style>

