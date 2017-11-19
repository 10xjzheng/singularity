/**
 * 体验版角色配置
 */
define(function () {
    var vm;
    return {
        data: function () {
            return {
                /**
                 * 模板列表
                 */
                isUpdate: false,
                list: [],
                vRoleLoading: false,
                typeName:['POS机','信用卡','贷款','车险','代理加盟'],
                statusName:['待审核','通过','不通过'],
                /**
                 * 编辑模板
                 */
                vEditRoleToggle: false,
                vEditRoleLoading: false,
                /**
                 * form表单
                 */
                activeName: 'all',
                form: {status:1},
                type:0,
                searchName: ''
            }
        },
        computed:{
            imgList:function () {
                return [{
                    materialId:this.form.avatarId,
                    thumb:this.form.avatar,
                    url:this.form.avatar
                }]
            }
        },
        methods: {

            onEnter: function (param, query) {
                vm = this;
                vm.getList();
            },
            /**
             * 列表
             * @param page
             */
            getList:function (page) {
                vm.vRoleLoading = true;
                $getData('/admin/applyList', {"type" : vm.type, "searchName": vm.searchName})
                    .then(function (data) {
                        vm.vRoleLoading = false;
                        if(data.errorCode == 0){
                            vm.list = data.data || [];
                        }
                    })
            },
            formatType:function (row, column) {
                var type = parseInt(row.type);
                return row.apply_type == '' ? vm.typeName[type-1] : vm.typeName[type-1] +"--" + row.apply_type;
            },
            formatStatus:function (row, column) {
                var status = parseInt(row.status);
                return vm.statusName[status];
            },
            getDetail: function (row) {
                _.extend(vm.form, row);
            },
            /**
             * 编辑模板
             * @param page
             */
            editApply: function () {
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        var param = {
                            id: vm.form.id,
                            status: vm.form.status
                        };
                        vm.vEditRoleLoading = true;
                        $getData('/admin/editApply', param)
                            .then(function (data) {
                                vm.vEditRoleLoading = false;
                                if (data.errorCode == 0) {
                                    vm.vEditRoleToggle = false;
                                    vm.$message.success('操作成功');
                                    vm.getList();
                                } else {
                                    vm.$message.error(data.errorInfo);
                                }
                            });
                    }
                });
            },
            handleClick: function (tab, event) {
                var m = new Map([['all',0],['pos',1],['card',2],['load',3],['car',4],['union',5]]);
                vm.type = m.get(vm.activeName);
                vm.getList();
            },
            removeNote: function (row) {
                vm.$confirm('此操作将永久删除此记录，是否继续?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    var param = {
                        id: row.id
                    };
                    $getData('/admin/delNote', param)
                        .then(function (data) {
                            if (data.errorCode == 0) {
                                vm.$message.success('删除成功');
                                vm.getList();
                            } else {
                                vm.$message.error(data.errorInfo);
                            }
                        });
                }).catch(function () {

                });
            }
        }
    }
})