<!-- Created by chunmingdeng on 2018/3/19 -->
<template>
  <div>
    <template>
      <el-table :data="myConfData" border width="100%" v-loading="isBusy">
        <el-table-column prop="sort" label="排序" min-width="10%" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="18%" align="center">
        </el-table-column>
        <el-table-column prop="" label="图标" min-width="15%" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="width: 40px;height: 40px;"/>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="12%" align="center">
          <template slot-scope="scope">
            {{scope.row.value=='true'?'显示':'隐藏'}}
          </template>
        </el-table-column>
        <el-table-column  label="操作" align="center" min-width="25%">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="configEditStatus"  @click="edit(scope.row)">修改</el-button>
            <el-button size="mini" :disabled="configEditStatus"  @click="optConfigEnable(scope.row,'false')" v-if="scope.row.value=='true'">隐藏</el-button>
            <el-button size="mini" :disabled="configEditStatus"  @click="optConfigEnable(scope.row,'true')" v-if="scope.row.value!='true'">显示</el-button>
            <el-button size="mini" :disabled="configEditStatus"  @click="moveUp(scope.row)" v-if="scope.$index > 0">上移</el-button>
            <el-button size="mini" :disabled="configEditStatus"   v-if="scope.$index < myConfData.length -1"@click="moveDown(scope.row)">下移</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-button type="primary" :disabled="configEditStatus"  @click="addOptSetting">新建自定义项</el-button>
      </div>
    </template>

    <el-dialog :title="dialogTitle" :visible.sync="configVisible" size="tiny"
               @close="closeDialog">
      <div class="modalContent">
        <div class="demo-input-suffix">
          排序号:<el-input v-model="configBean.sort" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          名称:<el-input v-model="configBean.name" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          action:<el-input v-model="configBean.action" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          图标:<el-input v-model="configBean.icon" placeholder="请输入内容" size="medium" class="hidden"></el-input>

          <el-upload
                  action=""
                  list-type="picture"
                  :on-preview="handlePictureCardPreview"
                  :before-upload="beforeUpload"
                  :file-list="fileList"
                  :on-remove="handleRemove">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>


        </div>
        <div class="demo-input-suffix">
          状态:
          <el-radio-group v-model="configBean.value">
            <el-radio  label='true'>显示</el-radio>
            <el-radio  label='false'>隐藏</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div style="text-align: center;margin-top: 25px">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" :disabled="configEditStatus" @click="saveOptConfig">确定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
    import {getAppOptConfData,saveAppOptConfData,sortAppConf,fileUpload} from '@/api/api'
    import {mapState} from 'vuex'
    export default {
        data: function () {
            return {
                isBusy:false,
                myConfData:[],
                initConf:{
                    spId:"",
                    appId:"",
                },
                configVisible:false,
                configBean:{
                    id:null,
                    spId:null,
                    appId:null,
                    field:null,
                    type:null,
                    name:null,
                    value:null,
                    action:null,
                    icon:null,
                    sort:null,
                    flag:null
                },
                fileList:[],
                dialogTitle:null
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
                _this.isBusy=true
                getAppOptConfData(_this.initConf).then(res=>{
                    _this.isBusy=false
                    _this.myConfData=res
                    console.log(_this.myConfData)
                });
            },
            changeOptConfig(item){
                if(item==null){
                    this.configBean={
                        id:null,
                            spId:this.spId,
                            appId:this.appId,
                            field:null,
                            type:null,
                            name:null,
                            value:null,
                            action:null,
                            icon:null,
                            sort:null,
                            flag:null,
                            appConfig:1,
                    }
                }
                else {
                    this.configBean={
                        id:item.id,
                            spId:item.spId,
                            appId:item.appId,
                            field:item.field,
                            type:item.type,
                            name:item.name,
                            value:item.value,
                            action:item.action,
                            icon:item.icon,
                            sort:item.sort,
                            flag:item.flag
                    }
                }
            },
            addOptSetting(){
                this.changeOptConfig()
                this.fileList=[]
                this.configVisible=true;
                this.dialogTitle="新增设置"
            },
            edit(item){
                this.changeOptConfig(item)

                this.fileList=[]
                this.fileList.push({
                    name:"",
                    url:this.configBean.icon
                })
                this.dialogTitle="编辑设置"
                this.configVisible=true;
            },
            closeDialog(){
                this.configVisible=false;
            },
            saveOptConfig(){
                var _this=this
                console.log(this.configBean)
                saveAppOptConfData(this.configBean).then(res=>{
                    _this.$message.success("保存数据成功");
                    this.configVisible=false;
                    _this.reload();
                }).catch(function (err) {
                    _this.$message.error('保存数据失败');
                });
            },
            optConfigEnable(item,status){
                this.changeOptConfig(item)
                this.configBean.value=status
                this.saveOptConfig()
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
                this.myConfData.forEach(function (item,index) {
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


            //handle for img
            handlePictureCardPreview(file,fileList) {
//              this.imageUrl = file.url;
            },
            handleRemove(file, fileList) {
                this.fileList=[]
                this.configBean.icon=null
            },
            //在这里上传附件
            beforeUpload(file){
                var _this=this;
                let fd = new FormData()
                fd.append('file', file)
                fileUpload(fd).then(res => {
                    var tmp={
                        name:"",
                        url:res
                    }
                    _this.fileList=[]
                    _this.fileList.push(tmp)
                    _this.configBean.icon=res
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
    display:none;
  }
</style>