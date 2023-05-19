<template>
    <div class="wsnav">
        <div class="head">
            <h5>篮球馆管理系统</h5>
            <div class="home">
                <div class="head">
                    <el-menu class="el-menu-demo" mode="horizontal">
                        <el-menu-item index="1">{{ nowTime }}</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title"><svg t="1678843809282" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2898" width="20" height="20">
                                    <path
                                        d="M512 32a480 480 0 1 0 0 960 480 480 0 0 0 0-960z m-3.072 168.192a144.64 144.64 0 1 1 0 289.28 144.64 144.64 0 0 1 0-289.28zM256 774.144c-1.472-148.224 70.976-240.256 161.792-276.416l93.248 155.584 98.24-152c87.616 38.4 157.248 129.344 158.656 272.96-161.088 63.872-330.88 68.48-511.936-0.128z"
                                        fill="#030000" p-id="2899"></path>
                                </svg></template>
                            <el-menu-item index="2-1">个人中心(未完成)</el-menu-item>
                            <el-menu-item index="2-2" @click.native="logout">退出登录</el-menu-item>


                        </el-submenu>

                        <el-menu-item index="4">你好{{ userInfo.email }}</el-menu-item>
                    </el-menu>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/utils/Date'
export default {
    name: 'usernav',
    data: function () {
        return {
            nowTime: '',
            userInfo: '',
          
        }
    },
    created() {
        this.currentTime()
        this.getAdminInfo()
    },
    methods: {
     
        currentTime() {
            setInterval(() => {
                this.nowTime = new Date().format('yyyy年MM月dd HH:mm:ss')
            }, 1000)
        },
        // 获取用户信息
        getAdminInfo() {
            this.userInfo = this.$store.state.userStore.userInfo
            console.log(this.userInfo)

        },
        logout() {
            this.$confirm('确定退出吗', '退出提示', {
                confirmButtonText: '确定',
                cancelButtonClass: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('userToken')
                this.$router.push('/userlogin')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.head {
    height: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;

}

h5 {
    font-size: 30px;
    color: gray;
    width: 50%;
    display: block;
    line-height: 60px;
    // background-color: red;
}

.home {
    margin-right: 20%;

    .el-menu-demo {
        el-memu-item {
            font-size: 20px;
        }
    }
}

</style>