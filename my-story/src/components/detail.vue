<template>
  <div class="box">
    <p class="title" v-text="DetaiInfo.title"></p>
    <p class="sub">
      作者：
      <span class="author" v-text="DetaiInfo.author"></span>
      <span class="w20"></span>
    </p>
    <p class="content" v-html="DetaiInfo.content"></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userstage: '',
      DetaiInfo: {
        title: '',
        author: '',
        content: '',
        time: ''
      }
    }
  },
  mounted () {
    this.userstage = localStorage.getItem('username') // 读取本地是否存有用户信息
    if (this.userstage === '' || this.userstage === null) {
      this.$router.push({ path: 'login' })
    } else {
      console.log(this.userstage)
    }
    console.log(this.$route.query.id)
    this.GetDetail()
  },
  methods: {
    GetDetail () {
      this.$ajax({
        method: 'get',
        url: this.$url+'/detail',
        params: {
          author: this.$route.query.author,
          id: this.$route.query.id
        }
      })
        .then(response => {
          let res = JSON.parse(response.request.response)
          this.DetaiInfo.title = res.info[0].title
          this.DetaiInfo.author = res.info[0].author
          this.DetaiInfo.time = res.info[0].time
          this.DetaiInfo.content = res.info[0].content
        })
        .catch(error => {
          console.log(error)
        })
    },
    GetQueryString: function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
}
</script>
<style>
.box {
  padding: 10px 20px;
  text-align: center;
}
p.title {
  font-weight: bold;
}
p.sub {
  font-size: 12px;
  color: #888;
  padding: 10px;
}
p.sub .author {
  color: red;
}
span.w20 {
  padding: 0 10px;
}
.content {
  padding: 10px;
  font-size: 15px;
  text-align: center;
}
</style>
