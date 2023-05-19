<template>
    <div>
        <div v-for="(item) in allTableSites" :key="item._id">
            <el-descriptions title="借用信息" :column="3" border>
                <el-descriptions-item label="借用时间" label-class-name="my-label" content-class-name="my-content">{{
                    item.subtime.startime }}-{{ item.subtime.endtime }}</el-descriptions-item>
                <el-descriptions-item label="借用器材名字">{{ item.subsite.equipmentName }}</el-descriptions-item>
                <el-descriptions-item label="借用日期">{{ item.subdate }}</el-descriptions-item>
                <el-descriptions-item label="借用手机号">
                    <el-tag size="small">{{ item.subphone }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="借用器材规格" :contentStyle="{ 'text-align': 'right' }">
                    {{ item.subsite.equipmentspecification }} </el-descriptions-item>
                <el-descriptions-item label="借用器材介绍" :contentStyle="{ 'text-align': 'right' }">
                    {{ item.subsite.equipmentIntroduce }} </el-descriptions-item>
            </el-descriptions>
        </div>

    </div>
</template>

<script>
export default {
    name: 'allorders',
    data: function () {
        return {
            allTableSites: []

        }

    },
    created() {
        this.getAllsubSite()

    },
    computed: {

    },
    methods: {

        // 获取所有借用信息
        getAllsubSite() {
            this.$axios.get('http://localhost:3000/api/useradmin/allsubequit')
                .then(res => {
                    if (res) {
                        console.log('获取到的所有的借用场地res=>', res)
                        res.data.result.forEach((item, index) => {

                            res.data.result[index].subsite = JSON.parse(item.subsite)

                            res.data.result[index].subtime = JSON.parse(item.subtime)
                            res.data.result[index].subtime.startime = new Date(res.data.result[index].subtime.startime).format(' HH:mm:ss')
                            res.data.result[index].subtime.endtime = new Date(res.data.result[index].subtime.endtime).format(' HH:mm:ss')
                            // console.log(this.allTableSites)
                        })
                        this.allTableSites = res.data.result
                    }
                    // console.log(item)

                })


        },
    }
}
</script>

<style lang="less" scoped>
.my-label {
    background: #E1F3D8;
}

.my-content {
    background: #FDE2E2;
}
</style>