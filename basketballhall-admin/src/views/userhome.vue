<template>
    <div id="home_box">
        <nav>
            <usernav></usernav>
        </nav>
        <div class="home_content">
            <div class="menu">
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                    <el-menu-item index="/userhome/userindex">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>

                    <el-menu-item index="/userhome/usersitesub">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">场地收藏预约管理</span>
                    </el-menu-item>

                    <el-menu-item index="/userhome/usereuipSub">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">器材借用管理</span>
                    </el-menu-item>
                    <el-menu-item index="/userhome/userLike">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">我的收藏</span>
                    </el-menu-item>

                    <el-menu-item index="/userhome/userPerson">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>
<script>
import usernav from '@/components/usernav.vue'

export default {
    name: 'userhome',
    data() {
        return {
            newTime: ""
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        getNowTime() {
            var date = new Date();
            var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            this.newTime = time;
        },
        //根据自己的需求，看要不要在时间不大于10的时候在前面补0，如果需要直接this.addZero(date.getMinutes()),其它与之相同，如果不需要删掉addZero（）方法即可。
        //小于10的拼接上0字符串
        addZero(s) {
            return s < 10 ? ('0' + s) : s;
        },


    },
    mounted() {
        this.getNowTime();//进入页面调用该方法获取当前时间
        clearInterval(myTimeDisplay);//销毁之前定时器
        var myTimeDisplay = setInterval(() => {
            this.getNowTime(); //每秒更新一次时间
        }, 1000);
    },
    components: {
        usernav


    }

}
</script>
<style lang="less" scoped>
.tac {
    display: flex;
    // justify-content: space-between;
}

.el-menu-vertical-demo {
    margin-top: 10px;
    width: 300px;
    height: 800px;

}

.home_content {
    display: flex;

    .menu {
        width: 192px;
        height: 100vh;

        .el-menu {
            border-right: 0px;
            height: 100%;
        }
    }

    .content {
        width: calc(100% - 192px);
        padding-left: 10px;
        padding-right: 20px;
    }
}

.home_content .menu .el-menu[data-v-48e6c778] {
    border-right: 0px;
    height: 400%;
}
</style>