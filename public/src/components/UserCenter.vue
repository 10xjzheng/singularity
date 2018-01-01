<template>
  <div style="">
    <blur :blur-amount=5 :url="url">
      <p class="center"><img :src="info.avatar"></p>
      <p class="center-text">{{ info.nickname }}</p>
    </blur>
    <card :header="{title:'我的申请'}" style="margin-top: 0px">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-l vux-1px-r" v-on:click="myApply(1)">
          <span>{{numbers.posNum}}</span>
          <br/>
          POS机
        </div>
        <div class="vux-1px-r" v-on:click="myApply(2)">
          <span>{{numbers.creditCardNum}}</span>
          <br/>
          信用卡
        </div>
        <div class="vux-1px-r" v-on:click="myApply(3)">
          <span>{{numbers.loanNum}}</span>
          <br/>
          贷款
        </div>
        <div class="vux-1px-r" v-on:click="myApply(4)">
          <span>{{numbers.carNum}}</span>
          <br/>
          车险
        </div>
      </div>
    </card>
    <group>
        <cell title="我的姓名" :value="info.nickname"></cell>
        <cell title="手机号码" :value="info.mobile"></cell>
        <cell title="地区" :value="info.address"></cell>
    </group>
    <group>
        <cell title="关于我们" is-link link="/about"></cell>
    </group>
  </div>
</template>

<script>
import { Blur, Card, Group, Cell } from 'vux'
import axios from 'axios'
export default {
  components: {
    Blur,
    Card,
    Group,
    Cell
  },
  data () {
    return {
      url: 'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
      numbers: {},
      info: { nickname: '', mobile: '', address: '', avatar: '' }
    }
  },
  methods: {
    myApply (type) {
      location.href = '#/myApply/' + type
    },
    getStat () {
      var obj = this
      axios.post(this.getHost + '/info/applyStat')
        .then(function (response) {
          var data = response.data
          if (data.errorCode === 0) {
            if (data.data) {
              obj.numbers = data.data
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getInfo () {
      var obj = this
      axios.post(this.getHost + '/info/getInfo')
        .then(function (response) {
          var data = response.data
          if (data.errorCode === 0) {
            if (data) {
              data.data.address = data.data.province + data.data.city
              obj.info = data.data
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.getStat()
    this.getInfo()
  }
}
</script>

<style scoped>
.center {
  text-align: center;
  padding-top: 30px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.center-text {
  text-align: center;
  color: #fff;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 15px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>
