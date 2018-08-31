<template>
    <section>
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div class="banner">
                </div>

                <div>
                    <el-upload
                            v-loading="isBusy"
                            action=""
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :before-upload="beforeUpload"
                            :file-list="fileList"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="imageUrl" alt="">
                    </el-dialog>

                </div>

            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .content{
        height: 740px;
    }

</style>
<script>
    import end from '@/common/js/utils.js'
    import {attachmentUpload} from '@/api/api'
    import $ from 'jquery'
    export default{
        data () {
            return {
                dialogVisible: false,
                uploadAction:"",
                imageUrl:"",
                fileList:[],
                isBusy: false
            }
        },
        methods: {
            handlePictureCardPreview(file) {
                this.imageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },

            //在这里上传附件
            beforeUpload(file){
                var _this=this;
                _this.isBusy=true;
                let fd = new FormData()
                fd.append('file', file)
                attachmentUpload(fd).then(res => {
                    _this.imageUrl=res;
                    _this.dialogVisible = true;
                    var tmp={
                        name:"",
                        url:res
                    };
                    _this.fileList.push(tmp)
                    _this.isBusy=false;
                });
            }
        },
        created () {

        },
        components: {
        }
    }
</script>
