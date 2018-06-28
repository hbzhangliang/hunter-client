<template>
    <div class="edit-content">
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
                        :file-list="mobileFileList"
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
                        :file-list="pcFileList"
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
                    <el-checkbox v-for="v in pushTargetOptions" :label="v.terminalId" :key="v.terminalId">{{v.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button>取消</el-button>
                <el-button type="primary" @click="updateColContent('form')">提交</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
    import {updateColContent,fileUpload, getContentDetail} from '@/api/api'
    import editor from './components/editor.vue'
    import {mapState} from 'vuex'
    //    const pushTargetOptions = {1:'微信', 2:'钉钉', 3:'门户', 4:'App'}
    export default {
        name: 'edit-content',
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
                    id:'',
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
                    mediaSource:'',
                    author:''
                },
                rules:{
                    title:[{ required: true, message: '标题不能为空', trigger: 'blur' }]
                },
                pushTarget: [],
                checkAll: false,
                pushTargetOptions: [],
                listType: 'picture-card',
                mobileFileList:[],
                pcFileList:[],
                mobileFile:'',
                pcFile:''
            }
        },
       created() {
            this.initPage()
        },
        computed:{
            ...mapState(["spId"]),
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
           async initPage(){
               try{
                   const query = this.$route.query
                   const r = await getContentDetail({'id':query.id});

//                   const r = await getContentDetail({'id':13});
                   this.formData = Object.assign({},this.formData, r);
                   this.content = r.content;
                   this.pushTargetOptions = r.list;
                   this.pushTarget = r.list.filter(v=>v.colId!=null).map(v=>v.terminalId);
                   this.checkAll= this.pushTarget.length === this.pushTargetOptions.length;
                   this.formData.allowComments = r.allowComments ? '1' : '0'
//                this.mobileFileList=[{url:r.mobileImage}];
//                this.pcFileList = [{url: r.pcImage}]

                   this.mobileFileList=[{url:'http://img1.imgtn.bdimg.com/it/u=4116467176,1255368176&fm=214&gp=0.jpg'}];
                   this.pcFileList = [{url:'http://img3.duitang.com/uploads/item/201208/27/20120827162528_Wc2Sn.jpeg'}]
               }catch(e){
                   console.log(e)
               }
            },
            handleCheckAllChange(val) {
                this.pushTarget = val ? this.pushTargetOptions.map(v=>v.terminalId) : [];
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
            updateColContent:  function (formName){
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
                    updateColContent(this.params).then(r=>{
                        console.log(r)
                        this.$message.success('编辑成功')
                    }).catch(e=>{
                        this.$message.error('编辑失败')
                        console.log(e)
                    })
                }catch (e){
                    this.$message.error('编辑失败')
                    console.log(e)
                }
            }
        }
    }
</script>

<style lang="scss">
    .edit-content{
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
