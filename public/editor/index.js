/**
 * Created by Eastory on 2017/6/1.
 * 编辑器
 * <v-editor v-model="value"></v-editor>
 */

define([
    'js!//cdn.bootcss.com/wangeditor/2.1.20/js/wangEditor.min.js',
    'css!//cdn.bootcss.com/wangeditor/2.1.20/css/wangEditor.min.css',
    'css!/editor/index.css'
],function (WangEditor) {

    Vue.component('v-editor',{
        template:'<div class="v-editor"><div @input="outputContent" class="v-editor-content" style="min-height: 400px;"></div></div>',
        props: {
            value:{
                type:String,
                default:''
            }
        },

        mounted:function () {
            this.createEditor()
        },

        data:function () {
            return {
                editorContent: ''
            }
        },
        watch:{
            value:function (newValue) {
                if (this.editor) {
                  if (newValue !== this.editorContent) {
                    this.editorContent = newValue;
                    this.editor.$txt.html(newValue)
                  } else if(!newValue) {
                    this.editor.$txt.html('')
                  }
                }
            }
        },
        methods:{
            createEditor:function() {
                var self = this
                var editor = new WangEditor(this.$el.firstChild)
                editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
                    '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen'
                ]
                editor.config.uploadImgUrl = '/admin/upload';
                editor.config.uploadImgFileName = 'img';
                editor.config.uploadParams = {type: '2'};
                editor.config.uploadImgFns.onload = function (resultText, xhr) {
                    try {
                        var data = JSON.parse(resultText),
                            imgs;
                        if(data.errorCode == 0){
                            img = data.data || [];
                            editor.command(null, 'insertHtml', '<img src="' + img.full_path + '"  style="max-width:100%;"/>');
                        }
                    }catch (e){}
                }
                editor.onchange = function() {
                    self.formatContent(this.$txt.html())
                }
                editor.create();
                editor.$txt.html(self.value);
                this.editor = editor;
            },
            formatContent:function(content) {
                // handle
                // ...
                this.editorContent = content;
                this.outputContent()
            },
            outputContent:function() {
                this.$emit('input', this.editorContent)
            }
        },
        beforeDestroy:function () {
            this.editor.destroy();
        }
    })
})
