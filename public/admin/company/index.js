/**
 * @author hexj
 * @description 项目目标设置
 */
define(['js!/editor/index.js'], function () {
    var baseInfoSetting = 'baseInfoSetting';
    var vm;
    return {
        data: function () {
            return {
                vBaseSettingLoading: false,
                form: {
                  id: 0
                },
                logoIconList: [],
                depRules: {
                    name: [{required: true, message: '请输入名称', trigger: 'blur'}]
                }
            }
        },
        methods: {
            onEnter: function (param, query) {
                vm = this;
                vm.getInfo();
            },
            getInfo: function () {
                vm.vBaseSettingLoading = true;
                $getData('/admin/companyInfo', this.parseParam({}, baseInfoSetting))
                    .then(function (data) {
                        vm.vBaseSettingLoading = false;
                        if (data.errorCode == 0) {
                            vm.form = data.data;
                            vm.logoIconList = [{name: data.data.logo_id, url: data.data.logo}];
                          } else {
                            vm.$message(data.errorInfo);
                        }
                    });
            },
            /**
             * @api 编辑基本信息
             *
             */
            saveInfo: function () {
                vm.$refs.form.validate(function (valid) {
                    if (valid) {
                        vm.vBaseSettingLoading = true;
                        $getData('/admin/saveCompanyInfo', vm.parseParam(vm.form, baseInfoSetting))
                            .then(function (data) {
                                vm.vBaseSettingLoading = false;
                                if (data.errorCode == 0) {
                                    vm.$message.success('保存成功');
                                } else {
                                    vm.$message.error(data.errorInfo);
                                }
                            });
                    }
                });
            },
            /**
             * LOGO图标
             * @param response
             * @param file
             * @param fileList
             */
            walerOuterUpload: function (response) {
                if (response.errorCode == 0) {
                    vm.form.logo_id = response.data.material_id;
                } else {
                    vm.$message.error(response.errorInfo);
                }
            }
            ,
            walerOuterRemove: function () {
                vm.form.logo_id = 0;
                vm.outerMaterials = [];
            }
        }
    }
})