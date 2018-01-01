<template>
  <div>
    <swipe class="my-swipe">
      <swipe-item v-for="item in items" :key="item.id">
        <img :src="item.material" style="width:100%" />
      </swipe-item>
    </swipe>
    <div class="notice">
        <div><img :src="noticeIcon"/></div>
        <div class='text'>
          <marquee>
            <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)">hello world {{i}}</marquee-item>
          </marquee>
        </div>
    </div>
    <div style="position:relative;width:100%;min-height:95px">
        <div class="modules" v-for="icon in moduleIconList" :key="icon.id">
            <router-link :to="icon.link">
              <div class='icon'><img :src="icon.img" /></div>
              <div class="title">{{ icon.title }}</div>
            </router-link>
        </div>
    </div>
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
import { Swipe, SwipeItem } from 'vue-swipe'
import { Masker, Marquee, MarqueeItem } from 'vux'
import axios from 'axios'
var noticeIcon = require('../assets/notice.png')
var applyIcon = require('../assets/apply.png')
var unionIcon = require('../assets/union.png')
var newsIcon = require('../assets/news.png')
export default {
  components: {
    Swipe,
    SwipeItem,
    Masker,
    Marquee,
    MarqueeItem
  },
  data () {
    return {
      isEmpty: false,
      items: [],
      currentPage: 1,
      noticeIcon: noticeIcon,
      moduleIconList: [{
        title: '我要申请',
        img: applyIcon,
        link: '/applyList'
      }, {
        title: '我要加盟',
        img: unionIcon,
        link: '/Join'
      }, {
        title: '资讯',
        img: newsIcon,
        link: '/newsList'
      }],
      list: []
    }
  },
  methods: {
    getBanners () {
      var obj = this
      axios.post(this.getHost + '/home/banners')
        .then(function (response) {
          var data = response.data
          if (data.errorCode === 0) {
            obj.items = data.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
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
    this.getBanners()
    this.getNews(this.currentPage)
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
<style>
@import '~vue-swipe/dist/vue-swipe.css';
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.notice {
    height: 30px;
    width: 100%;
    padding: 5px;
    padding-to: 10px;
}
.notice > div > img {
    width: 25px;
    padding-top:5px;
    padding-left: 15px;
}
.notice > div {
    float: left;
}
.notice .text {
    color: red;
    font-size: 18px;
    padding-left: 15px;
}
.modules {
    float: left;
    width: 33.3333%;
    margin-top: 10px
}
.modules .icon {
    text-align: center;
}
.modules .icon > img {
    width: 50px;
}
.modules .title {
    text-align: center;
    color: #000;
}
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
</style>
