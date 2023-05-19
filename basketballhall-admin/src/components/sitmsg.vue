<template>
    <div class="sitemsgg">


        <el-descriptions title="场地信息">

            <el-descriptions-item label="名字">{{ siteItem.siteName }}</el-descriptions-item>
            <el-descriptions-item label="数量">{{ siteItem.siteAmount }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ siteItem.siteAddress }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">
                <el-tag size="small">{{ siteItem.sitePhone }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="类型">{{ siteItem.style }}</el-descriptions-item>

        </el-descriptions>

        <el-button type="warning" class="likee" size="small" circle icon="el-icon-star-off"
            @click="success(siteItem)"></el-button>

        <el-radio class="checkbtn" v-model="checkbtn" @change="getmsg(siteItem)">选择</el-radio>

    </div>
</template>
<script>
export default {
    name: 'sitmsg',
    props: ["siteItem"],
    data: function () {
        return {
            checkbtn: false
        }

    },
    methods: {

        getmsg: function (item) {
            this.$emit('msg-click', {
                item
            })
        },
        success(index) {
            this.$emit('msgsuccess-click', {
                index
            })

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