<template>
    <div>
        <!-- 数据表 -->
        <div style="width: 100%; background-color: #f40">
            <el-table :data="allTableSites.slice((currentPage - 1) * size, currentPage * size)" style="width: 100%" border
                height="500">
                <el-table-column type="index" label="序号" align="center" width="60">
                </el-table-column>
                <el-table-column prop="_id" v-if="false"></el-table-column>
                <el-table-column label="场地名字" prop="siteName" align="center" width="200">
                </el-table-column>
                <el-table-column prop="siteAmount" label="场地数量" align="center" width="170">
                </el-table-column>
                <el-table-column prop="siteAddress" align="center" width="200" label="场地地址">
                </el-table-column>
                <el-table-column align="center" width="120" label="场地封面">
                    <template slot-scope="scope">
                        <Avatar size="large" :src="'http://localhost:3000/api/admin/poster?img=' + scope.row.poster" />
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120" label="场地营业时间" prop="siteTime">

                </el-table-column>
                <el-table-column align="center" prop="sitePhone" width="120" label="场地联系方式">
                </el-table-column>
                <el-table-column align="center" prop="siteIntroduce" width="120" label="场地介绍">
                </el-table-column>
                <el-table-column align="center" prop="style" width="80" label="场地类型">
                </el-table-column>
                <el-table-column align="center" prop="date" width="200" label="最近更新时间">
                </el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" min-width="150">
                    <template slot-scope="scope">

                        <el-button type="danger" icon="el-icon-delete" size="small" circle
                            @click="deleteSite(scope)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <!-- 分页 -->
        <Row>
            <Col span="24" style="text-align: right;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="paginations.pageIndex" :page-sizes="paginations.pageSizes" :layout="paginations.layout"
                :total="siteTotal">
            </el-pagination>
            </Col>
        </Row>
    </div>
</template>


<script>
import Logo from '../assets/logo.png'
export default {
    name: 'adminlikes',
    data: function () {
        return {
            // collectArr: ["el-icon-star-off", "el-icon-star-on"],

            // isCollect: false,
            inputSearch: '',
            // siteSrc: "'http://localhost:3000/api/admin/poster?img=' + addForm.poster",
            siteSrc: Logo,
            // 分页
            paginations: {
                pageIndex: 1,// 当前位于哪一页
                total: 0,// 总的数据条数
                pageSize: 0,//每一页显示多少条
                pageSizes: [3, 6, 9],// 可以选择每一页显示多少条
                layout: "total, sizes, prev, pager, next, jumper"// 翻页的控件
            },
            allSites: [],
            // 添加场地的模型
            addForm: {
                siteName: '',
                siteAmount: '',
                siteAddress: '',
                siteTime: '',
                sitePhone: '',
                siteIntroduce: '',
                style: '',
                date: '',
                poster: '',


            },
            editForm: {
                siteName: '',
                siteAmount: '',
                siteAddress: '',
                siteTime: '',
                sitePhone: '',
                siteIntroduce: '',
                style: '',
                date: '',
                poster: '',


            },
            addDialog: {
                title: "添加场地",
                show: false
            },
            editDialog: {
                title: "修改场地",
                show: false
            },
            addForm_rules: {
                siteName: [{ required: true, message: '场地名称不能为空' }],
                siteAmount: [{ required: true, message: '场地数量不能为空' }],
                siteAddress: [{ required: true, message: '场地地址不能为空' }],
                sitePhone: [{ required: true, message: '场地联系方式不能为空' }],

            },
            SiteStyle: ['半场', '全场'],
            allTableSites: [],
            currentPage: 1,
            size: 3,


        }
    },
    computed: {
        siteTotal() {
            return this.allTableSites.length
        }
    },
    created() {
        this.getAllSite()
        // this.totalSite()
        // console.log('aaaa', this.isCollectArray);
    },
    methods: {
        // 分页
        handleSizeChange(pageSize) {
            this.size = pageSize
        },
        handleCurrentChange(page) {
            this.currentPage = page
        },

        // 获取所有场地
        getAllSite() {
            this.$axios.get('http://localhost:3000/api/useradmin/rowsite')
                .then(res => {
                    console.log('获取到的所有的场地res=>', res)
                    this.allTableSites = res.data.result
                    // 分页参数
                    this.paginations.total = this.allTableSites.length
                    this.paginations.pageIndex = 1
                    this.paginations.pageSize = 3

                    // 对所有的数据进行分页
                    // [111,222,333,444,555,666,777,888,999]
                    // 0~2  3~5 6~8
                    this.allSites = this.allTableSites.filter((item, index) => {
                        return index < this.paginations.pageSize
                    })
                })


        },



        //场地封面上传完成之后的回调
        handleMusicPoster(res) {
            console.log('场地封面上传完成之后：res=>', res)
            this.addForm.poster = res.result.poster
            this.siteSrc = 'http://localhost:3000/api/admin/poster?img=' + this.addForm.poster

        },


        // 删除场地
        deleteSite(obj) {
            console.log(obj)
            let deleItem = { _id: obj.row._id }
            this.$axios.post('http://localhost:3000/api/useradmin/deletelike', deleItem).then(res => {
                if (res) {
                    console.log('boj=>', obj)
                    this.getAllSite()
                    this.$Message.success('删除成功')
                }
            }).catch(err => {
                this.$Message.error('删除失败')
            })

        },




    },




}
</script>

<style lang="less" scoped></style>