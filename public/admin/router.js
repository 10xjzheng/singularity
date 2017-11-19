/**
 * Created by Administrator on 2017/4/17.
 */
define(function () {

    return [{
        path: '/', //首页
        templateUrl: "/admin/index/index.html",
        controllerUrl: "/admin/index/index.js"
    },{
        path: '/apply', //申请管理
        templateUrl: "/admin/apply/index.html",
        controllerUrl: "/admin/apply/index.js"
    },{
        path: '/join', //加盟管理
        templateUrl: "/admin/join/index.html",
        controllerUrl: "/admin/join/index.js"
    },{
        path: '/news', //加盟管理
        templateUrl: "/admin/news/index.html",
        controllerUrl: "/admin/news/index.js"
    },{
        path: '/company', //加盟管理
        templateUrl: "/admin/company/index.html",
        controllerUrl: "/admin/company/index.js"
    },{
        path: '/admins', //加盟管理
        templateUrl: "/admin/admins/index.html",
        controllerUrl: "/admin/admins/index.js"
    }]
})