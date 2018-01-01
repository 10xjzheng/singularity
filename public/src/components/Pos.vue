<template>
  <div>
    <alert v-model="show" title="出错啦" >{{errorInfo}}</alert>
    <group>
      <x-input title="姓名" required placeholder="姓+先生/女士,比如李先生" v-model="name"></x-input>
      <x-input title="手机号码" required placeholder="" v-model="mobile"></x-input>
      <selector title="申请类型" :options="plainList" v-model="defaultValue"  @on-change="onChange"></selector>
    </group>
    <card :header="{title: defaultIntro.title}" >
      <p slot="content" class="card-padding">{{ defaultIntro.detail }}</p>
    </card>
      
    <div style="padding:10px"><x-button type="primary" @click.native='submitApply' action-type="button">提交申请</x-button></div>
  </div>
</template>

<script>
import axios from 'axios'
import { Alert, Selector, Group, Card, XInput, XButton } from 'vux'
export default {
  components: {
    Alert,
    Group,
    Selector,
    Card,
    XInput,
    XButton
  },
  data () {
    return {
      show: false,
      errorInfo: '操作失败',
      name: '',
      mobile: '',
      defaultValue: '通付',
      plainList: ['通付', '大机'],
      defaultIntro: {
        title: '通付介绍',
        detail: '通付介绍-POS机是一款通过音频进行数据传输的刷卡器外设终端，只要将它插入智能手机音频孔建立连接后就能使用余额查询、转账汇款、信用卡还款、账单缴费、贷款、理财、扫码付、订单付等众多功能。'
      },
      intro: [{
        title: '通付介绍',
        detail: '通付介绍-POS机是一款通过音频进行数据传输的刷卡器外设终端，只要将它插入智能手机音频孔建立连接后就能使用余额查询、转账汇款、信用卡还款、账单缴费、贷款、理财、扫码付、订单付等众多功能。'
      }, {
        title: '大机介绍',
        detail: '大机介绍-POS机是一款通过音频进行数据传输的刷卡器外设终端，只要将它插入智能手机音频孔建立连接后就能使用余额查询、转账汇款、信用卡还款、账单缴费、贷款、理财、扫码付、订单付等众多功能。'
      }]
    }
  },
  methods: {
    onChange (val) {
      if (val === '通付') {
        this.defaultIntro = this.intro[0]
      } else {
        this.defaultIntro = this.intro[1]
      }
    },
    submitApply () {
      if (!this.name) {
        this.errorInfo = '姓名不能为空'
        this.show = true
        return
      }
      if (!this.mobile) {
        this.errorInfo = '手机号码不能为空'
        this.show = true
        return
      }
      var obj = this
      axios.post(this.getHost + '/info/submitApply', { type: 1, apply_type: this.defaultValue, name: this.name, mobile: this.mobile })
        .then(function (response) {
          var data = response.data
          if (data.errorCode === 0) {
            location.href = '#/msg'
          } else {
            obj.errorInfo = data.errorInfo
            obj.show = true
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.card-padding {
  padding: 15px;
}
</style>
