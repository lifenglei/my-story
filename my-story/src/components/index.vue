<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <div v-if="contentList.length">
        <div v-for="(me,index) in contentList" :key="index" class="text item" @click="GoTo(me.id,me.author)">
        {{ me.title }}
        <p style="color:#999;">{{me.time.substring(0,10)}}</p>
        <p style="color:#07aefc;">{{me.author}}</p>
      </div>
      </div>
      <div v-else>暂无发表^^</div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      sumList: 0,
      contentList: [],
      activeIndex2: '1'
    }
  },
  mounted () {
    this.GetList()
  },
  methods: {
    GetList () {
      this.$ajax({
        method: 'get',
        url: 'http://192.168.128.103:3000/artical',
        params: {
          type: 1,
          name:localStorage.getItem('username')||''
        }
      })
        .then(response => {
          let res = JSON.parse(response.request.response)
          if(res.errorCode===101){
            //说明此刻没登录
            this.$router.push({path:'login'})
          }else{
            res.list.length&&res.list.forEach((value, index) => {
              this.contentList.push(value)
            })
          }
          
        })
        .catch(error => {
          console.log(error)
        })
    },
    GoTo (id, author) {
      this.$router.push({ path: 'detail', query: { id: id, author: author } })
    }
  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 8px 0;
  text-align: left;
  display:flex;
  justify-content: space-between;
}
</style>