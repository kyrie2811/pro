<template>
    <div>
        <Row style="padding: 20px 60px 20px 40px">
            <Col :span="5">
            <Input prefix="ios-site-notes" v-model="inputSerche" clearable placeholder="按器材名字搜索器材..." style="width: auto"
                @keyup.enter.native="searchSite()" />
            </Col>
            <Col :span="7">
            <Button type="success" style="margin-left: 5px" @click="searchSite()">搜索器材</Button>
            </Col>
            <Col :span="12" style="text-align: right">
            <Avatar id="musicPoster" class="listen-poster" size="large" style="margin-right: 40px"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F3dd5c3ba-4ffe-429a-8f70-45928233c88e%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681790983&t=0d1cb12cd28f0007c4695d096bf35756" />
            <Button type="primary" @click="showAddEquipBtn">添加器材</Button>
            </Col>
        </Row>
        <!-- 器材数据表 -->
        <div style="width: 100%; background-color: #f40">
            <el-table :data="allTableSites.slice((currentPage - 1) * size, currentPage * size)" style="width: 100%" border
                height="500">
                <el-table-column type="index" label="序号" align="center" width="60">
                </el-table-column>
                <el-table-column prop="_id" v-if="false"></el-table-column>
                <el-table-column label="器材名字" prop="equipmentName" align="center" width="200">
                </el-table-column>
                <el-table-column prop="equipmentAmount" label="器材数量" align="center" width="170">
                </el-table-column>
                <el-table-column prop="equipmentstyle" align="center" width="200" label="器材类型">
                </el-table-column>
                <el-table-column align="center" width="120" label="器材图片">
                    <template slot-scope="scope">
                        <Avatar size="large" :src="'http://localhost:3000/api/admin/poster?img=' + scope.row.poster" />
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120" label="器材用途" prop="equipmentuse">

                </el-table-column>
                <el-table-column align="center" prop="equipmentspecification" width="120" label="器材规格">
                </el-table-column>
                <el-table-column align="center" prop="equipmentIntroduce" width="120" label="器材用法介绍">
                </el-table-column>

                <el-table-column align="center" prop="date" width="200" label="最近更新时间">
                </el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" circle icon="el-icon-star-off"></el-button>
                        <el-button type="primary" icon="el-icon-edit" size="small" circle
                            @click="showEditDialog(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small" circlec
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
        <!--添加器材的对话框 -->
        <el-dialog :title="addDialog.title" :visible.sync="addDialog.show" :close-on-click-modal="false"
            :close-on-press-escape="false" :modal-append-to-body="false">
            <div class="form">
                <el-form ref="addForm" :model="addForm" :rules="addForm_rules" label-width="120px"
                    style="margin: 10px; width: auto">
                    <el-form-item prop="equipmentName" label="器材名称:">
                        <el-input type="siteNaequipmentNameme" v-model="addForm.equipmentName"></el-input>
                    </el-form-item>
                    <el-form-item prop="equipmentAmount" label="器材数量:">
                        <el-input type="equipmentAmount" v-model="addForm.equipmentAmount"></el-input>
                    </el-form-item>
                    <el-form-item prop="equipmentstyle" label="器材类型:">
                        <!-- <Upload action="http://localhost:3000/api/admin/upload/music" ref="uploadmusic" :format="['mp3']"
                            :on-success="handleMusicSrc">
                            <Button icon="ios-cloud-upload-outline">上传歌曲</Button>
                        </Upload> -->
                        <el-input type="equipmentstyle" v-model="addForm.equipmentstyle"></el-input>

                    </el-form-item>
                    <el-form-item label="器材图片:" prop="poster">
                        <Upload :show-upload-list="false" :format="['jpg', 'png']" :max-size="10000" multiple type="drag"
                            action="http://localhost:3000/api/admin/upload/poster" :on-success="handleMusicPoster"
                            style="display: block; width: 44px">
                            <span style="float: left">
                                <Avatar :src="siteSrc" size="large" />
                            </span>
                        </Upload>
                    </el-form-item>
                    <el-form-item label="器材用途:" prop="equipmentuse">


                        <el-input type="equipmentuse" v-model="addForm.equipmentuse"></el-input>

                    </el-form-item>
                    <el-form-item prop="equipmentspecification" label="器材规格:">
                        <Select v-model="addForm.equipmentspecification" clearable style="width: 200px">
                            <Option v-for="item in equipmentspecification" :value="item" :key="item">{{
                                item
                            }}</Option>
                        </Select>
                        <!-- <el-input type="style" v-model="addForm.style"></el-input> -->

                    </el-form-item>
                    <el-form-item prop="equipmentIntroduce" label="器材用法介绍:">
                        <el-input type="equipmentIntroduce" v-model="addForm.equipmentIntroduce"></el-input>
                    </el-form-item>

                    <el-form-item class="text_right">
                        <el-button @click="(addDialog.show) = false">取 消</el-button>
                        <el-button type="primary" @click="submitAddSite('addForm')">提 交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--编辑器材的对话框 -->
        <el-dialog :title="editDialog.title" :visible.sync="editDialog.show" :close-on-click-modal="false"
            :close-on-press-escape="false" :modal-append-to-body="false">
            <div class="form">
                <el-form ref="editForm" :model="editForm" :rules="addForm_rules" label-width="120px"
                    style="margin: 10px; width: auto">
                    <el-form-item prop="equipmentName" label="器材名称:">
                        <el-input v-model="editForm.equipmentName"></el-input>
                    </el-form-item>
                    <el-form-item prop="equipmentAmount" label="器材数量:">
                        <el-input type="equipmentAmount" v-model="editForm.equipmentAmount"></el-input>
                    </el-form-item>
                    <el-form-item prop="equipmentstyle" label="器材类型:">
                        <!-- <Upload action="http://localhost:3000/api/admin/upload/music" ref="uploadmusic" :format="['mp3']"
                            :on-success="handleMusicSrc">
                            <Button icon="ios-cloud-upload-outline">上传歌曲</Button>
                        </Upload> -->
                        <el-input type="equipmentstyle" v-model="editForm.equipmentstyle"></el-input>

                    </el-form-item>
                    <el-form-item label="器材图片:" prop="poster">
                        <Upload :show-upload-list="false" :format="['jpg', 'png']" :max-size="10000" multiple type="drag"
                            action="http://localhost:3000/api/admin/upload/poster" :on-success="handleMusicPoster"
                            style="display: block; width: 44px">
                            <span style="float: left">
                                <Avatar :src="siteSrc" size="large" />
                            </span>
                        </Upload>
                    </el-form-item>
                    <el-form-item label="器材用途:" prop="equipmentuse">


                        <el-input type="equipmentuse" v-model="editForm.equipmentuse"></el-input>

                    </el-form-item>
                    <el-form-item prop="equipmentspecification" label="器材规格:">
                        <Select v-model="editForm.equipmentspecification" clearable style="width: 200px">
                            <Option v-for="item in equipmentspecification" :value="item" :key="item">{{
                                item
                            }}</Option>
                        </Select>
                        <!-- <el-input type="style" v-model="editDialog.style"></el-input> -->

                    </el-form-item>
                    <el-form-item prop="equipmentIntroduce" label="器材用法介绍:">
                        <el-input type="equipmentIntroduce" v-model="editForm.equipmentIntroduce"></el-input>
                    </el-form-item>

                    <el-form-item class="text_right">
                        <el-button @click="(editDialog.show) = false">取 消</el-button>
                        <el-button type="primary" @click="editSite('editForm')">提 交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

    </div>
</template>


<script>
import Logo from '../assets/logo.png'
export default {
    name: 'ManageEquipment',
    data: function () {
        return {
            inputSerche: '',
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
            // 添加器材的模型
            addForm: {
                equipmentName: '',
                equipmentAmount: '',
                equipmentstyle: '',
                equipmentuse: '',
                equipmentspecification: '',
                equipmentIntroduce: '',

                date: '',
                poster: '',


            },
            editForm: {
                equipmentName: '',
                equipmentAmount: '',
                equipmentstyle: '',
                equipmentuse: '',
                equipmentspecification: '',
                equipmentIntroduce: '',

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
                equipmentName: [{ required: true, message: '器材名称不能为空' }],
                equipmentAmount: [{ required: true, message: '器材数量不能为空' }],
                equipmentstyle: [{ required: true, message: '器材类型不能为空' }],
                equipmentspecification: [{ required: true, message: '器材规格不能为空' }],
            },
            equipmentspecification: ['规格1', '规格2', '规格3', '规格4'],
            allTableSites: [],
            currentPage: 1,
            size: 3

        }
    },
    computed: {
        siteTotal() {
            return this.allTableSites.length
        }
    },
    created() {
        this.getAllSite()
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
            this.$axios.get('http://localhost:3000/api/admin/allequipment')
                .then(res => {
                    console.log('获取到的所有的器材res=>', res)
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

        // 添加场地
        // 对话框弹出
        showAddEquipBtn() {
            this.addDialog.show = true
        },

        //场地封面上传完成之后的回调
        handleMusicPoster(res) {
            console.log('场地封面上传完成之后：res=>', res)
            this.addForm.poster = res.result.poster
            this.siteSrc = 'http://localhost:3000/api/admin/poster?img=' + this.addForm.poster

        },

        // 添加器材
        submitAddSite(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 调用接口，增加场地
                    this.$axios.post('http://localhost:3000/api/admin/equipment/add', this.addForm)
                        .then(res => {
                            console.log('添加场地res=>', res)
                            this.addDialog.show = false

                            // 刷新列表表格
                            this.getAllSite()

                            // 重置表单
                            this.$nextTick(() => {
                                this.$refs.addForm.resetFields()
                            })

                            this.$Message.success("添加器材成功")
                        })
                }
            })
        },

        // 删除器材
        deleteSite(obj) {
            console.log(obj)
            let deleItem = { _id: obj.row._id }
            this.$axios.post('http://localhost:3000/api/admin/deletequitpment', deleItem).then(res => {
                if (res) {
                    this.getAllSite()
                    this.$Message.success('删除成功')
                }
            }).catch(err => {
                this.$Message.error('删除失败')
            })

        },
        //关闭编辑用户的对话框
        // editDialogClosed() {
        //     this.$refs.addForm_rules.resetFields();
        // },
        //展示编辑用户的对话框
        showEditDialog(obj) {
            this.editDialog.show = true
            console.log("当前场地信息=>", obj);
            this.editForm = { ...obj }
        },
        // 修改场地

        //点击按钮，修改用户信息
        editSite(formName) {

            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 调用接口，增加场地
                    this.$axios.post('http://localhost:3000/api/admin/editeqiupment', {
                        equipmentName: this.editForm.equipmentName,
                        equipmentAmount: this.editForm.equipmentAmount,
                        equipmentstyle: this.editForm.equipmentstyle,
                        equipmentuse: this.editForm.equipmentuse,
                        equipmentIntroduce: this.editForm.equipmentIntroduce,
                        equipmentspecification: this.editForm.equipmentspecification,
                        poster: this.editForm.poster,
                        date: this.editForm.date,
                        _id: this.editForm._id
                    }).then(res => {

                        this.$message.success('修改器材成功！');
                        // 隐藏修改用户的对话框
                        // console.log(this.editDialog)
                        this.editDialog.show = false;
                        //重新获取用户列表数据
                        this.getAllSite()
                    }).catch(err => {
                        console.log('修改器材失败err=>', err)
                    })
                } else {
                    console.log('编辑器材验证未通过')
                }
            })
        },
        // 查找
        searchSite() {
            this.$axios.post('http://localhost:3000/api/admin/searche', { inputSerche: this.inputSerche }).then(res => {
                if (res.data.result == '暂无数据') {
                    this.allTableSites = []
                } else {
                    this.allTableSites = res.data.result
                }
            }).catch(err => {
                console.log(err);
            })
        },


    },




}
</script>

<style lang="less" scoped></style>