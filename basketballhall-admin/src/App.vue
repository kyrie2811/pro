<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
export default {
  created() {
    if (localStorage.getItem('adminToken')) {
      // 页面刷新的时候，就会重新加载跟组件App.vue,重新加载根组件App.yue.就会执行App.vue的生命周期函数mounted()
      // 1、拿localstorage拿到token中的用户信息
      const adminInfo = jwtDecode(localStorage.getItem('adminToken'))
      // 把adminInfo中的email通过服务端验证服务瑞开一个接口判断是否存在这个email
      // 3、把adminInfo保存到vuex中
      this.$store.dispatch('setAdminInfo', adminInfo)
    }
    if (localStorage.getItem('userToken')) {
      // 页面刷新的时候，就会重新加载跟组件App.vue,重新加载根组件App.yue.就会执行App.vue的生命周期函数mounted()
      // 1、拿localstorage拿到token中的用户信息
      const userInfo = jwtDecode(localStorage.getItem('userToken'))
      // 把adminInfo中的email通过服务端验证服务瑞开一个接口判断是否存在这个email
      // 3、把adminInfo保存到vuex中
      this.$store.dispatch('setUserInfo', userInfo)
    }



  }
}
</script>
<style>
@import'./assets/css/reset.css';
</style>
<style lang="less">
body,
html {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
