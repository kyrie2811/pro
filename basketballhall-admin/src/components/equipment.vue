<template>
    <div class="sitemsgg">


        <el-descriptions title="器材信息">

            <el-descriptions-item label="名字">{{ siteItem.equipmentName }}</el-descriptions-item>
            <el-descriptions-item label="数量">{{ siteItem.equipmentAmount }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ siteItem.equipmentuse }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">
                <el-tag size="small">{{ siteItem.equipmentspecification }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="类型">{{ siteItem.equipmentstyle }}</el-descriptions-item>

        </el-descriptions>


        <el-radio class="checkbtn" v-model="checkbtn" @change="getmsg(siteItem)">选择</el-radio>

    </div>
</template>
<script>
export default {

    props: ["siteItem"],
    data: function () {
        return {
            checkbtn: false
        }

    },
    methods: {
        success: function (item) {

            this.$axios.post('http://localhost:3000/api/useradmin/site/like', item)
                .then(res => {
                    this.$Notice.success({
                        title: '收藏成功',

                    })

                })

        },
        getmsg: function (item) {
            this.$emit('msg-click', {
                item
            })
        }
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

.sitemsgg {
    display: flex;
}

.likee {
    align-self: center;
}

.checkbtn {
    width: 50px;
    margin: auto;
    margin-left: 20px;
}
</style>