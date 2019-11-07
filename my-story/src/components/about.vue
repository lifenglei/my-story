<template>
  <div>
    <p>地址：新氧科技大厦</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userstage: ''
    }
  },
  mounted () {
    this.userstage = localStorage.getItem('username') // 读取本地是否存有用户信息
    if (
      this.userstage == '' ||
      this.userstage == null ||
      this.userstage == undefined
    ) {
      this.$router.push({ path: 'login' })
    } else {
      console.log(this.tel)
    }
  },
  methods: {}
}
</script>
<style>
body {
  background: #f9fafc;
}
</style>