<!-- Created by chunmingdeng on 2018/3/19 -->
<template>
  <div>
    <template>
      <el-table :data="footMenuData" border width="100%" v-loading="isBusy">
        <el-table-column prop="sort" label="排序" min-width="10%" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="15%" align="center">
        </el-table-column>
        <el-table-column prop="" label="图标" min-width="12%" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="width: 40px;height: 40px;"/>
          </template>
        </el-table-column>
        <el-table-column prop="" label="活动图标" min-width="12%" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.activeIcon" style="width: 40px;height: 40px;"/>
          </template>
        </el-table-column>
        <el-table-column prop="" label="默认选中" min-width="10%" align="center">
          <template slot-scope="scope">
            {{scope.row.status=='1'?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态" min-width="10%" align="center">
          <template slot-scope="scope">
            {{scope.row.flag==true?'启用':'禁用'}}
          </template>
        </el-table-column>
        <el-table-column  label="操作" align="center" min-width="25%">
          <template slot-scope="scope">
            <el-button size="mini"  :disabled="configEditStatus"  @click="edit(scope.row)">修改</el-button>
            <el-button size="mini"  :disabled="configEditStatus"  @click="menuEnable(scope.row,false)" v-if="scope.row.flag==true">禁用</el-button>
            <el-button size="mini"  :disabled="configEditStatus"  @click="menuEnable(scope.row,true)" v-if="scope.row.flag!=true">启用</el-button>
            <el-button size="mini"  :disabled="configEditStatus"  @click="moveUp(scope.row)" v-if="scope.$index > 0">上移</el-button>
            <el-button size="mini"  :disabled="configEditStatus"  v-if="scope.$index < footMenuData.length -1"@click="moveDown(scope.row)">下移</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
      <el-button type="primary" :disabled="configEditStatus" @click="addMenu">新建菜单项</el-button>
      </div>
    </template>



    <el-dialog :title="dialogTitle" :visible.sync="menuVisible" size="tiny"
               @close="closeMenuDialog">
      <div class="modalContent">
        <div class="demo-input-suffix">
          排序号:<el-input v-model="menuBean.sort" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          名称:<el-input v-model="menuBean.name" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          action:<el-input v-model="menuBean.action" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          常规文本色:<el-input v-model="menuBean.textColorNormal" placeholder="请输入内容" size="medium"></el-input>
          <el-color-picker show-alpha v-model="menuBean.textColorNormal" size="small"></el-color-picker>
        </div>
        <div class="demo-input-suffix">
          活动文本色:<el-input v-model="menuBean.textColorActive" placeholder="请输入内容" size="medium"></el-input>
          <el-color-picker show-alpha v-model="menuBean.textColorActive" size="small"></el-color-picker>
        </div>
        <div class="demo-input-suffix">
          图标:<el-input v-model="menuBean.icon" placeholder="请输入内容" size="medium" class="hidden"></el-input>

          <el-upload
                  action=""
                  list-type="picture"
                  :on-preview="handlePictureCardPreview"
                  :before-upload="beforeUpload1"
                  :file-list="fileList1"
                  :on-remove="handleRemove1">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

        </div>
        <div class="demo-input-suffix">
          活动图标:<el-input v-model="menuBean.activeIcon" placeholder="请输入内容" size="medium" class="hidden"></el-input>

          <el-upload
                  action=""
                  list-type="picture"
                  :on-preview="handlePictureCardPreview"
                  :before-upload="beforeUpload2"
                  :file-list="fileList2"
                  :on-remove="handleRemove2">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>



        </div>
        <div class="demo-input-suffix">
          默认选中:
          <el-radio-group v-model="menuBean.status">
            <el-radio  label='1'>是</el-radio>
            <el-radio  label='0'>否</el-radio>
          </el-radio-group>
        </div>
        <div class="demo-input-suffix">
          状态:
          <el-radio-group v-model="menuBean.strFlag">
            <el-radio  label='1'>启用</el-radio>
            <el-radio  label='0'>禁用</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div style="text-align: center;margin-top: 25px">
        <el-button @click="closeMenuDialog">取消</el-button>
        <el-button type="primary" :disabled="configEditStatus" @click="saveMenu">确定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
    import {getAppFootConfData,saveAppFootConfData,sortAppConf,fileUpload} from '@/api/api'
    import {mapState} from 'vuex'
  export default {
    data: function () {
        return {
            isBusy:false,
            footMenuData:[],
            initConf:{
                spId:"",
                appId:"",
            },
            menuVisible:false,
            menuBean:{
                spId:this.spId,
                appId:this.appId,
                field:null,
                type:null,
                name:null,
                value:null,
                action:null,
                icon:null,
                activeIcon:null,
                sort:null,
                flag:null,
                textColorNormal:null,
                textColorActive:null
            },
            fileList1:[],
            fileList2:[],
            dialogTitle:null
        }
       },
      mounted(){
          this.init_data();
      },
      inject: ['reload'],
      methods:{
          addMenu(){
              this.changeMenuBean()
              this.fileList1=[]
              this.fileList2=[]
              this.menuVisible=true;
              this.dialogTitle="新增自定义项"
          },
          edit(item){
              var _this=this
              this.changeMenuBean(item)

              this.dialogTitle="编辑自定义项"
              //img get value
              this.fileList1=[]
              this.fileList2=[]
              this.fileList1.push({
                  name:"",
                  url:this.menuBean.icon
              })

              this.fileList2.push({
                  name:"",
                  url:this.menuBean.activeIcon
              })


              this.menuVisible=true;
          },
          closeMenuDialog(){
              this.menuVisible=false;
          },
          saveMenu(){
              var _this=this
              this.menuBean.flag=this.menuBean.strFlag=="1"?true:false
              console.log(JSON.stringify(this.menuBean))
              saveAppFootConfData(this.menuBean).then(res=>{
                  _this.$message.success("保存数据成功");
                  this.menuVisible=false;
                  _this.reload();
              }).catch(function (err) {
                  _this.$message.error('保存数据失败');
              });
          },
          changeMenuBean(item){
              if(item==null){
                  this.menuBean={
                      id:null,
                      spId:this.spId,
                      appId:this.appId,
                      field:null,
                      type:null,
                      name:null,
                      value:null,
                      action:null,
                      icon:null,
                      activeIcon:null,
                      sort:null,
                      flag:null,
                      status:null,
                      strFlag:null,
                      textColorNormal:null,
                      textColorActive:null,
                      appConfig:1,
                  }
              }
              else {
                  this.menuBean={
                      id:item.id,
                      spId:this.spId,
                      appId:this.appId,
                      field:item.field,
                      type:item.type,
                      name:item.name,
                      value:item.value,
                      action:item.action,
                      icon:item.icon,
                      activeIcon:item.activeIcon,
                      sort:item.sort,
                      flag:item.flag,
                      status:item.status,
                      strFlag:item.flag==true?"1":"0",
                      textColorNormal:item.textColorNormal,
                      textColorActive:item.textColorActive
                  }
              }
          },
          menuEnable(item,status){
              this.changeMenuBean(item)
              this.menuBean.flag=status
              this.menuBean.strFlag=status?"1":"0"
              this.saveMenu()
          },
          init_data(){
              //获取值
              this.initConf.spId=this.spId
              this.initConf.appId=this.appId

              var _this=this
              _this.isBusy=true
              getAppFootConfData(_this.initConf).then(res=>{
                  _this.isBusy=false
                  _this.footMenuData=res
//                  console.log(_this.footMenuData)
              }).catch(function (err) {
                _this.isBusy=false
                _this.$message.error(err.message)
              });
          },
          moveDown(item){
              this.changeSort(item.id,'DOWN')
          },
          moveUp(item){
              this.changeSort(item.id,'UP')
          },
          changeSort(id,direct){
              var _this=this
              var ids=[]
              var pIndex=0
              this.footMenuData.forEach(function (item,index) {
                  ids.push(item.id)
                  if(item.id==id) pIndex=index
              })
              var changeIn=direct=="UP"?pIndex-1:pIndex+1
              var tmp=ids[changeIn]
              ids[changeIn]=ids[pIndex]
              ids[pIndex]=tmp
              sortAppConf({ids:ids}).then(res=>{
                  _this.$message.success("排序成功");
                  _this.init_data()
              }).catch(function (err) {
                  _this.$message.error('排序失败');
              });
          },




          handlePictureCardPreview(file,fileList) {
//              this.imageUrl = file.url;
          },
          handleRemove1(file, fileList) {
              this.fileList1=[]
              this.menuBean.icon=null
          },
          handleRemove2(file, fileList) {
              this.fileList2=[]
              this.menuBean.activeIcon=null
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
                  _this.menuBean.icon=res
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
                  _this.menuBean.activeIcon=res
              })
          }

      } ,
      components: {

      },
      computed:{
          ...mapState(["spId","appId", "configEditStatus"])
      }
  }
</script>

<style>

  .hidden{
    display: none;
  }

</style>