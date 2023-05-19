<template>
    <!-- 简介 -->
    <el-dialog :title="addDialog.title" :visible.sync="addDialog.show" :close-on-click-modal="false"
        :close-on-press-escape="false" :modal-append-to-body="false">
        <div class="form">
            <el-form ref="addForm" :model="addForm" :rules="addForm_rules" label-width="120px"
                style="margin: 10px; width: auto">
                <el-form-item prop="siteName" label="场地名:">
                    <el-input type="siteName" v-model="addForm.siteName"></el-input>
                </el-form-item>
                <el-form-item prop="siteAmount" label="场地数量:">
                    <el-input type="siteAmount" v-model="addForm.siteAmount"></el-input>
                </el-form-item>
                <el-form-item prop="siteAddress" label="场地地址:">
                    <!-- <Upload action="http://localhost:3000/api/admin/upload/music" ref="uploadmusic" :format="['mp3']"
                            :on-success="handleMusicSrc">
                            <Button icon="ios-cloud-upload-outline">上传歌曲</Button>
                        </Upload> -->
                    <el-input type="siteAddress" v-model="addForm.siteAddress"></el-input>

                </el-form-item>
                <el-form-item label="场地封面:" prop="poster">
                    <Upload :show-upload-list="false" :format="['jpg', 'png']" :max-size="10000" multiple type="drag"
                        action="http://localhost:3000/api/admin/upload/poster" :on-success="handleMusicPoster"
                        style="display: block; width: 44px">
                        <span style="float: left">
                            <Avatar :src="siteSrc" size="large" />
                        </span>
                    </Upload>
                </el-form-item>
                <el-form-item label="场地营业时间:" prop="siteTime">
                    <!-- <Upload :show-upload-list="false" :format="['jpg', 'png']" :max-size="10000" multiple type="drag"
                            action="http://localhost:3000/api/admin/upload/poster" :on-success="handleMusicPoster"
                            style="display: block; width: 44px">
                            <span style="float: left">
                                <Avatar :src="'http://localhost:3000/api/admin/poster?img=' + addForm.poster"
                                    size="large" />
                            </span>
                        </Upload> -->

                    <el-input type="siteTime" v-model="addForm.siteTime"></el-input>

                </el-form-item>
                <el-form-item prop="siteIntroduce" label="场地介绍:">
                    <!-- <Select v-model="addForm.siteIntroduce" clearable style="width: 200px">
                            <Option v-for="item in siteIntroduce" :value="item" :key="item">{{ item }}</Option>
                            
                        </Select> -->
                    <el-input type="siteIntroduce" v-model="addForm.siteIntroduce"></el-input>

                </el-form-item>
                <el-form-item prop="sitePhone" label="场地联系方式:">
                    <el-input type="sitePhone" v-model="addForm.sitePhone"></el-input>
                </el-form-item>
                <el-form-item prop="style" label="类型:">
                    <Select v-model="addForm.style" clearable style="width: 200px">
                        <!-- <Option v-for="item in SiteStyle" :value="item" :key="item">{{
                            item
                        }}</Option> -->
                    </Select>
                    <!-- <el-input type="style" v-model="addForm.style"></el-input> -->

                </el-form-item>
                <el-form-item class="text_right">
                    <el-button @click="(addDialog.show) = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddSite('addForm')">提 交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>
  
<script>
// import { userInfo, updateUser } from "@/api/user.js";
import Logo from '../assets/logo.png'
export default {
    name: "PersonalDia",
    data() {
        return {
            siteSrc: Logo,
            dialogVisible: false,
            form: {
                avatar: "",
                password: "",
                nickname: "",
                age: Number,
                email: "",
                mobilePhoneNumber: "",
                sex: Number,
                id: Number,
                account: "",
                area: "",
                hobby: "",
                work: "",
                design: "",
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
            addDialog: {
                title: "添加场地",
                show: false
            },
            addForm_rules: {
                siteName: [{ required: true, message: '场地名称不能为空' }],
                siteAmount: [{ required: true, message: '场地数量不能为空' }],
                siteAddress: [{ required: true, message: '场地地址不能为空' }],
                sitePhone: [{ required: true, message: '场地联系方式不能为空' }],

            },
            rules: {
                nickname: [
                    { required: true, message: "昵称不能为空", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "账号密码不能为空", trigger: "blur" },
                ],
            },
        };
    },
    mounted() {
        // this.load();
    },
    methods: {
        open() {
            this.dialogVisible = true;
        },
        // 添加场地
        // 对话框弹出
        showAddSiteBtn() {
            this.addDialog.show = true
        },
        // load() {
        //     userInfo(this.$store.state.id)
        //         .then((res) => {
        //             console.log(res);
        //             Object.assign(this.form, res.data);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // },
        submit() {
            updateUser(this.form)
                .then((res) => {
                    console.log(res);
                    this.dialogVisible = false;
                    this.$emit("flesh");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleClose() {
            this.dialogVisible = false;
            this.$emit("flesh");
        },
        //场地封面上传完成之后的回调
        handleMusicPoster(res) {
            console.log('场地封面上传完成之后：res=>', res)
            this.addForm.poster = res.result.poster
            this.siteSrc = 'http://localhost:3000/api/admin/poster?img=' + this.addForm.poster

        },
    },
};
</script>
  
<style scoped>
.updateinfo {
    height: 350px;
    overflow: auto;
}

.left {
    /* width: 330px; */
    float: left;
}

.right {
    overflow: hidden;
}
</style>
  