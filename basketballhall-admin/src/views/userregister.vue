<template>
    <div id="login_box">

        <div class="formBox">

            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm"
                label-position="top">
                <!-- 进度条 -->
                <!-- <Progress :percent="45" status="active" /> -->
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="ruleForm.email" autocomplete="on" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="on" placeholder="请输入密码"
                        show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.nextpass" autocomplete="on" placeholder="请再次输入密码"
                        show-password></el-input>
                </el-form-item>

                <el-form-item label="验证码" prop="capchar">
                    <div class="cap-box">
                        <el-input v-model="ruleForm.capchar" autocomplete="off" placeholder="请输入验证码"
                            class="input-cap"></el-input>
                        <div class="cap_img">
                            <img :src="captchaSrc" alt="" @click="refreshCaptcha">
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">点击注册</el-button>

                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import jwtDecode from 'jwt-decode'
export default {
    name: 'UserLogin',
    data() {
        const validateCapchar = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else {

                callback();
            }
        };
        return {
            ruleForm: {
                email: '',
                pass: '',
                capchar: '',
                nextpass: '',
            },
            rules: {
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 20, message: '密码长度必须为6-8', trigger: 'blur' }
                ],
                nextpass: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 20, message: '密码长度必须为6-8', trigger: 'blur' }
                ],
                capchar: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                    { validate: validateCapchar, trigger: 'blur' }
                ]
            },
            captchaSrc: 'http://localhost:3000/api/safecode'
        }
    },
    methods: {
        // 提交按钮
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 判断验证码
                    if (this.ruleForm.capchar.toLowerCase() === this.getCookie('captcha')) {
                        if (this.ruleForm.pass === this.ruleForm.nextpass) {
                            this.$axios.post('http://localhost:3000/api/useradmin/account/userregister', this.ruleForm).then(res => {
                                if (res) {

                                    this.$Message.success('注册成功')
                                    // 跳转到登录页面
                                    this.$router.push('/userlogin')
                                }
                            }).catch(err => {
                                console.error('error', err.message);
                            })

                        }
                        else {
                            //用viewui使用弹出框
                            this.$Modal.confirm({
                                title: '错误',
                                content: '两次密码输入不一致错误',
                                type: 'error',
                                onOk: () => {

                                }
                            })

                        }
                    } else {
                        //用viewui使用弹出框
                        this.$Modal.confirm({
                            title: '错误',
                            content: '验证码错误',
                            type: 'error',
                            onOk: () => {

                            }
                        })
                    }
                }

            });
        },
        // 获取验证码cookie
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        // 重置按钮
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 刷新验证吗
        refreshCaptcha() {
            this.captchaSrc = 'http://localhost:3000/api/safecode?d=' + Math.random()
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
<style scoped lang="less">
#login_box {
    height: 100%;
    background-image: url('https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d1a20cf431adcbef6df30761a0af2edda2cc9f95.jpg');
    background-size: cover;
    background-position: 50% 70%;
    min-width: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;

}

.formBox {
    background-color: white;
    border-radius: 10px;
    width: 500px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cap-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .input-cap {
        width: 60%;
    }

    .cap_img {
        width: 80px;

        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

}
</style>
  
  