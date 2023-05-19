<template>
    <div>
        <div>
            <el-card>
                <el-descriptions class="margin-top" title="简介" :column="2" border>
                    <template slot="extra">
                        <el-button type="primary" @click="showAddSiteBtn" size="small">操作</el-button>
                    </template>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-picture-outline"></i>
                            头像
                        </template>
                        <img class="img" alt="" src="../assets/keriy.webp" />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            账户名
                        </template>
                        {{ userInfo.username }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-s-custom"></i>
                            昵称
                        </template>
                        {{ userInfo.nickname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-odometer"></i>
                            年龄
                        </template>
                        {{ userInfo.age }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-male"></i>
                            <i class="el-icon-female"></i>
                            性别
                        </template>
                        {{ userInfo.sex }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-message"></i>
                            邮箱Email
                        </template>
                        {{ userInfo.email }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-mobile-phone"></i>
                            手机号码
                        </template>
                        {{ userInfo.mobilePhoneNumber }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            地区
                        </template>
                        {{ userInfo.area }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            职业
                        </template>
                        {{ userInfo.work }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-basketball"></i>
                            兴趣爱好
                        </template>
                        {{ userInfo.hobby }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-magic-stick"></i>
                            个性签名
                        </template>
                        {{ userInfo.design }}
                    </el-descriptions-item>
                    <!-- <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-date"></i>
                            注册日期
                        </template>
                        {{ createDate | formatDate }}
                    </el-descriptions-item> -->
                </el-descriptions>
            </el-card>
        </div>
        <!-- 弹出框 -->
        <!-- 简介 -->
        <div>
            <el-dialog title="修改个人信息" :visible.sync="dialogVisible.show" width="60%" :before-close="handleClose">
                <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                    <div class="updateinfo">
                        <div class="left">
                            <el-form-item label="头像" prop="avatar">
                                <Upload :show-upload-list="false" :format="['jpg', 'png']" :max-size="10000" multiple
                                    type="drag" action="http://localhost:3000/api/admin/upload/poster"
                                    :on-success="handleMusicPoster" style="display: block; width: 44px">
                                    <span style="float: left">
                                        <Avatar :src="siteSrc" size="large" />
                                    </span>
                                </Upload>
                            </el-form-item>
                            <el-form-item label="账号密码" prop="password" :v-show="false">
                                <el-input v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称" prop="nickname">
                                <el-input v-model="form.nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄" prop="age">
                                <el-input v-model="form.age"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="sex">
                                <el-switch v-model="form.sex" active-color="#13ce66" inactive-color="#ff4949"
                                    active-text="男" inactive-text="女" :active-value="1" :inactive-value="0">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>

                        </div>
                        <div class="right">
                            <el-form-item label="用户编号" prop="id">
                                <el-input v-model="form.id"></el-input>
                            </el-form-item>
                            <el-form-item label="账号" prop="account">
                                <el-input v-model="form.account"></el-input>
                            </el-form-item>
                            <el-form-item label="地区" prop="area">
                                <el-input v-model="form.area"></el-input>
                            </el-form-item>
                            <el-form-item label="兴趣爱好" prop="hobby">
                                <el-input v-model="form.hobby"></el-input>
                            </el-form-item>
                            <el-form-item label="职业" prop="work">
                                <el-input v-model="form.work"></el-input>
                            </el-form-item>
                            <el-form-item label="个性签名" prop="design">
                                <el-input v-model="form.design"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="mobilePhoneNumber">
                                <el-input v-model="form.mobilePhoneNumber"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="editSite('form')">提 交</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>
<script>
import Logo from '../assets/logo.png'
export default {
    data() {
        return {
            siteSrc: Logo,

            form: {
                avatar: '',
                password: '',
                nickname: '',
                age: '',
                email: "",
                mobilePhoneNumber: "",
                sex: '',
                id: '',
                account: "",
                area: "",
                hobby: "",
                work: "",
                design: "",
                poster: '',
            },

            dialogVisible: {
                title: "添加场地",
                show: false
            },

            rules: {
                nickname: [
                    { required: true, message: "昵称不能为空", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "账号密码不能为空", trigger: "blur" },
                ],
            },
            account: String,
            age: Number,
            email: String,
            mobilePhoneNumber: String,
            area: String,
            createDate: Number,
            nickname: String,
            sex: String,
            work: String,
            hobby: String,
            design: String,

        }
    },
    computed: {
        userInfo: function () {
            return this.$store.state.userStore.userInfo
        }
    },
    created() {
        this.getAllmsg()
    },
    methods: {
        // 获取信息
        getAllmsg() {
            console.log('this.$store.state.userStore.userInfo=>', this.$store.state.userStore.userInfo)
            const item = {
                email: this.$store.state.userStore.userInfo.email
            }
            this.$axios.post('http://localhost:3000/api/useradmin/allpersonmsg', item)
                .then(res => {
                    console.log('获取到的所有的信息res=>', res)
                    this.form = res.data.result
                    this.$store.dispatch('setUserInfo', res.data.result)
                })


        },

        // 对话框弹出
        showAddSiteBtn() {
            this.dialogVisible.show = true
        },
        //展示编辑信息的对话框
        showEditDialog(obj) {
            this.dialogVisible.show = true
            console.log("当前场地信息=>", obj);
            this.form = { ...obj }
        },
        editSite(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 调用接口，编辑个人中心
                    this.$axios.post('http://localhost:3000/api/useradmin/editmsg', {
                        avatar: this.form.avatar,
                        password: this.form.password,
                        nickname: this.form.nickname,
                        age: this.form.age,
                        email: this.form.email,
                        mobilePhoneNumber: this.form.mobilePhoneNumber,
                        sex: this.form.sex,
                        id: this.form.id,
                        account: this.form.account,
                        area: this.form.area,
                        hobby: this.form.hobby,
                        work: this.form.work,
                        design: this.form.design,
                        poster: this.form.poster,
                        _id: this.form._id,
                        username: this.userInfo.username
                    }).then(res => {
                        this.$message.success('修改个人信息成功！');
                        // 隐藏修改用户的对话框
                        // console.log(this.editDialog)
                        this.dialogVisible.show = false;
                        //重新获取用户列表数据
                        this.getAllmsg()
                    }).catch(err => {
                        console.log('修改个人信息失败err=>', err)
                    })
                } else {
                    console.log('编辑个人信息验证未通过')
                }
            })
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
        // submit() {
        // updateUser(this.form)
        //     .then((res) => {
        //         console.log(res);
        //         this.dialogVisible = false;
        //         this.$emit("flesh");
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // },
        handleClose() {
            this.dialogVisible = false;
            // this.$emit("flesh");
        },
        //场地封面上传完成之后的回调
        handleMusicPoster(res) {
            console.log('场地封面上传完成之后：res=>', res)
            this.form.poster = res.result.poster
            this.siteSrc = 'http://localhost:3000/api/user/poster?img=' + this.form.poster

        },

    },
    components: {


    }
}
</script>



<style lang="less" scoped>
.img {
    width: 80px;
    height: 80px;
}

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
