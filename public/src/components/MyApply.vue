<template>
  <div>
    <tab>
      <tab-item :selected="applyType == item.type" v-for="(item, index) in titles" @on-item-click="getList (item.type)" :key="index">{{item.title}}
      </tab-item>
    </tab>
    <form-preview v-for="item in items" :key='item'  :body-items="item" >
    </form-preview>
  </div>
</template>

<script>
import axios from 'axios'
import { Tab, TabItem, FormPreview } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    FormPreview
  },
  data () {
    return {
      applyType: 1, // [1=POS机],[2=信用卡],[3=贷款],[4=车险]
      titles: [
        { type: 1, title: 'POS机' },
        { type: 2, title: '信用卡' },
        { type: 3, title: '贷款' },
        { type: 4, title: '车贷' }
      ],
      items: []
    }
  },
  methods: {
    handler (value) {
      var number
      this.items.forEach(
        function (item) {
          number = 0
          item.list.forEach(
            function (row) {
              if (number === 0) {
                row.label = value
              }
              number++
            }
          )
        }
      )
    },
    dataFormat (list) {
      var statusArr = [ '待审核', '审核通过', '审核驳回' ]
      var typeArr = [ 'POS机', '信用卡', '贷款', '车险' ]
      var res = []
      var key = 0
      list.forEach(
        function (item) {
          res[key] = [
            { label: typeArr[item.type - 1], value: item.apply_type },
            { label: '状态', value: statusArr[item.status] },
            { label: '申请日期', value: item.created_at }
          ]
          key++
        }
      )
      return res
    },
    getList (type) {
      var obj = this
      obj.applyType = type
      axios.post(this.getHost + '/info/applyList', { type: type })
        .then(function (response) {
          var data = response.data
          if (data.errorCode === 0) {
            if (data) {
              obj.items = obj.dataFormat(data.data)
              console.log(obj.items)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.applyType = this.$route.params.type
    this.getList(this.applyType)
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';

</style>

