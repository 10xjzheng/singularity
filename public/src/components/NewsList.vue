<template>
  <div>
    <div style="position:relative;width:100%; magin-top: 15px">
        <div style="width:100%;margin: 10px;overflow: hidden;" v-for="item in list">
          <router-link :to="item.url">
            <masker :opacity="0.1" style="border-radius: 2px;">
              <div class="m-img" :style="{backgroundImage: 'url(' + item.main_pic + ')'}"></div>
              <div slot="content" class="m-title">
                {{item.title}}
                <br/>
                <span class="m-time">2016-03-18</span>
              </div>
            </masker>
          </router-link>
        </div>
    </div>
    <div style="position:relative;width:100%;min-height:60px"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { Masker, Marquee, MarqueeItem } from 'vux'
export default {
  components: {
    Masker,
    Marquee,
    MarqueeItem
  },
  data () {
    return {
      isEmpty: false,
      currentPage: 1,
      list: []
    }
  },
  methods: {
    getNews (currentPage) {
      var obj = this
      axios.post(this.getHost + '/home/newsList', {currentPage: currentPage})
        .then(function (response) {
          var data = response.data
          if (data.errorCode === 0) {
            if (data.data.length === 0) {
              obj.isEmpty = true
              // console.log('a' + obj.isEmpty)
              return
            }
            obj.list.push.apply(obj.list, data.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleScroll () {
      var scrolled = window.scrollY > 0
      if (scrolled && !this.isEmpty) {
        // console.log('b' + this.isEmpty)
        this.getNews(this.currentPage ++)
      }
    }
  },
  mounted: function () {
    this.getNews(this.currentPage)
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less">
.badge-value {
  display: inline-block!important;
}
.vertical-middle {
  vertical-align: middle;
}
</style>

