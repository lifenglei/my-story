<template>
  <div id="app">
        <div class="line"></div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/" >诗歌</el-menu-item>
            <el-menu-item index="/publish" >发表</el-menu-item>
            <el-menu-item index="/me" >我的</el-menu-item>
            <el-menu-item index="about" >相关</el-menu-item>
            <el-button type="primary" class="logout" @click="logOut">退出登录</el-button>
        </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
        this.$router.push({ path: key })
      },
      logOut(){
        localStorage.clear()
        this.$router.push('/')
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  
}
.el-menu-demo{
margin-bottom:22px
}
*{
  padding: 0;
  margin:0;
}
ul,li{
  list-style: none;
}
.logout{
  position:relative;
  top:10px;
}
</style>
