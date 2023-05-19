<template>
    <div>

        <!-- 渲染场地信息 -->
        <h1>器材借用</h1>
        <div class="siteMsg" v-for="(item) in allTableSites" :key="item.id">
            <equipmsg :site-item="item" @msg-click="selectItem($event)"></equipmsg>
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
        <el-input v-model="subphone" class="subphone" placeholder="请输入借用的手机号码"></el-input>
        <el-button type="success" class="jieyong" @click="subsuccess()">点击借用</el-button>



    </div>
</template>

<script>
import equipmsg from '@/components/equipment.vue'
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

    components: {
        equipmsg
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
    created() {
        this.getAllSite()

    },
    methods: {
        // 选择
        selectItem(event) {
            this.items.push(event.item)
            console.log(this.items);
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
                this.$axios.post('http://localhost:3000/api/useradmin/equit/sub', subform)
                    .then(res => {

                        this.$Notice.success({
                            title: '借用成功',

                        })

                    })
            }

        },
        // 获取所有场地
        getAllSite() {
            this.$axios.get('http://localhost:3000/api/admin/allequipment')
                .then(res => {
                    console.log('获取到的所有的器材res=>', res)
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

    margin: 20px 0;
}

.jieyong {
    margin-top: 50px;
}

.siteMsg {
    border: 1px solid blue;
    padding: 20px;
    margin: 10px;
    display: flex;
}
</style>