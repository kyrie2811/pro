import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import home from '@/views/home.vue'
import Welcome from '@/views/index'
import Managebasketball from '@/views/managebasketball'
import EquipmentManagement from '@/views/EquipmentManagement'
import Sitesubscribe from '@/views/sitesubscribe'
import Equipmentsubscribe from '@/views/equipmentsubscribe'
import AdminLikes from '@/views/adminlikes'
import personCenter from '@/views/personCenter'
import UserLogin from '@/views/userlogin'
import UserRegister from '@/views/userregister'
import userhome from '@/views/userhome'
import userLike from '@/views/userLike'
import usereuipSub from '@/views/usereuipSub'
import userPerson from '@/views/userPerson'
import usersitesub from '@/views/usersitesub'
import userindex from '@/views/userindex'






Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: "登录" }

  },
  {
    path: '/userlogin',
    name: 'UserLogin',
    component: UserLogin,
    meta: { title: "用户登录" }

  },
  {
    path: '/userregister',
    name: 'UserRegister',
    component: UserRegister,
    meta: { title: "用户注册" }

  },
  // 后端界面
  {
    path: '/home',
    component: home,
    children: [
      { path: '/', redirect: 'welcome' },
      { path: 'welcome', name: "welcome", component: Welcome, meta: { title: "首页" } },
      { path: 'Managebasketball', name: "Managebasketball", component: Managebasketball, meta: { title: "场地管理" } },
      { path: 'EquipmentManagement', name: "EquipmentManagement", component: EquipmentManagement, meta: { title: "器材管理" } },
      { path: 'Sitesubscribe', name: "Sitesubscribe", component: Sitesubscribe, meta: { title: "场地预约管理" } },
      { path: 'Equipmentsubscribe', name: "Equipmentsubscribe", component: Equipmentsubscribe, meta: { title: "器材预约管理" } },
      { path: 'adminlikes', name: "adminlikes", component: AdminLikes, meta: { title: "我的收藏" } },
      { path: 'personCenter', name: "personCenter", component: personCenter, meta: { title: "个人中心" } }

    ],
    meta: { title: "篮球管理" }
  },
  // 用户界面
  {
    path: '/userhome',
    component: userhome,
    children: [
      { path: '/userhome', redirect: 'userindex' },
      { path: 'userindex', name: "userindex", component: userindex, meta: { title: "首页" } },
      { path: 'usersitesub', name: "usersitesub", component: usersitesub, meta: { title: "场地预约管理" } },
      { path: 'usereuipSub', name: "usereuipSub", component: usereuipSub, meta: { title: "器材预约管理" } },
      { path: 'userLike', name: "userLike", component: userLike, meta: { title: "我的收藏" } },
      { path: 'userPerson', name: "userPerson", component: userPerson, meta: { title: "个人中心" } }

    ],
    meta: { title: "用户管理" }
  },
]
const router = new VueRouter({
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 校验身份=>持有令牌 token
  // 访问首页 /
  // 1、获取token
  const adminToken = localStorage.getItem('adminToken')
  const userToken = localStorage.getItem('userToken')
  // 2、判断是否存在合法身份，验证token是否存在
  // 2.1排除/login的身份验证
  if (to.path == '/login' || to.path == '/userlogin' || to.path == '/userregister') {

    // if (adminToken) {
    //   next('/')

    // } else {
    next()
    // }

  } else {
    if (adminToken || userToken) {
      next()
    } else {
      next('/login')
    }
  }

})
// 后置守卫
router.afterEach((to, from) => {
  // 一般处理跟BOM相关的事情
  // 一般设置标签页的title
  console.log('to=>', to)

  document.title = to.meta.title

})

export default router