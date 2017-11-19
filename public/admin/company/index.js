/**
 * Created by Administrator on 2017/3/31.
 * 人员管理列表
 */
define(['js!/src/components/areas.js','css!/src/backend/oa/administer/index.css','js!/src/components/xjkSelect/index.js'],function (areas) {
    var oaAdminister = 'oaAdminister';
        /* 人员管理 - 列表
            获取人员列表	backend/employee/employee-list
            获取某个架构ID下的组织架构	backend/employee/get-organization
            获取机构下职位列表	backend/employee/get-position-list
            正式档案详情	backend/employee/archive-detail
            身份证号码验证	backend/employee/verify-id-card
       */
    var vm ;
    return {
        data:function () {
            return {
                checkVal:true,
                options: [
                    {
                        value: '1',
                        label: '姓名'
                    }, {
                        value: '2',
                        label: '手机号'
                    }, {
                        value: '3',
                        label: '身份证号'
                    }
                ],
                value:'1',
                value6: '',
                fileDialog:false,
                fileListData:[],
                fileListData1:[],
                fileListData2:[],
                fileListData3:[],
                fileListData4:[],
                fileListData5:[],
                objData:{
                    employeeId :'',
                    type:4,
                    name:'',
                    id:''
                },
                nations: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛难族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "崩龙族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"],
                status:'2',
                list:[],
                currentQuery:'',//搜索
                selectOrgs:[],
                employeeId:'',
                listposition:[],//职位列表
                studyForm:{
                    "beginTime":"",
                    "endTime":"",
                    "instruction":"",
                    "item":"",
                    "level":"",
                    "education":"",
                    "degree":"",
                    "remark":""
                },
                taskData:{
                    "beginTime":"",
                    "endTime":"",
                    "instruction":"",
                    "item":"",
                    "level":"",
                    "education":"",
                    "degree":"",
                    "remark":""
                },
                trainForm:{
                    "beginTime":"",
                    "endTime":"",
                    "instruction":"",
                    "item":"",
                    "level":"",
                    "education":"",
                    "degree":"",
                    "remark":""
                },
                winingForm:{
                    "beginTime":"",
                    "instruction":"",
                    "item":"",
                    "level":"",
                    "education":"",
                    "degree":"",
                    "remark":""
                },
                detailList:{
                    orgId:'', //机构ID
                    positionId:'', //职位ID
                    avatar:'', //登记照
                    name:'', //姓名
                    sex:'', //性别[1=男],[2=女]
                    idCard:'', //身份证
                    residenceType:'', //户籍类型
                    residenceProvince:'', //籍贯省份
                    residenceCity:'', //户籍城市
                    residenceAddress:'', //籍贯地址
                    province:'', //省份
                    city:'', //城市
                    area:'', //区
                    address:'', //常住地址
                    nation:'', //民族
                    marriage:'', //婚姻
                    politicalStatus:'', //政治面貌
                    education:'', //学历
                    degree:'', //学位
                    major:'', //专业
                    email:'', //邮箱
                    mobile:'', //手机号
                    wechat:'', //微信号
                    entryDate:'', //入职日期
                    positiveDate:'', //转正日期
                    workingAge:'', //司龄
                    contractDate:'', //合同日期
                    contractYears:'', //合同期限
                    probationWage:'', //试用期工资
                    wage:'', //转正工资
                    linkMan:'', //紧急联系人
                    linkPhone:'', //紧急联系电话
                    relation:'', //关系
                    birthday:''
                },
                studyList:[],
                workList:[],
                trainList:[],
                winingList:[],
                birthday:'',//出生日期
                sex:'',
                pageInfo:{
                    total:0,
                    pageSize:10,
                    currentPage:1
                },
                orgId:'',
                dialogTitle:'基本信息',
                toggleDialog :false, //新增
                editToggleDialog :false, //修改
                lookToggleDialog :false, //查看
                eduToggleDialog: false,//编辑教育
                jobToggleDialog: false,//编辑工作
                trainToggleDialog: false,//编辑培训经历
                winningToggleDialog: false,//编辑获奖经历
                nameActive:'first',
                areas:areas,
                areasProps:{
                    value: 'id',
                    label: 'name',
                    children: 'list'
                },
                form:{
                    addresser:[],
                    orgId:'', //机构ID
                    positionId:'', //职位ID
                    avatar:'', //登记照
                    name:'', //姓名
                    sex:'', //性别[1=男],[2=女]
                    idCard:'', //身份证
                    residenceType:'', //户籍类型
                    residenceProvince:'', //籍贯省份
                    residenceCity:'', //户籍城市
                    residenceAddress:'', //籍贯地址
                    province:'', //省份
                    city:'', //城市
                    area:'', //区
                    address:'', //常住地址
                    nation:'', //民族
                    marriage:'', //婚姻
                    politicalStatus:'', //政治面貌
                    education:'', //学历
                    degree:'', //学位
                    major:'', //专业
                    email:'', //邮箱
                    mobile:'', //手机号
                    wechat:'', //微信号
                    entryDate:'', //入职日期
                    positiveDate:'', //转正日期
                    workingAge:'', //司龄
                    contractDate:'', //合同日期
                    contractYears:'', //合同期限
                    probationWage:'', //试用期工资
                    wage:'', //转正工资
                    linkMan:'', //紧急联系人
                    linkPhone:'', //紧急联系电话
                    relation:'', //关系
                },
                activeName:'oaAdministerJob',
                currentView:'oaAdministerJob',
                nameProvince:'',
                nameCity:'',
                nameArea:'',
                dialogYl:false,
                dialogDatas:{},
                checkType:'',
                rules:{
                    name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    mobile:[
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        {required: true,pattern:/^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
                    ],
                    idCard:[
                        { required: true, message: '请输入身份证号', trigger: 'blur' }
                    ],
                    address:[
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    entryDate:[
                        { type: 'date',required: true, message: '请入职时间', trigger: 'change' }
                    ],
                    orgId:[
                        { required: true, message: '请选择部门', trigger: 'change' }
                    ],
                    positionId:[
                        { required: true, message: '请选择职位', trigger: 'change' }
                    ],
                    linkMan:[
                        { required: true, message: '请输入紧急联系人', trigger: 'blur' }
                    ],
                    linkPhone:[
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        {required: true,pattern:/^1[34578]\d{9}$/, message: '请输入正确的联系人手机号码', trigger: 'blur' }
                    ],
                    relation:[
                        { required: true, message: '请输入紧急联系人关系', trigger: 'blur' }
                    ],
                    beginTime:[
                        { type: 'date',required: true, message: '请输入日期', trigger: 'change' }
                    ],
                    endTime:[
                        { type: 'date',required: true, message: '请输入日期', trigger: 'change' }
                    ],
                    education:[
                        { required: true, message: '请选择学历', trigger: 'change' }
                    ],
                    degree:[
                        { required: true, message: '请选择学位', trigger: 'change' }
                    ],
                    item:[
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    instruction:[
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    level:[
                        { required: true, message: '请输入奖励级别', trigger: 'blur' }
                    ],
                },
                ruleForm:{
                    name:[
                        { required: true, message: '请输入资料名称', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
            /**
             * 省市区选中
             * */
            addresser:{
                get:function () {
                    return [this.detailList.province,this.detailList.city,this.detailList.area];
                },
                set:function (address) {
                    this.detailList.province = address[0];
                    this.detailList.city = address[1];
                    this.detailList.area = address[2];
                }
            }
        },
        methods:{
            onEnter:function (param, query) {
                vm = this;
                this.nameActive = 'first';


                this.getList();
                vm.validateType();
            },
            //搜索
            handleClick :function() {
                vm.getList();
            },
            getList:function (page) {
                var self = this;
                this.pageInfo.currentPage = page || 1;
                var param = {
                    status:vm.status,
                    orgId:vm.orgId,
                    pageSize:this.pageInfo.pageSize,
                    currentPage:page || 1,
                }
                var myregs = /^1[34578]\d{9}$/;
                if(vm.value == '3'){
                    param.idCard = vm.currentQuery;
                }else{
                    if(!myregs.test(vm.currentQuery)) {
                        param.searchName = this.currentQuery;
                        param.mobile = '';
                    }else{
                        param.searchName = '';
                        param.mobile = this.currentQuery;
                    }
                }
                if(vm.value6 != ''){
                    param.beginDate = $formatDate(vm.value6[0],'yyyy-MM-dd');
                    param.endDate = $formatDate(vm.value6[1],'yyyy-MM-dd');
                }
                //@param int selfOrg [1=只查询当前机构下的人员，不包括下级机构],[0=包括下级]
                if(vm.checkVal){
                    param.selfOrg = 0;
                }else{
                    param.selfOrg = 1;
                }
                $getData('/employee/employee-list',this.parseParam(param,oaAdminister))
                    .then(function (data) {
                        if(data.errCode == 0){
                            self.pageInfo.total = parseInt(data.count,10);
                            self.list = data.data || [];
                        }else{
                            vm.$message.error(data.errInfo)
                        }
                    })
            },
            handleCurrentChange:function (currentPage) {
                this.getList(currentPage);
            },
            /**
             * tab 切换
             * */
            tabClick:function(tab, event) {
                var tabName = {'oaAdministerJob':2,'oaAdministerTry':1,'oaAdministerUn':-1};
                vm.status = tabName[tab.name];
                vm.currentQuery = '';
                vm.getList();
              },
            /**
             *上传图片
             **/
            handleAvatarSuccess:function(res, file) {
                vm.form.avatarId = res.data[0].materialId;
                vm.form.avatar = URL.createObjectURL(file.raw);
            },
            editHandleAvatarSuccess:function(res, file) {
                vm.detailList.avatarId = res.data[0].materialId;
                vm.detailList.avatar = URL.createObjectURL(file.raw);
            },
            /*
            * 上传返回函数
            * */
            errorFun:function (err, file, fileList) {
                vm.$message.error('模板格式错误');
            },
            sccessFun:function(response, file, fileList){
                if(response.errCode == 0){
                    vm.$message.success('操作成功');
                }else{
                    vm.$message.error(response.errInfo)
                }
            },
            /**
             * 查看详情
             * */
            lookDetail:function(orgInfo){
                vm.employeeId = orgInfo.id;
                var nameType = {
                    'first':4,
                    'second':0,
                    'third':1,
                    'fourth':2,
                    'fifth':3
                }
                //[0=学习经历],[1=工作经历],[2=培训经历],[3=奖惩情况],[4=基础信息]
                vm.objData.employeeId = vm.employeeId;
                vm.objData.type = nameType[vm.nameActive];
                vm.detailList={
                    orgId:'', //机构ID
                    positionId:'', //职位ID
                    avatar:'', //登记照
                    name:'', //姓名
                    sex:'', //性别[1=男],[2=女]
                    idCard:'', //身份证
                    residenceType:'', //户籍类型
                    residenceProvince:'', //籍贯省份
                    residenceCity:'', //户籍城市
                    residenceAddress:'', //籍贯地址
                    province:'', //省份
                    city:'', //城市
                    area:'', //区
                    address:'', //常住地址
                    nation:'', //民族
                    marriage:'', //婚姻
                    politicalStatus:'', //政治面貌
                    education:'', //学历
                    degree:'', //学位
                    major:'', //专业
                    email:'', //邮箱
                    mobile:'', //手机号
                    wechat:'', //微信号
                    entryDate:'', //入职日期
                    positiveDate:'', //转正日期
                    workingAge:'', //司龄
                    contractDate:'', //合同日期
                    contractYears:'', //合同期限
                    probationWage:'', //试用期工资
                    wage:'', //转正工资
                    linkMan:'', //紧急联系人
                    linkPhone:'', //紧急联系电话
                    relation:'', //关系
                    birthday:''
                },
                $getData('/employee/archive-detail',vm.parseParam({employeeId :orgInfo.id},oaAdminister))
                    .then(function (data) {
                        if(data.errCode == 0){
                            _.extend(vm.detailList,data.data || {});
                            if(vm.detailList.sex=='2'){
                                vm.detailList.sex = '女';
                            }else{
                                vm.detailList.sex = '男';
                            }
                            vm.nameProvince = $areaName(areas,data.data.province);
                            vm.nameCity = $areaName(areas,data.data.city);
                            vm.nameArea = $areaName(areas,data.data.area);
                            vm.addresser = [data.data.province,data.data.city,data.data.area];
                            vm.studyList = [];
                            vm.workList = [];
                            vm.trainList = [];
                            vm.winingList = [];
                            _.each(data.data.experience,function(list) {
                                if(list.type == 0){
                                    vm.studyList.push(list);
                                }else if(list.type == 1){
                                    vm.workList.push(list);
                                }else if(list.type == 2){
                                    vm.trainList.push(list);
                                }else if(list.type == 3){
                                    vm.winingList.push(list);
                                }
                            })
                        }else{
                            vm.$message.error(data.errInfo)
                        }
                    })
                vm.lookFujian();
            },
            /**
             * 查看附件
             * **/
            lookFujian:function(){
                axios.all([$getData('/employee/get-files',vm.parseParam({type:4,employeeId:vm.employeeId},oaAdminister)).then(function (data) {
                        return data.data || [];
                    }),$getData('/employee/get-files',vm.parseParam({type:3,employeeId:vm.employeeId},oaAdminister)).then(function (data) {
                        return data.data || [];
                    }),$getData('/employee/get-files',vm.parseParam({type:2,employeeId:vm.employeeId},oaAdminister)).then(function (data) {
                        return data.data || [];
                    }),$getData('/employee/get-files',vm.parseParam({type:1,employeeId:vm.employeeId},oaAdminister)).then(function (data) {
                        return data.data || [];
                    })])
                    .then(function (response) {
                        vm.fileListData1 = response[0];
                        vm.fileListData2 = response[1];
                        vm.fileListData3 = response[2];
                        vm.fileListData4 = response[3];
                    })
            },
            /**
             * @api 获取验证方式
             * @return ['data' => ['validateType' => [0=身份证验证，1=手机号码验证]]]
             */
            validateType:function(){
                $getData('/employee/validate-type',vm.parseParam(oaAdminister))
                    .then(function (data) {
                        if(data.errCode == 0){
                            vm.checkType = data.data.validateType;
                        }else{
                            vm.$message.error(data.errInfo)
                        }
                    })
            },
            /**
             * @api 号码验证
             * @param int type [0=ID card],[1=手机号码]
             * @param string number 身份证号码或手机号码
             */
            cardCheck:function(idCard){
                    $getData('/employee/verify',vm.parseParam({
                        number:idCard,
                        type:0
                    },oaAdminister))
                        .then(function (data) {
                            if(data.errCode == 0){
                                vm.birthday = data.data.birthday;
                                if(data.data.sex == '1'){
                                    vm.sex = '男';
                                }else if(data.data.sex == '2'){
                                    vm.sex = '女'
                                }
                            }else{
                                vm.$message.error(data.errInfo)
                            }
                        })
            },
            pickerOptions0:function (){
              function disabledDate(time) {
                return time.getTime() < Date.now();
              }
            },
            /**
             * 选择部门职位
             */
            change:function(value){
                $getData('/employee/get-position-list',vm.parseParam({orgId :value},oaAdminister))
                    .then(function (data) {
                        if(data.errCode == 0){
                            var detailPositionId = _.find(data.data,function(data){
                                return data.id == vm.detailList.positionId;
                            });
                            if(detailPositionId == undefined){
                                vm.detailList.positionId = '';
                            }
                            vm.listposition = data.data || [];
                            // if(vm.listposition.length == 0){
                            //     vm.detailList.positionId = '';
                            //     vm.form.positionId = '';
                            // }
                        }
                    })
            },
            /**
             * 新增员工
             */
            submitPos:function () {
                this.$refs.form.validate(function (valid){
                    if (valid) {
                        if(vm.form.addresser == ''){
                            vm.$message.error('请填写常住地址')
                            return;
                        }
                        var param = _.extend({},vm.form);
                        var addressVal = vm.form.addresser || [];
                        if(vm.sex=='女'){
                            param.sex = 2;
                        }else{
                            param.sex = 1;
                        }
                        if(vm.form.positiveDate != '' && vm.form.positiveDate != undefined){
                            param.positiveDate = $formatDate(vm.form.positiveDate,'yyyy-MM-dd');
                        }
                        param.entryDate = $formatDate(vm.form.entryDate,'yyyy-MM-dd');
                        if(vm.form.contractDate != '' && vm.form.contractDate != undefined){
                            param.contractDate = $formatDate(vm.form.contractDate,'yyyy-MM-dd');
                        }
                        param.province = addressVal[0] || '';
                        param.city = addressVal[1] || '';
                        param.area = addressVal[2] || '';
                        param.avatar = vm.form.avatarId;
                        $postData('/employee/add-archive-info',vm.parseParam(param,oaAdminister))
                        .then(function (data) {
                            if(data.errCode == 0){
                                vm.$message.success('操作成功');
                                vm.toggleDialog = false;
                                vm.getList(vm.pageInfo.currentPage);
                            }else{
                                vm.$message.error(data.errInfo)
                            }
                        })
                    }
                });
            },
            editSubmit:function (orgInfo,index) {
                vm.editToggleDialog = true;
            },
            /**
             * 修改
             */
            editSubmiter:function(){
                 this.$refs.forms.validate(function (valid){
                    if (valid) {
                        if(vm.detailList.addresser == ''){
                            vm.$message.error('请填写常住地址')
                            return;
                        }

                        var param = _.extend({},vm.detailList);
                        var addressVal = vm.addresser;
                        if(vm.sex=='女'){
                            param.sex = 2;
                        }else{
                            param.sex = 1;
                        }
                        param.employeeId = vm.employeeId;
                        if(vm.detailList.positiveDate != '' && vm.detailList.positiveDate != undefined){
                            param.positiveDate = $formatDate(vm.detailList.positiveDate,'yyyy-MM-dd');
                        }
                        param.entryDate = $formatDate(vm.detailList.entryDate,'yyyy-MM-dd');
                        if(vm.detailList.contractDate != '' && vm.detailList.contractDate != undefined){
                            param.contractDate = $formatDate(vm.detailList.contractDate,'yyyy-MM-dd');
                        }
                        param.province = addressVal[0];
                        param.city = addressVal[1];
                        param.area = addressVal[2];
                        param.avatar = vm.detailList.avatarId;
                        $postData('/employee/edit-archive-info',vm.parseParam(param,oaAdminister))
                            .then(function (data) {
                                if(data.errCode == 0){
                                    vm.$message.success('操作成功');
                                    vm.editToggleDialog = false;
                                    vm.getList(vm.pageInfo.currentPage);
                                }else{
                                    vm.$message.error(data.errInfo)
                                }
                        })
                    }
                });
            },
            /**
             * 新增教育经历
             */
            submitConfirm:function(type){
                // type [0=学习经历],[1=工作经历],[2=培训经历],[3=奖惩情况]
                if(type == 0){
                    var param = _.extend({},vm.studyForm);
                    param.beginTime = $formatDate(vm.studyForm.beginTime,'yyyy-MM-dd');
                    param.endTime = $formatDate(vm.studyForm.endTime,'yyyy-MM-dd');
                    vm.studyList.push(param);
                    vm.eduToggleDialog = false;
                }else if(type == 1){
                    var param = _.extend({},vm.taskData);
                    param.beginTime = $formatDate(vm.taskData.beginTime,'yyyy-MM-dd');
                    param.endTime = $formatDate(vm.taskData.endTime,'yyyy-MM-dd');
                    vm.workList.push(param);
                    vm.jobToggleDialog = false;
                }else if(type == 2){
                    var param = _.extend({},vm.trainForm);
                    param.beginTime = $formatDate(vm.trainForm.beginTime,'yyyy-MM-dd');
                    param.endTime = $formatDate(vm.trainForm.endTime,'yyyy-MM-dd');
                    vm.trainList.push(param);
                    vm.trainToggleDialog = false;
                }else if(type == 3){
                    var param = _.extend({},vm.winingForm);
                    param.beginTime = $formatDate(vm.winingForm.beginTime,'yyyy-MM-dd');
                    vm.winingList.push(param);
                    vm.winningToggleDialog = false;
                }
                vm.addDelStudy(type,1);
            },
            /**
             * 删除教育经历
             */
            delExperience:function (Info,index,type) {
                var msgStr = '';
                if(type == 0){
                        msgStr = '您确认要删除教育经历？';
                    }else if(type == 1){
                        msgStr = '您确认要删除工作履历？';
                    }else if(type == 2){
                        msgStr = '您确认要删除培训经历？';
                    }else if(type == 3){
                        msgStr = '您确认要删除获奖经历？';
                    }
                this.$confirm(msgStr,{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    if(type == 0){
                        vm.studyList.splice(index,1);
                    }else if(type == 1){
                        vm.workList.splice(index,1);
                    }else if(type == 2){
                        vm.trainList.splice(index,1);
                    }else if(type == 3){
                        vm.winingList.splice(index,1);
                    }
                    vm.addDelStudy(type,2);
                }).catch(_.noop)
            },
            /**
             * 新增删除操作
             * @param delAdd   1 添加   2删除
             */
            addDelStudy:function (type,delAdd) {
                    if(type == 0){
                        var arrPush = {
                            employeeId: vm.employeeId,
                            type: 0,
                            experienceList: JSON.stringify(vm.studyList)
                        };
                   }else if(type == 1){
                        var arrPush = {
                            employeeId: vm.employeeId,
                            type: 1,
                            experienceList: JSON.stringify(vm.workList)
                        };
                    }else if(type == 2){
                        var arrPush = {
                            employeeId: vm.employeeId,
                            type: 2,
                            experienceList: JSON.stringify(vm.trainList)
                        };
                    }else if(type == 3){
                        var arrPush = {
                            employeeId: vm.employeeId,
                            type: 3,
                            experienceList: JSON.stringify(vm.winingList)
                        };
                    }
                    if(type==0){
                        //删除
                        if(delAdd ==2){
                            $postData('/employee/save-experience',vm.parseParam(arrPush,oaAdminister))
                                .then(function (data) {
                                    if(data.errCode == 0){
                                        vm.$message.success('操作成功');
                                        vm.studyForm={
                                            "beginTime":"",
                                            "endTime":"",
                                            "instruction":"",
                                            "item":"",
                                            "level":"",
                                            "education":"",
                                            "degree":"",
                                            "remark":""
                                        }
                                        vm.toggleDialog = false;
                                    }else{
                                        vm.$message.error(data.errInfo)
                                    }
                                })
                        }
                        this.$refs.formStudy.validate(function (valid){
                            if (valid) {
                                 $postData('/employee/save-experience',vm.parseParam(arrPush,oaAdminister))
                                .then(function (data) {
                                    if(data.errCode == 0){
                                        vm.$message.success('操作成功');
                                        vm.studyForm={
                                            "beginTime":"",
                                            "endTime":"",
                                            "instruction":"",
                                            "item":"",
                                            "level":"",
                                            "education":"",
                                            "degree":"",
                                            "remark":""
                                        }
                                        vm.toggleDialog = false;
                                    }else{
                                        vm.$message.error(data.errInfo)
                                    }
                                })
                            }else{
                                if(delAdd == 1){
                                    vm.studyList.pop();
                                    vm.eduToggleDialog = true;
                                }
                            }
                        });

                    }else if(type == 1){
                        //删除
                        if(delAdd == 2){
                            $postData('/employee/save-experience',vm.parseParam(arrPush,oaAdminister))
                                .then(function (data) {
                                    if(data.errCode == 0){
                                        vm.$message.success('操作成功');
                                        vm.toggleDialog = false;
                                        vm.taskData = {
                                            "beginTime":"",
                                            "endTime":"",
                                            "instruction":"",
                                            "item":"",
                                            "level":"",
                                            "education":"",
                                            "degree":"",
                                            "remark":""
                                        }
                                    }else{
                                        vm.$message.error(data.errInfo)
                                    }
                                })
                        }
                        this.$refs.formWork.validate(function (valid){
                            if (valid) {
                                 $postData('/employee/save-experience',vm.parseParam(arrPush,oaAdminister))
                                .then(function (data) {
                                    if(data.errCode == 0){
                                        vm.$message.success('操作成功');
                                        vm.toggleDialog = false;
                                        vm.taskData = {
                                            "beginTime":"",
                                            "endTime":"",
                                            "instruction":"",
                                            "item":"",
                                            "level":"",
                                            "education":"",
                                            "degree":"",
                                            "remark":""
                                        }
                                    }else{
                                        vm.$message.error(data.errInfo)
                                    }
                                })
                            }else{
                                if(delAdd == 1){
                                    vm.workList.pop();
                                    vm.jobToggleDialog = true;
                                }
                            }
                        });

                    }else if(type == 2){
                        //删除
                        if(delAdd == 2){
                            $postData('/employee/save-experience',vm.parseParam(arrPush,oaAdminister))
                                .then(function (data) {
                                    if(data.errCode == 0){
                                        vm.$message.success('操作成功');
                                        vm.toggleDialog = false;
                                        vm.trainForm = {
                                            "beginTime":"",
                                            "endTime":"",
                                            "instruction":"",
                                            "item":"",
                                            "level":"",
                                            "education":"",
                                            "degree":"",
                                            "remark":""
                                        }
                                    }else{
                                        vm.$message.error(data.errInfo)
                                    }
                                })
                        }
                        this.$refs.formTrain.validate(function (valid){
                            if (valid) {
                                 $postData('/employee/save-experience',vm.parseParam(arrPush,oaAdminister))
                                .then(function (data) {
                                    if(data.errCode == 0){
                                        vm.$message.success('操作成功');
                                        vm.toggleDialog = false;
                                        vm.trainForm = {
                                            "beginTime":"",
                                            "endTime":"",
                                            "instruction":"",
                                            "item":"",
                                            "level":"",
                                            "education":"",
                                            "degree":"",
                                            "remark":""
                                        }
                                    }else{
                                        vm.$message.error(data.errInfo)
                                    }
                                })
                            }else{
                                if(delAdd == 1){
                                    vm.trainList.pop();
                                    vm.trainToggleDialog = true;
                                }
                            }
                        });
                    }else if(type == 3){
                        //删除
                        if(delAdd == 2) {
                            $postData('/employee/save-experience',vm.parseParam(arrPush,oaAdminister))
                                .then(function (data) {
                                    if(data.errCode == 0){
                                        vm.$message.success('操作成功');
                                        vm.toggleDialog = false;
                                        vm.winingForm = {
                                            "beginTime":"",
                                            "instruction":"",
                                            "item":"",
                                            "level":"",
                                            "education":"",
                                            "degree":"",
                                            "remark":""
                                        }
                                    }else{
                                        vm.$message.error(data.errInfo)
                                    }
                                })
                        }
                        this.$refs.formWinning.validate(function (valid){
                            if (valid) {
                                 $postData('/employee/save-experience',vm.parseParam(arrPush,oaAdminister))
                                .then(function (data) {
                                    if(data.errCode == 0){
                                        vm.$message.success('操作成功');
                                        vm.toggleDialog = false;
                                        vm.winingForm = {
                                            "beginTime":"",
                                            "instruction":"",
                                            "item":"",
                                            "level":"",
                                            "education":"",
                                            "degree":"",
                                            "remark":""
                                        }
                                    }else{
                                        vm.$message.error(data.errInfo)
                                    }
                                })
                            }else{
                                if(delAdd == 1){
                                    vm.winingList.pop();
                                    vm.winningToggleDialog = true;
                                }
                            }
                        });

                    }

            },
            /**
             *导出人员列表
             */
            exportList:function () {
                window.location.href = '/employee/export-employee-list?orgId='+vm.orgId+'&status='+vm.status+'&searchName='+vm.currentQuery+'&mobile='+vm.currentQuery;
            },
            /**
             *下载导入模板
             */
            downloadTemplate:function () {
                window.location.href = '/employee/download-demo';
            },
            formatter:function (row, column) {
                return row.sex > 1 ? '女' : '男';
            },

            handleEdit:function (orgInfo) {
                this.dialogTitle = '修改员工信息';
                _.extend(this.form,orgInfo);
                this.editToggleDialog = true;
            },
            /**
             * 二维码
             * */
            showCode:function(row){
                $getData('/employee/qrcode-info',vm.parseParam({employeeId :row.id},oaAdminister))
                    .then(function (data) {
                        if(data.errCode == 0){
                            vm.dialogDatas = data.data || [];
                        }else{
                            vm.$message.error(data.errInfo)
                        }
                    })
            },
            handleRemoveKey:function(file, fileList) {
                vm.delFile(file.id);
            },
            delFile:function(id){
                $postData('/employee/del-file',vm.parseParam({
                    id:id
                },oaAdminister))
                    .then(function (data) {
                        if(data.errCode == 0){
                            vm.$message.success('操作成功');
                            vm.lookFujian();
                        }else{
                            vm.$message.error(data.errInfo)
                        }
                    })
            },
            editFile:function(v){
                vm.objData.name = v.name;
                vm.objData.id = v.id;
                vm.fileDialog = true;
            },
            handlePreviewKey:function(response, file, fileList) {
                console.log(response, file, fileList);
                if(response.errCode!='0'){
                    fileList.pop();
                    vm.$message.error(response.errInfo);
                }else{
                    vm.lookFujian();
                    vm.fileDialog = false;
                }
            },
            handleBeforeKey:function(file){
                this.$refs.ruleForm.validate(function (valid){
                    if (valid) {
                        return true;
                    }
                });
            },
            closeFile:function(){
                vm.objData.name='';
                vm.fileListData=[];
            },
            getUpload:function(){
                $getData('/employee/get-files',vm.parseParam({
                    employeeId :vm.employeeId,
                    type:vm.objData.type
                },oaAdminister))
                    .then(function (data) {
                        if(data.errCode == 0){
                            vm.fileListData = data.data;
                            if(vm.fileListData.length){
                                for(var i=0;i<vm.fileListData.length;i++){
                                    vm.fileListData[i].name = vm.fileListData[i].url
                                }
                            }

                        }else{
                            vm.$message.error(data.errInfo)
                        }
                    })
            },
            getCheck:function(val){
                this.checkVal = val;
            },
            clearFileListData:function(){
                vm.ileListData = [];
            },
            dialogClose:function () {
                this.form = {
                    imageUrl:'',
                    addresser:[],
                    orgId:'', //机构ID
                    positionId:'', //职位ID
                    avatar:'', //登记照
                    name:'', //姓名
                    sex:'', //性别[1=男],[2=女]
                    idCard:'', //身份证
                    residenceType:'', //户籍类型
                    residenceProvince:'', //籍贯省份
                    residenceCity:'', //户籍城市
                    residenceAddress:'', //籍贯地址
                    province:'', //省份
                    city:'', //城市
                    area:'', //区
                    address:'', //常住地址
                    nation:'', //民族
                    marriage:'', //婚姻
                    politicalStatus:'', //政治面貌
                    education:'', //学历
                    degree:'', //学位
                    major:'', //专业
                    email:'', //邮箱
                    mobile:'', //手机号
                    wechat:'', //微信号
                    entryDate:'', //入职日期
                    positiveDate:'', //转正日期
                    workingAge:'', //司龄
                    contractDate:'', //合同日期
                    contractYears:'', //合同期限
                    probationWage:'', //试用期工资
                    wage:'', //转正工资
                    linkMan:'', //紧急联系人
                    linkPhone:'', //紧急联系电话
                    relation:'', //关系
                };
            },
        }
    }
})