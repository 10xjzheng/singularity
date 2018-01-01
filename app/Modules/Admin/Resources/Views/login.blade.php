<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>manage-system</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <link href="//cdn.bootcss.com/element-ui/1.4.6/theme-default/index.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/main.css">
    <style>
        .login-wrap{
            position: relative;
            width:100%;
            height:100%;
            background: url(/img/login.png) no-repeat;
            background-size: 100% 100%;
        }
        .ms-login{
            width:400px;
            border-radius: 5px;
            background: #fff;
            position:absolute;
            top:40%;
            right: 10%;
             -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
        }
        .login-wrap .el-tabs__nav{
            width:100%;
        }
        .el-tabs__item{
            background:#e3e3df;
            color:#323232;
            font-size: 16px;
        }
        .login-wrap .el-tabs__item{
            width:100%;
        }
        .login-wrap .is-active{
            color:#2856b6;
        }
        .login-btn{
            width: 100%;
            background-color: #2856b6;
            border-color: #2856b6;
        }
        .login-btn:focus,.login-btn:hover{
            background-color: #2856b6;
            border-color: #2856b6;
            color: #fff;
        }
        .login-btn button{
            width:100%;
            height:36px;
        }
        .pt20{
            padding-top: 20px;
        }
        .forget-pass{
            color:#aaa;
            font-size: 14px;
            margin-top: -14px;
            padding-bottom: 20px;
        }
        .qr-code{
            background-color: #d9edf7;
            border-color: #bce8f1;
        }
        .qr-code img{
            width: 310px;
        }
        .login-a{
            color:#aaa;
            font-size: 14px;
        }
    </style>
</head>
<body>
<div id="app">
    <div class="login-wrap" v-loading.body="loading"  element-loading-text="登录中">
        <el-tabs type="border-card" class="ms-login tc">
          <el-tab-pane label="电脑登录" class="p20">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                  <el-form-item label="　">
                    <el-button type="primary" @click="submitForm('ruleForm')" class="r login-btn">登录</el-button>
                  </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
    </div>
</div>
</body>
<script src="/js/vue.js"></script>
<script src="/js/vue-router.js"></script>
<script src="/js/underscore.js"></script>
<script src="//cdn.bootcss.com/axios/0.16.1/axios.min.js"></script>
<script src="//cdn.bootcss.com/element-ui/1.4.0/index.js"></script>
<script src="/js/require.js"></script>
<script>

    var vm = new Vue({
        el:'#app',
        data:{
            loading:false,
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        },
        methods: {
            submitForm :function(formName) {
                var self = this;
                self.$refs[formName].validate(function (valid) {
                    if (valid) {
                        self.loading = true;
                        axios.post('/admin/login',{username:self.ruleForm.username,password:self.ruleForm.password})
                            .then(function (data) {
                                data = data.data;
                                if(data.errorCode == 0 ){
                                    location.replace('/admin/site')
                                }else {
                                    self.$message.error(data.errorInfo);
                                }
                                self.loading = false;
                            })
                    }
                });
            }
        }
    })
</script>
</html>
