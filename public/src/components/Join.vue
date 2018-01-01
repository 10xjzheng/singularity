<template>
  <div>
    <alert v-model="show" title="出错啦" >{{errorInfo}}</alert>
    <group>
      <x-input title="姓名" required placeholder="姓+先生/女士,比如李先生" v-model="name"></x-input>
      <x-input title="手机号码" required placeholder="手机号码"  v-model="mobile"></x-input>
      <selector title="加盟方式" :options="joinList" v-model="joinValue"  @on-change="chooseJoinValue"></selector>
      <cell title="推荐类型" v-show="showType"></cell>
      <checklist v-show="showType" :options="list" v-model="chooseType">
      </checklist>
    </group>
    <div style="padding:10px"><x-button type="primary"  @click.native='submitApply' action-type="button">提交申请</x-button></div>
    <div style="position:relative;width:100%;min-height:60px"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { Alert, Selector, Group, XInput, XButton, Checklist, Cell } from 'vux'
export default {
  components: {
    Alert,
    Group,
    XInput,
    XButton,
    Checklist,
    Cell,
    Selector
  },
  data () {
    return {
      show: false,
      errorInfo: '操作失败',
      showType: false,
      name: '',
      mobile: '',
      sum: '',
      joinList: [ '代理加盟', '我要兼职' ],
      joinValue: '代理加盟',
      list: [ '推荐客户贷款', '推荐客户装POS机', '推荐客户买车险' ],
      chooseType: []
    }
  },
  methods: {
    chooseJoinValue (val) {
      this.workValue = val
      if (val === '我要兼职') {
        this.showType = true
      } else {
        this.showType = false
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
      axios.post(this.getHost + '/info/submitApply', { type: 4, name: this.name, mobile: this.mobile, apply_type: this.joinValue, assets: this.chooseType })
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
