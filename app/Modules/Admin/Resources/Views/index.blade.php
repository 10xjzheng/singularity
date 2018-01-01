<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>奇点金服后台管理系统</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <link rel="stylesheet" href="//cdn.bootcss.com/element-ui/1.4.0/theme-default/index.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/main.css">
    <script src="/js/common.js"></script>
</head>
<body>
<div id="app" v-loading.body="loading"  element-loading-text="拼命加载中">
    <div class="wrapper">
        <div class="header">
            <div class="logo">奇点金服管理系统</div>
            <div class="user-info">
                <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="/img/img.jpg">
                    @{{ username }}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="sidebar">
            <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-menu"></i>申请管理</template>
                    <el-menu-item index="apply">申请列表</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-date"></i>资讯管理</template>
                    <el-menu-item index="news">资讯列表</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-star-on"></i>系统配置</template>
                    <el-menu-item index="company">公司介绍</el-menu-item>
                    <!---<el-menu-item index="admins">管理员设置</el-menu-item>-->
                </el-submenu>
            </el-menu>
        </div>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</div>
</body>
<script src="/js/vue.js"></script>
<script src="/js/vue-router.js"></script>
<script src="/js/underscore.js"></script>
<script src="//cdn.bootcss.com/axios/0.16.1/axios.min.js"></script>
<script src="//cdn.bootcss.com/element-ui/1.4.0/index.js"></script>
<script src="/js/require.js"></script>
<script type="text/javascript">
    var $host = location.protocol+'//'+location.host;
    require.config({
        baseUrl: $host
    });
    require([$host+'/admin/router.js'],function (routes) {


        var openLoading = function (config) {
                    $APP.loading = true;
                    return config;
                },
                closeLoading = function (error) {
                    $APP.loading = false;
                    return Promise.reject(error);
                },logout = function (data) {
                    if(data.errCode == 10032){
                        return location.href = '/#/'+location.search
                    }
                };
        var $postData = axios.create();
        var $getData = axios.create();
        $postData.interceptors.request.use(openLoading,closeLoading);
        $postData.interceptors.response.use(function (response) {logout(response.data);$APP.loading = false;return response.data;},closeLoading);
        $getData.interceptors.response.use(function (response) {logout(response.data);return response.data;},closeLoading);

        var router = new VueRouter({
            routes:_.map(routes,function (route) {
                if(route.isRouter){
                    return $parseRouter(route,route.isRouter);
                }else{
                    return $parseRoute(route);
                }
            })
        });
        router.beforeEach(function (to, from, next) {
            if(APP){APP.loading = true;}
            next();
        });
        router.afterEach(function () {
            if(APP){APP.loading = false;}
        });

        var APP = new Vue({
            el:'#app',
            router:router,
            data:{
                loading:false,
                name: 'linxin'
            },
            computed:{
                username :function(){
                    var username = localStorage.getItem('ms_username');
                    return username ? username : this.name;
                },
                onRoutes:function () {
                    return this.$route.path.replace('/','');
                }
            },
            methods: {
                handleCommand:function (command) {
                    if(command == 'loginout'){
                        $postData('/login/logout')
                                .then(function (data) {
                                    location.replace('/');
                                })
                    }
                }
            }
        })

        window.$router = router;
        window.$APP = APP;
        window.$postData = $postData.post;
        window.$getData = $getData.post;
    })
</script>
</html>