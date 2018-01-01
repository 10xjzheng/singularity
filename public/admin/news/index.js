/**
 * 体验版角色配置
 */
define(['js!/editor/index.js'],function () {
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
                pageInfo: {total: 0, pageSize: 10, currentPage: 1},
                /**
                 * 编辑模板
                 */
                vEditRoleToggle: false,
                vEditRoleLoading: false,
                /**
                 * form表单
                 */
                activeName: 'all',
                form: {id: 0},
                searchName: '',
                logoIconList: []
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
                page = parseInt(page);
                this.pageInfo.currentPage = page || 1;
                $getData('/admin/newsList', {"searchName": vm.searchName, "currentPage": this.pageInfo.currentPage})
                    .then(function (data) {
                        vm.vRoleLoading = false;
                        if(data.errorCode == 0){
                            vm.list = data.data || [];
                            vm.pageInfo.total = data.count;
                        }
                    })
            },
            getDetail: function (row) {
                vm.logoIconList = [{name: row.main_pic_id, url: row.main_pic}];
                _.extend(vm.form, row);
            },
            /**
             * 编辑模板
             * @param page
             */
            edit: function () {
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        var param = vm.form;
                        vm.vEditRoleLoading = true;
                        $getData('/admin/editNews', param)
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
            walerOuterUpload: function (response) {
                if (response.errorCode == 0) {
                    vm.form.main_pic_id = response.data.material_id;
                } else {
                    vm.$message.error(response.errorInfo);
                }
            }
            ,
            walerOuterRemove: function () {
                vm.form.previewOuterId = '';
                vm.outerMaterials = [];
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
                    $getData('/admin/delNews', param)
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