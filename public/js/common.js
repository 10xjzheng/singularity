/**
 * Created by Administrator on 2017/3/31.
 * 公共方法
 */
(function() {
    Array.prototype.pushArray = function(arr) {
        return this.push.apply(this, arr)
    }
    var _Permissions = {},
        _p = { sets: {}, moduleId: '', manageRange: [] };
    var IS_IPHONE_WECHART = /ip(hone|od|ad)/i.test(navigator.userAgent) && /MicroMessenger/.test(navigator.userAgent);
    //权限模块组件
    var ModuleComponent = {
        computed: {
            documentTitle: {
                get: function() {
                    return document.title;
                },
                set: function(title) {

                    if (IS_IPHONE_WECHART) {
                        var $body = document.body;
                        document.title = title || ' ';
                        var $iframe = document.createElement('iframe');
                        $iframe.style.visibility = 'hidden';
                        $iframe.src = '/favicon.ico';
                        $iframe.onload = function() {
                            setTimeout(function() {
                                $iframe.onload = function() {};
                                $body.removeChild($iframe);
                            }, 0)
                        };
                        $body.appendChild($iframe);
                    } else {
                        document.title = title || ' ';
                    }
                }
            },
            $module:function () {

                return getPermissions(this.$route.fullPath,this.$route.meta.parent || '');
            },
            $moduleId: {
                get: function () {
                    var moduleId = '';
                    if (this.$module) {
                        moduleId = this.$module.moduleId;
                    } else if (this.$parent && this.$parent.$module) {
                        moduleId = this.$parent.$module.moduleId;
                    }
                    return moduleId;
                }
            },
            _sets: function () {
                //获取操作集合
                var sets = {};
                if (this.$module) {
                    sets = this.$module.sets;
                } else if (this.$parent && this.$parent.$module) {
                    sets = this.$parent.$module.sets;
                }
                return sets;
            }
        },
        methods: {
            /**
             * 添加默认图片显示
             */
            $imgErr: function (e) {
                e.target.src = ($resHost || $host) + '/img/def.jpg';
            },
            /**
             *
             * @param marking
             * @returns {boolean}
             */
            getModuleRight: function (marking) {

                return this._sets && this._sets.hasOwnProperty(marking);
            },
            /**
             * 添加模块id 和操作标识 用于权限管理
             * @param param 需要添加模块id 和操作标识的参数对象 可以没有
             * @param marking 操作标识
             * @returns {*}
             */
            parseParam: function (param, marking) {
                var $param, _set = this._sets || {};
                if (typeof param === 'string') {
                    $param = {};
                    marking = param
                } else if (typeof param === 'object') {
                    $param = param;
                }
                $param.cModuleId = this.$moduleId || '';
                $param.cSetsId = _set[marking] || '';
                return $param;
            }
        },
        filters: {
            textHtml: function (text) {
                return (text || '').replace(/(\n\r?)/g, '<br>').replace(/\s/g, '&nbsp;');
            }
        }
    };
    /**
     * 获取权限对象
     * @param fullPath
     * @param parent
     * @returns {*}
     */
    function getPermissions(fullPath,parent) {
        var hasP;
        parent = parent || '';
        if(_Permissions.hasOwnProperty(fullPath)){
            return _Permissions[fullPath];
        }
        //先判断全路径
        _.each((window.$Permissions ? $Permissions : []), function(p) {

            if(~p.webHash.indexOf(parent)){
                //部分匹配
                if(~fullPath.indexOf(p.webHash)){
                    hasP = p;
                }
                if(fullPath === p.webHash){
                    hasP = p;
                }
            }
        });
        _Permissions[fullPath] = hasP || {};
        return hasP || {};
    }

    /**
     * 处理普通路由
     * @param route
     * @param meta 元信息
     * @returns {{path: *, component: component}}
     */
    function parseRoute(route, meta) {
        //普通路由
        /**
         * 添加onEnter
         *     onRender
         *     onLeave
         */
        return {
            path: route.path,
            meta:meta || {},
            component: function(resolve, reject) {
                require(['text!' + route.templateUrl, 'js!' + route.controllerUrl], function(html, component) {

                    resolve(_.extend({
                        template:html,
                        beforeRouteEnter:function(to, from, next) {
                            next(function(vm) {
                                if (_.isFunction(vm.onEnter)) {

                                    vm.onEnter(to.params, to.query);

                                }
                            })
                        },
                        beforeRouteUpdate:function(to, from, next) {
                            //处理模块id
                            this.$moduleId = to.params.moduleId || '';
                            if (_.isFunction(this.onEnter)) {
                                this.onEnter(to.params, to.query);
                            }
                            next(true);
                        },
                        beforeRouteLeave:function(to, from, next) {
                            $APP && ($APP.loading = true);
                            if (_.isFunction(this.onLeave)) {
                                this.onLeave(to.params, to.query);
                            }
                            next(true);
                        }
                    },component,{mixins:[ModuleComponent].concat(component.mixins || [])}));
                })
            }
        }
    }

    function parseComponentPath(vm,path,childrenMap) {

        //判断是哪个组件
        var componentsName = '',
            path = path || '',
            params = {},
            query = {},
            match,
            keys,
            currentRoute = '';
        _.each(childrenMap, function (map, key) {
            match = path.match(map.regExp);
            if (match) {
                currentRoute = key;
                keys = map.keys;
                for (var i = 1, len = match.length; i < len; ++i) {
                    var key = keys[i - 1];
                    var val = typeof match[i] === 'string' ? decodeURIComponent(match[i]) : match[i];
                    if (key) {
                        params[key.name] = val;
                    }
                }
                vm.$params = params;
                return false;
            }
        })
        if(vm.currentRoute === currentRoute){
            for(var c = 0;c < vm.$children.length; c++){
                if(vm.$children[c].$options._componentTag === currentRoute && !(('ontouchend' in document) || ~navigator.userAgent.indexOf('MicroMessenger')) ){
                   vm.$children[c].onEnter && vm.$children[c].onEnter(params)
                    break;
                }
            }
        }
        vm.currentRoute = currentRoute;

        return currentRoute;
    }
    /**
     * 处理子路由请求
     * @param route
     * @param parent
     * @returns {{path, component: component}}
     */
    function parseRouter(route, parent) {
        //处理路由请求
        var path = route.path;
        //parent = parent;
        if(route.component){
            return route;
        }
        return {
            path: path,
            meta:{parent:parent},
            component: function(resolve, reject) {

                require(['js!' + route.controllerUrl], function(routes) {
                    // var parentRouter = {
                    //     path: parent.replace(/\/$/,''),
                    //     component:{mixins:[ModuleComponent],template: '<router-view></router-view>'},
                    //     children:_.map(routes, function(route) {
                    //         return parseRoute(route,{parent:parent})
                    //     })
                    // };
                    var childrenComponents =  {},
                        childrenMap = {},
                        prefix = 'CC',
                        template = (('ontouchend' in document) || ~navigator.userAgent.indexOf('MicroMessenger'))?'<keep-alive><component :is="currentRoute"></component></keep-alive>' : '<component :is="currentRoute"></component>';
                    //解析子组件路径
                    _.each(routes,function (route) {
                        route.pathReg = routeParsePath(route.path)
                        childrenComponents[prefix+route.path] = parseRouteCompontent(route);
                        var keys = [],regExp = routeParsePath(route.path,keys);
                        childrenMap[prefix+route.path] = {
                            keys:keys,
                            regExp:regExp
                        }
                    })
                    //$router.unshiftRoutes([parentRouter,{ path: parent, redirect: parent+'index' }]);

                    resolve({
                        template: template,
                        data:function(){ return {
                            currentRoute:'',
                            $params:{},
                            $query:{}
                        }},
                        components:childrenComponents,
                        beforeRouteEnter:function (to, from, next) {

                            next(function(vm) {
                                //判断是哪个组件
                                parseComponentPath(vm,to.params[0] || '/',childrenMap);

                            })

                        },
                        deactivated:function () {
                            this.currentRoute = '';
                        },
                        beforeRouteUpdate :function (to, from, next) {
                            //处理模块id
                            var vm = this,currentRoute;

                            currentRoute = parseComponentPath(this,to.params[0] || '',childrenMap);

                            next(true);

                        }
                    });
                })
            }
        }
    }
    /**
     * 解析动态路由组件
     * @param route
     */
    function parseRouteCompontent(route) {
        return function(resolve, reject) {

            require(['text!' + route.templateUrl, 'js!' + route.controllerUrl], function(html, component) {

                var isInit = false;
                resolve(_.extend({
                    template:html
                },component,{mixins:[ModuleComponent,{
                    created:function () {
                        if(!( (('ontouchend' in document) || ~navigator.userAgent.indexOf('MicroMessenger') ))){
                            this.$nextTick(function () {
                                this.onEnter && this.onEnter(this.$parent.$params)
                            })
                        }
                    },
                    activated:function () {
                        this.onEnter && this.onEnter(this.$parent.$params)
                    },
                    deactivated:function () {
                        this.onLeave && this.onLeave()
                    }
                }].concat(component.mixins || [])}))
            });
        }
    }
    /**
     * 解析动态组件
     * @param route
     */
    function parseCompontent(route) {
        return function(resolve, reject) {

            require(['text!' + route.templateUrl, 'js!' + route.controllerUrl], function(html, component) {

                resolve(_.extend({
                    template:html
                },component,{
                    mixins:[ModuleComponent,{

                        mounted: function() {

                            if (_.isFunction(this.onEnter)) {
                                this.onEnter(this.$route.params, this.$route.query);
                            }
                        }
                    }].concat(component.mixins || [])
                }))
            });
        }
    }

    /**
     * 生成部门选择option
     * @param space
     * @param children
     * @returns {*}
     */
    function createOption(space, children,pName,pid,path) {

        space++;
        var spaceHtml = Array(space + 1).join('&#12288;'),
            options,
            p = path || [];

        options = _.map(children, function(dep) {
            var childrenHtml = [],parentId = (pid || []).concat(dep.id);
            if (dep.children.length) {
                p.push(dep.name)
                childrenHtml = createOption(space, dep.children,dep.name,parentId,p);
            }
            return [{ id: dep.id, name: dep.name,level:space, space: spaceHtml,pName:pName|| '',pid: pid|| [],path:(path || []).join('/') }].concat(childrenHtml);
        })
        return _.flatten(options, true)
    }
    /**
     * js中国标准时间转换成datetime格式
     * @param time
     * @param format    yyyy-MM-dd
     * @returns {*}
     */
    function formatDate(time, format) {
        var t;
        if (time instanceof Date) {
            t = time;
        } else if(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(time)){
            t = new Date(time);
        }else{
            if (!parseInt(time, 10)) { return time }
            t = new Date(parseInt(time, 10))
        }
        var tf = function(i) { return (i < 10 ? '0' : '') + i };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        });
    }



    /**
     * 根据省市区 id 获取 省市区名称
     * @param data
     * @parma id
     * @returns {*}
     */
    function areaName(data, id) {
        var name = '';
        _.each(data, function(list) {
            if (list.id == id) {
                name = list.name;
                return;
            } else {
                _.each(list.list, function(city) {
                    if (city.id == id) {
                        name = city.name;
                        return;
                    } else {
                        _.each(city.list, function(area) {
                            if (area.id == id) {
                                name = area.name;
                                return;
                            }
                        })
                    }
                })
            }
        });
        return name;
    }



    var DescartesUtils = {

        /**
         * 如果传入的参数只有一个数组，求笛卡尔积结果
         * @param arr1 一维数组
         * @returns {Array}
         */
        descartes1: function(arr1) {
            // 返回结果，是一个二维数组
            var result = [];
            var i = 0;
            for (i = 0; i < arr1.length; i++) {
                var item1 = arr1[i];
                result.push([item1]);
            }
            return result;
        },

        /**
         * 如果传入的参数只有两个数组，求笛卡尔积结果
         * @param arr1 一维数组
         * @param arr2 一维数组
         * @returns {Array}
         */
        descartes2: function(arr1, arr2) {
            // 返回结果，是一个二维数组
            var result = [];
            var i = 0,
                j = 0;
            for (i = 0; i < arr1.length; i++) {
                var item1 = arr1[i];
                for (j = 0; j < arr2.length; j++) {
                    var item2 = arr2[j];
                    result.push([item1, item2]);
                }
            }
            return result;
        },

        /**
         *
         * @param arr2D 二维数组
         * @param arr1D 一维数组
         * @returns {Array}
         */
        descartes2DAnd1D: function(arr2D, arr1D) {
            var i = 0,
                j = 0;
            // 返回结果，是一个二维数组
            var result = [];

            for (i = 0; i < arr2D.length; i++) {
                var arrOf2D = arr2D[i];
                for (j = 0; j < arr1D.length; j++) {
                    var item1D = arr1D[j];
                    result.push(arrOf2D.concat(item1D));
                }
            }

            return result;
        },

        descartes3: function(list) {
            var listLength = list.length;
            var i = 0,
                j = 0;
            // 返回结果，是一个二维数组
            var result = [];
            // 为了便于观察，采用这种顺序
            var arr2D = DescartesUtils.descartes2(list[0], list[1]);
            for (i = 2; i < listLength; i++) {
                var arrOfList = list[i];
                arr2D = DescartesUtils.descartes2DAnd1D(arr2D, arrOfList);
            }
            return arr2D;
        },

        //笛卡儿积组合
        descartes: function(list) {
            if (!list) {
                return [];
            }
            if (list.length <= 0) {
                return [];
            }
            if (list.length == 1) {
                return DescartesUtils.descartes1(list[0]);
            }
            if (list.length == 2) {
                return DescartesUtils.descartes2(list[0], list[1]);
            }
            if (list.length >= 3) {
                return DescartesUtils.descartes3(list);
            }
        }

    };
    var wxReady = false;
    function wxConfig(wx,config) {
            var _res,_rej,
                promise = new Promise(function (resolve, reject) {
                    _res = resolve;
                    _rej = reject;
                })
            wx.config(_.extend(config,{
                debug:false,
                jsApiList:[
                    'closeWindow',
                    'onMenuShareTimeline','onMenuShareAppMessage',
                    'chooseImage','uploadImage','downloadImage','previewImage',
                    'hideOptionMenu','showOptionMenu',
                    'openLocation','getLocation',
                    'scanQRCode',
                    'startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice'
                ]
            }))
            wx.ready(function () {
                wxReady = true;

                _res(wx)
            })
            wx.error(function(error){
                _rej(error)
            });
            if(~navigator.userAgent.indexOf('MicroMessenger')){
                setTimeout(function () {
                    if(!wxReady){
                        console.log(1)
                        _rej()
                    }
                },500)
            }
            return promise.then(_.noop,function () {
                return wxConfig(wx,config);
            });
    }

    /**
     * 合并路由
     * @param orRoutes 初始路由
     * @param tarRoutes 定制路由
     */
    function extendRoute(orRoutes, tarRoutes) {
        var paths = _.map(tarRoutes,function (route) {
            return route.path;
        })
        return tarRoutes.concat(_.filter(orRoutes,function (route) {
            return !~paths.indexOf(route.path);
        }))
    }

    window.$combine = DescartesUtils.descartes;

    window.$parseRoute = parseRoute;
    window.$parseRouter = parseRouter;
    window.$parseCompontent = parseCompontent;
    window.$createOption = createOption;
    window.$formatDate = formatDate;
    window.$areaName = areaName;
    window.$getPermissions = getPermissions;
    window.$wxConfig = wxConfig;
    window.$extendRoute = extendRoute;
    window.$isMobileWechat = !!!(!~navigator.userAgent.indexOf('MicroMessenger') || /*不在微信里面*/ ~navigator.userAgent.indexOf('WindowsWechat') || /*微信客户端*/ ~navigator.userAgent.indexOf('wechatdevtools') /*微信调试工具*/);


    window.$getMenu = function (menu) {
        var pids = [],webHash = (window.$Permissions ? $Permissions : []).map(function (p) {
            return p.webHash;
        });
        //处理最下级 模块路径
        menu.forEach(function set(m) {
            m.visible = false;
            if(m.child.length){
                m.child.forEach(set);
            }else{
                m.visible = !!~webHash.indexOf(m.webHash);
                m.webHash = m.webHash+m.orgWebHash;
            }
        })
        function traverse(node) {
                    var childNodes = node.child ? node.child : node;

                    childNodes.forEach(function(child){

                        traverse(child);
                    });

                    if (!node.visible && childNodes.length) {
                        var allHidden = true;

                        childNodes.forEach(function(child){
                            if (child.visible){ allHidden = false}
                        });
                        node.visible = allHidden === false;
                    }
                }

        traverse({child:menu});
        return menu;
    }
})();


