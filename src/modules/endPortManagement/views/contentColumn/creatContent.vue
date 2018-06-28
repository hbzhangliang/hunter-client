<template>
    <div class="creat-content">
        <el-form ref="form" :rules="rules" :model="formData" class="my-form">
            <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>

            <el-form-item label="副标题">
                <el-input v-model="formData.subTitle"></el-input>
            </el-form-item>

            <el-form-item label="摘要">
                <el-input v-model="formData.summary"></el-input>
            </el-form-item>

            <el-form-item label="标签">
                <el-input v-model="formData.tag"></el-input>
            </el-form-item>

            <el-form-item label="媒体来源">
                <el-input v-model="formData.mediaSource"></el-input>
            </el-form-item>

            <el-form-item label="作者">
                <el-input v-model="formData.author"></el-input>
            </el-form-item>

            <el-form-item>
                <span class="font-s-14" slot="label">外链</span>
                <el-radio v-model="formData.type" label="OUTURL">开</el-radio>
                <el-radio v-model="formData.type" label="FILLCONTENT">关</el-radio>
                <el-input v-model="formData.outLineUrl" :disabled="formData.type=='FILLCONTENT'"></el-input>
            </el-form-item>

            <editor :text="content" :isEdit="isEdit" @editorChange="editorChange"></editor>


            <el-form-item>
                <!--<UE ref="ue"></UE>-->
            </el-form-item>

            <el-form-item>
                <p  class="font-s-14">移动配图上传</p>
                <el-upload
                        ref="mobileImg"
                        class="avatar-uploader"
                        :list-type="listType"
                        :auto-upload="false"
                        :on-change="beforeMobileUpload"
                        :action ='action'>
                    <span class="el-upload__tip" slot="tip">支持2M以内的PNG、JPG格式的文件</span>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <p  class="font-s-14">PC配图上传</p>
                <el-upload
                        ref="pcImg"
                        class="avatar-uploader"
                        :action='action'
                        :list-type="listType"
                        :on-change="beforePcUpload"
                        :auto-upload="false">
                    <span class="el-upload__tip" slot="tip">支持2M以内的PNG、JPG格式的文件</span>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <span class="font-s-14" slot="label">允许评论</span>
                <el-radio v-model="formData.allowComments" label="1">开</el-radio>
                <el-radio v-model="formData.allowComments" label="0">关</el-radio>
            </el-form-item>

            <el-form-item>
                <span class="font-s-14" slot="label">文章推送</span>
                <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="pushTarget" @change="handleCheckedChange" :min="1">
                    <el-checkbox v-for="v in pushTargetOptions" :label="v.id" :key="v.id">{{v.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button>取消</el-button>
                <el-button type="primary" @click="addColumnContent('form')">提交</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
    import {addColumnContent,getTerminalList,fileUpload} from '@/api/api'
    import editor from './components/editor.vue'
//    const pushTargetOptions = {1:'微信', 2:'钉钉', 3:'门户', 4:'App'}
    export default {
        name: 'creat-content',
        components: {editor},
        data() {
            return {
                content:'',
                editorOption: {},    // 编辑器选项
                addRange:[],
                uploadData :{},
                photoUrl : '',         // 上传图片地址
                uploadType : '',    // 上传的文件类型（图片、视频）
                fullscreenLoading : false,
                action:'api/attachment/file-upload',
                formData: {
                    content:'',
                    title: '',
                    subTitle: '',
                    summary: '',
                    tag: '',
                    outLineUrl: '',
                    type: 'FILLCONTENT',
                    allowComments: '0',
                    pcImage:'',
                    mobileImage:'',
                    terminalIds:'',
                    mediaSource:'帜讯信息',
                    author:''
                },
                rules:{
                    title:[{ required: true, message: '标题不能为空', trigger: 'blur' }]
                },
                pushTarget: [],
                checkAll: false,
                pushTargetOptions: [],
                listType: 'picture-card',
                mobileFile:'',
                pcFile:''
            }
        },
        created() {
            getTerminalList({"catagoryName":"terminal"}).then(r=>{
                this.pushTargetOptions = r;
                console.log(r[0])
                this.pushTarget = [r[0].id]
            }).catch(e=>{
                console.log(e)
            })
        },
        computed:{
           params(){
               let obj = {};
               obj = JSON.parse(JSON.stringify(this.formData));
               obj.terminalIds = this.pushTarget.join(',');
               obj.content = this.content;
               obj.allowComments = Number(obj.allowComments);
               obj.spid = '1'
               return obj;
           },
            isEdit(){
               return this.formData.type =='OUTURL'
            }
        },
        methods: {
            handleCheckAllChange(val) {
                this.pushTarget = val ? this.pushTargetOptions.map(v=>v.id) : [];
            },
            handleCheckedChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.pushTargetOptions.length;
            },
            editorChange: function(html) {
                this.content = html
            },
            beforeMobileUpload(file){
                this.mobileFile = file.raw
            },
            beforePcUpload(file){
                this.pcFile = file.raw
            },
             addColumnContent:  function (formName){
                 this.$refs[formName].validate((valid) => {

                       if (valid) {
                           this.submit()

                       } else {
                           console.log('error submit!!');
                           return false;
                       }
                   });
            },
             submit: async function (){
                 try{
                     if(this.mobileFile){
                         let f1 = new FormData()
                         f1.append('file', this.mobileFile)
                         const u1 = await fileUpload(f1);
                         this.formData.mobileImage = u1;
                     }
                     if(this.pcFile){
                         let f2 = new FormData()
                         f2.append('file', this.pcFile)
                         const u2 = await fileUpload(f2);
                         this.formData.pcImage = u2
                     }
                     addColumnContent(this.params).then(r=>{
                         console.log(r)
                         this.$message.success('新增成功')
                     }).catch(e=>{
                         this.$message.error('添加失败')
                         console.log(e)
                     })
                 }catch (e){
                     this.$message.error('添加失败')
                     console.log(e)
                 }
            }
        }
    }
</script>

<style lang="scss">
    .creat-content{
        padding: 40px;
        .my-form{
            .el-form-item__label {
                color: deepskyblue;
            }
            .el-checkbox-group {
                display: inline;
            }
            .el-checkbox {
                margin-left: 0;
                margin-right: 30px;
            }
            .el-upload__tip {
                display: inline-block;
                vertical-align: bottom;
                margin-bottom: -8px;
                margin-left: 10px;
                color: #959698;
            }
            .avatar-uploader .el-upload {
                border: 1px dashed #ddd;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                width: 96px!important;
                height: 96px;
                background: #f7f7fb url('../../../../../static/img/upload.png') no-repeat center center;

            }
            .avatar-uploader {
                .el-upload-list__item {
                    width: 96px;
                    height: 96px;
                }
                .el-upload:hover {
                    border-color: #409EFF;
                }
            }
        }
    }
</style>
