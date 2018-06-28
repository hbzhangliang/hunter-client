<!-- Created by chunmingdeng on 2018/3/19 -->
<template>
  <div class="contentDiv">
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <span>顶部导航</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span>背景色</span>
          <el-input v-model="topNav.bgColor" size="small" class="w-90 marr-15"></el-input>
          <el-color-picker :disabled="configEditStatus"  show-alpha v-model="topNav.bgColor" size="small"></el-color-picker>
        </div>
      </el-col>


      <el-col :span="5"><div class="grid-content bg-purple">
        <span>文本色</span>
        <el-input v-model="topNav.textColorNormal" size="small" class="w-90 marr-15"></el-input>
        <el-color-picker :disabled="configEditStatus"  show-alpha v-model="topNav.textColorNormal" size="small"></el-color-picker>
      </div></el-col>


      <el-col :span="11"><div class="grid-content bg-purple">

        <span>背景图</span>
        <el-upload
                :disabled="configEditStatus"
                class="uploadBgStyle"
                action=""
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUpload1"
                :file-list="fileList1"
                :on-remove="handleRemove1">
          <el-button size="small" :disabled="configEditStatus" type="primary" class="fs-12 marl-15">点击上传</el-button>
        </el-upload>
      </div>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <span>底部菜单</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span>背景色</span><el-input v-model="bottomMenu.bgColor" size="small" class="w-90 marr-15"></el-input>
          <el-color-picker :disabled="configEditStatus" show-alpha v-model="bottomMenu.bgColor" size="small"></el-color-picker>
        </div>
      </el-col>

      <el-col :span="5"><div class="grid-content bg-purple">
        <span>上边框色</span><el-input v-model="bottomMenu.borderColor" size="small" class="w-90 marr-15"></el-input>
        <el-color-picker :disabled="configEditStatus"   show-alpha v-model="bottomMenu.borderColor" size="small"></el-color-picker>
      </div></el-col>

      <el-col :span="11"><div class="grid-content bg-purple">
        <span>背景图</span>
        <el-upload
                :disabled="configEditStatus"
                class="uploadBgStyle"
                action=""
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUpload2"
                :file-list="fileList2"
                :on-remove="handleRemove2">
          <el-button size="small" :disabled="configEditStatus" type="primary" class="fs-12 marl-15">点击上传</el-button>
        </el-upload>

      </div></el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :span="24">
        <div style="margin-left: auto;margin-right: auto">
          <el-button type="primary" :disabled="configEditStatus"  @click="saveTheme" class="fs-12">确定</el-button>
        </div>
      </el-col>
    </el-row>

  </div>



</template>

<script>
    import {getThemeConfData,saveThemeConfData,fileUpload} from '@/api/api'
    import {mapState} from 'vuex'
  export default {
    data: function () {
      return {
          fileList1:[],
          fileList2:[],

          themeConfigDataList:[],
          initConf:{
              spId:"",
              appId:""
          },
          topNav:{
              field:'TOP_NAV',
              textColorNormal:null,
              bgColor:null,
              bgImage:null
          },
          bottomMenu:{
              field:'BOTTOM_MENU',
              borderColor:null,
              bgColor:null,
              bgImage:null
          }

      }
    },
      mounted(){
          this.init_data();
      },
      inject: ['reload'],
      methods:{
        init_data(){
            //获取值
            this.initConf.spId=this.spId
            this.initConf.appId=this.appId

            var _this=this
            getThemeConfData(this.initConf).then(res=>{
                res.forEach(function (item,index) {
                    var tmp={
                        name:"",
                        url:item.bgImage
                    }
                    if(item.field==_this.topNav.field){
                        _this.topNav={
                            field:'TOP_NAV',
                                textColorNormal:item.textColorNormal,
                                bgColor:item.bgColor,
                                bgImage:item.bgImage
                        }
                        _this.fileList1=[]
                        _this.fileList1.push(tmp)
                    }
                    else {
                        _this.bottomMenu={
                            field:'BOTTOM_MENU',
                                borderColor:item.borderColor,
                                bgColor:item.bgColor,
                                bgImage:item.bgImage
                        }
                        _this.fileList2=[]
                        _this.fileList2.push(tmp)
                    }
                })
            });
        },
          saveTheme(){
            var _this=this
              var params={
                appId:this.initConf.appId,
                  spId:this.initConf.spId,
                  configs:[]
              }
              params.configs.push(_this.topNav)
              params.configs.push(_this.bottomMenu)
              params.spId= params.spId==""?null:params.spId;
              saveThemeConfData(params).then(res=>{
                  _this.$message.success('保存数据成功');
                  _this.reload();
              }).catch(function (err) {
                  _this.$message.error('保存数据错误');
              })
          },

          handlePictureCardPreview(file,fileList) {
//              this.imageUrl = file.url;
          },
          handleRemove1(file, fileList) {
              this.fileList1=[]
              this.topNav.bgImage=""
          },
          handleRemove2(file, fileList) {
              this.fileList2=[]
              this.bottomMenu.bgImage=""
          },
          //在这里上传附件
          beforeUpload1(file){
              var _this=this;
              let fd = new FormData()
              fd.append('file', file)
              fileUpload(fd).then(res => {
                  var tmp={
                      name:"",
                      url:res
                  }
                  _this.fileList1=[]
                  _this.fileList1.push(tmp)
                  _this.topNav.bgImage=res
              })
          },
          beforeUpload2(file){
              var _this=this;
              let fd = new FormData()
              fd.append('file', file)
              fileUpload(fd).then(res => {
                  var tmp={
                      name:"",
                      url:res
                  }
                  _this.fileList2=[]
                  _this.fileList2.push(tmp)
                _this.bottomMenu.bgImage=res
              })
          }
      },
      components: {

      },
      computed:{
          ...mapState(["spId","appId", "configEditStatus"])
      }

  }
</script>

<style scoped>
  .contentDiv{
    font-size: large;
    margin-top: 20px;
  }
  .contentDiv span{
     /*font-size:17px;*/
  }

  .contentDiv .el-row {
    border: 1px solid cornflowerblue;
    border-bottom: none;
    margin-bottom: 0px;
  }
  .contentDiv .el-row:last-child {
     /*border-bottom: 1px solid cornflowerblue;*/
    border-left: none;
    border-right: none;
    padding-top: 20px;
  }
  .el-row{
    display: flex;
    align-items: center;
    min-height: 103px;
    padding:5px 0px;
  }
  .el-upload-list__item{
    margin-top: 0!important;
  }
  .grid-content {
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*border: 1px solid lightblue;*/
  }
  .grid-content>span{
    font-size: 12px;
  }
  .row-bg {
    padding: 10px 0;
  }
  .uploadBgStyle{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .el-upload--picture{
    width: auto!important;
  }
</style>