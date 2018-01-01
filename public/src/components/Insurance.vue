<template>
  <div>
    <alert v-model="show" title="出错啦" >{{errorInfo}}</alert>
    <group>
      <x-input title="姓名" required placeholder="姓+先生/女士,比如李先生" v-model="name"></x-input>
      <x-input title="手机号码" required placeholder="" v-model="mobile"></x-input>
      <card :header="{title: defaultIntro.title}" >
      <p slot="content" class="card-padding">{{ defaultIntro.detail }}</p>
    </card>
    </group>
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
      defaultIntro: {
        title: '8折买车险',
        detail: '8折买车险8折买车险8折买车险'
      }
    }
  },
  methods: {
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
      axios.post(this.getHost + '/info/submitApply', { type: 4, name: this.name, mobile: this.mobile })
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
