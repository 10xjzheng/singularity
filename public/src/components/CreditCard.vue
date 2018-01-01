<template>
  <div>
    <alert v-model="show" title="出错啦" >{{errorInfo}}</alert>
    <group>
      <x-input title="姓名" required placeholder="姓+先生/女士,比如李先生" v-model="name"></x-input>
      <x-input title="手机号码" required placeholder="手机号码" v-model="mobile"></x-input>
      <selector title="有无信用卡" :options="plainList" v-model="defaultValue"  @on-change="onChange"></selector>
      <x-input v-show='showType' title="最高额度" v-model="quota" placeholder="万"></x-input>
      <cell title="资产情况" ></cell>
      <checklist required :options="assetList" v-model="chooseAsset">
      </checklist>
      <cell title="需要办理哪个银行的信用卡" ></cell>
      <checklist required :options="bankList" v-model="chooseBank">
      </checklist>
      <div style="padding:10px"><x-button type="primary" @click.native='submitApply'  action-type="button">提交申请</x-button></div>
    </group>
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
    Selector,
    XInput,
    XButton,
    Checklist,
    Cell
  },
  data () {
    return {
      show: false,
      errorInfo: '操作失败',
      name: '',
      mobile: '',
      quota: '',
      showType: false,
      assetList: [ '房', '车', '营业执照', '社保' ],
      chooseAsset: [],
      bankList: [ '中信银行', '广发银行', '招商银行', '汇丰银行', '广州银行', '农商银行', '交通银行', '邮政银行' ],
      chooseBank: [],
      defaultValue: '无',
      plainList: ['有', '无']
    }
  },
  methods: {
    onChange (val) {
      if (val === '有') {
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
      if (!this.bankList) {
        this.errorInfo = '银行不能为空'
        this.show = true
        return
      }
      var obj = this
      axios.post(this.getHost + '/info/submitApply', { type: 2, apply_type: this.bankList[0] + '...', name: this.name, mobile: this.mobile, credit_card: this.defaultValue, quota: this.quota, assets: this.chooseAsset, banks: this.chooseBank })
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
