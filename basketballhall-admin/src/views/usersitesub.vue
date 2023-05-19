<template>
    <div>
        <div>
            <!-- <el-calendar v-model="value">
        </el-calendar> -->
            <!-- 渲染场地信息 -->
            <h1>场地选择</h1>
            <div class="siteMsg" v-for="(item) in allTableSites" :key="item._id">
                <sitmsg :site-item="item" @msg-click="selectItem($event)" @msgsuccess-click="success($event)"></sitmsg>
            </div>
        </div>

        <div class="date">
            <!--  -->
            <h1>日期选择</h1>
            <el-calendar v-model="currentDate">
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template slot="dateCell" slot-scope="{data}">
                    <div>
                        <p :class="data.isSelected ? 'is-selected' : ''">
                            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
                        </p>
                    </div>
                </template>
            </el-calendar>
        </div>

        <div class="time">
            <!-- 温馨提示 -->
            <el-button plain @click="open1">
                温馨提示
            </el-button>
            <h1>时间点选择</h1>

            <!-- 下拉时间选择 -->
            <el-time-picker v-model="value1" :picker-options="{
                selectableRange: '08:00:00 - 22:59:59'
            }" placeholder="任意时间点">
            </el-time-picker>
            <el-time-picker arrow-control v-model="value2" :picker-options="{
                selectableRange: '08:00:00 - 22:59:59'
            }" placeholder="任意时间点">
            </el-time-picker>
        </div>
        <!-- 输入手机号码 -->
        <el-input v-model="subphone" class="subphone" placeholder="请输入预约的手机号码"></el-input>
        <el-button type="success" @click="subsuccess()">点击预约</el-button>

    </div>
</template>

<script>
import sitmsg from '@/components/sitmsg.vue'
export default {

    data: function () {
        return {
            value: new Date(),
            value1: new Date(),
            value2: new Date(),
            allTableSites: [],
            input: '',
            currentDate: new Date(),
            items: [],
            subphone: ''

        }

    },
    computed: {
        checkbtn() {
            if (this.allTableSites) {
                const arr = new Array(this.allTableSites.length).fill(false)
                console.log(arr);

                return arr
            }

        },
        selectedDayTime() {
            return new Date(this.currentDate).format('yyyy年MM月dd日')
        }
    },
    components: {
        sitmsg,
    },
    created() {
        this.getAllSite()
    },
    methods: {
        // 选择
        selectItem(event) {
            this.items.push(event.item)
            console.log(this.items);
        },
        // 收藏成功的提示

        success(index) {
            // console.log(index);
            this.$axios.post('http://localhost:3000/api/useradmin/site/like', index.index)
                .then(res => {
                    // console.log('添加收藏场地res=>', res)
                    // this.addDialog.show = false

                    // 刷新列表表格
                    // this.getAllSite()

                    // 重置表单
                    // this.$nextTick(() => {
                    //     this.$refs.addForm.resetFields()
                    // })

                    this.$Notice.success({
                        title: '收藏成功',

                    })

                }).catch(err => {
                    console.log(err)
                })
        },
        // 点击预约成功
        subsuccess() {
            // console.log(event)
            const subform = {
                subId: this.$store.state.userStore.userInfo.id,
                subsite: this.items,
                subdate: this.selectedDayTime,
                subtime: { startime: this.value1, endtime: this.value2 },
                subphone: this.subphone
            }
            console.log(subform)
            if (subform.subsite.length == 0 || subform.subphone == '') {
                this.$Notice.error({
                    title: '预约错误',
                })
            } else if (subform.subsite.length > 1) {
                this.$Notice.error({
                    title: '一个账号只能预约一个场地',

                })
                subform.subsite = []

            } else {
                this.$axios.post('http://localhost:3000/api/useradmin/site/sub', subform)
                    .then(res => {

                        this.$Notice.success({
                            title: '预约成功',

                        })

                    })
            }

        },




        // 获取所有场地
        getAllSite() {
            this.$axios.get('http://localhost:3000/api/admin/allsite')
                .then(res => {

                    this.allTableSites = res.data.result

                })


        },
        open1() {
            const h = this.$createElement;

            this.$notify({
                title: '温馨提示',
                message: h('i', { style: 'color: teal' }, '尽量选择一个小时的整数，半小时按一个小时算')
            });
        },


    }
}
</script>

<style lang="less" scoped>
.is-selected {
    color: #1989FA;
}

.date {


    .el-calendar {
        width: 80%;
        margin: auto;
    }
}

.time {
    width: 80%;

    padding: 50px 0;

}

.siteMsg {
    border: 1px solid blue;
    padding: 20px;
    margin: 10px;
    display: flex;
}

.el-button {
    // width: 50%;
    margin: auto;
    height: 50%;
}

.subphone {
    margin: 20px;
    width: 50%;
    display: block;
}

.checkbtn {
    width: 50px;
    margin: auto;
    margin-left: 20px;
}
</style>