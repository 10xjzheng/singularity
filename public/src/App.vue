<template>
  <div id="app">
    <x-header slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      :left-options="leftOptions"
      :right-options="rightOptions"
      :title="title"
      :transition="headerTransition">
    </x-header>
    <router-view class='router-view'></router-view>
    <div style="position:fixed;bottom:0px;width:100%">
      <flexbox>
        <flexbox-item style="margin-left:0px;border-right: 1px solid #ccc;">
          <div class="bottom-menu">
            <router-link to="/home">
              <div >
                <div><img src='./assets/home.png'/></div>
                <div class='label' >首页</div>
              </div>
            </router-link>
          </div>
        </flexbox-item>
        <flexbox-item style="margin-left:0px;">
          <router-link to="/userCenter" >
            <div class="bottom-menu" >
              <div>
                <div><img src='./assets/userCenter.png'/></div>
                 <div class='label' >我的</div>
              </div>
            </div>
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { XHeader, Flexbox, FlexboxItem } from 'vux'

export default {
  name: 'app',
  components: {
    XHeader,
    Flexbox,
    FlexboxItem
  },
  watch: {
    path (path) {
      console.log(path)
    }
  },
  computed: {
    leftOptions () {
      return {
        showBack: true
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    title () {
      return '奇点金服'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
a {
  color: #C0C0C0;
}
.router-view {
  width: 100%;
  height: 100%;
  top: 46px;
  position: absolute
}

.bottom-menu {
  border-top: 1px solid #ccc;
  background-color: white;
  height: 55px;
}

.bottom-menu div {
  float: left;
  padding-left: 20px
}
.bottom-menu img {
  padding-top: 6px;
  width: 40px;
  height: 40px;
}
.bottom-menu .label {
  font-size: 18px;
  padding: 12px;
  color: #000
}
</style>
