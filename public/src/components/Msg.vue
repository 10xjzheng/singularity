<template>
  <div>
    <msg :title="title" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>
<script>
import { Msg, Divider, XButton } from 'vux'

export default {
  components: {
    Msg,
    Divider,
    XButton
  },
  data () {
    return {
      title: '操作成功',
      icon: '',
      buttons: [{
        type: 'primary',
        text: '返回',
        link: '/home'
      }]
    }
  }
}
</script>
