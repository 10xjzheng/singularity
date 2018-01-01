<template>
  <div>
    <alert v-model="show" title="出错啦" >{{errorInfo}}</alert>
    <group>
      <x-input title="姓名" required placeholder="姓+先生/女士,比如李先生" v-model="name"></x-input>
      <x-input title="手机号码" required placeholder="手机号码" v-model="mobile"></x-input>
      <cell title="工作情况" ></cell>
      <radio :options="workList" @on-change="chooseWorkValue" v-model="workValue"></radio>
       <cell title="资产情况" ></cell>
       <checklist required :options="assetList" v-model="chooseAsset">
      </checklist>
      <x-input title="目标贷款金额" v-model="sum" placeholder="万"></x-input>
    </group>
    <div style="padding:10px"><x-button type="primary" @click.native='submitApply' action-type="button">提交申请</x-button></div>
    <div style="position:relative;width:100%;min-height:60px"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { Alert, Selector, Group, XInput, XButton, Checklist, Cell, Radio } from 'vux'
export default {
  components: {
    Alert,
    Group,
    Selector,
    XInput,
    XButton,
    Checklist,
    Cell,
    Radio
  },
  data () {
    return {
      show: false,
      errorInfo: '操作失败',
      name: '',
      mobile: '',
      sum: '',
      workList: [ '公司上班', '个人经营企业主' ],
      workValue: '公司上班',
      assetList: [ '房', '车', '营业执照', '社保', '保单' ],
      chooseAsset: []
    }
  },
  methods: {
    chooseWorkValue (val) {
      this.workValue = val
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
      axios.post(this.getHost + '/info/submitApply', { type: 3, apply_type: this.workValue, name: this.name, mobile: this.mobile, sum: this.sum, assets: this.chooseAsset })
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
