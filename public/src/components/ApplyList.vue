<template>
  <div>
      <div  v-for="item in list">
        <router-link :to="item.link">
          <div class='cell-item'>
            <div style="width: 15%;padding-left:5px"><icon :type="item.icon" class="cell-x-icon"></icon></div>
            <div style="width: 70%; color: #000">{{ item.title }}</div>
            <div style="float: right"><x-icon type="ios-arrow-right"  class="cell-x-icon" size="30"></x-icon></div>
          </div>
        </router-link>
      </div>
  </div>
</template>


<script>
import { Cell, Group, Icon, Divider } from 'vux'
export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    Icon,
    Divider
  },
  methods: {
    onClick () {
      console.log('on click')
    }
  },
  data () {
    return {
      list: [{
        title: 'POS 机',
        icon: 'success',
        link: 'pos'
      }, {
        title: '信用卡',
        icon: 'success-circle',
        link: 'creditCard'
      }, {
        title: '贷款',
        icon: 'waiting',
        link: 'loan'
      }, {
        title: '车险',
        icon: 'waiting-circle',
        link: 'insurance'
      }]
    }
  }
}
</script>
<style>
.cell-item {
   width: 100%;
   height: 55px;
   border-bottom: 1px solid #C0C0C0;
}
.cell-item > div {
  float: left;
  margin-top:15px;
}
.cell-x-icon {
  fill: rgb(204, 104, 248);
}
</style>
