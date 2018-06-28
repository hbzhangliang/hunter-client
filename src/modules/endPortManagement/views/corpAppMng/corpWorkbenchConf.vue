<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner"></div>

        <div class="tableBox">
          <div class="pageTableContent">
            <el-button type="primary" class="addBanner" @click="addModule"><i class="el-icon-plus"></i>添加模块</el-button>
            <el-table :data="tableData" border width="100%">
              <el-table-column prop="seq" label="排序" width="80">
              </el-table-column>
              <el-table-column prop="type" label="模块类型" width="160">
              </el-table-column>
              <el-table-column prop="name" label="模块名字" width="160">
              </el-table-column>
              <el-table-column prop="groupName" label="分组名称" width="140">
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="100">
              </el-table-column>
              <el-table-column  label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
                  <el-button size="mini" type="info" @click="view(scope.row)">查看</el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
                  <el-button size="mini" type="primary" @click="config(scope.row.id)">配置</el-button>
                  <el-button size="mini" type="info" @click="moveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                  <el-button size="mini" type="info" v-if="scope.$index < tableData.length -1"@click="moveDown(scope)">下移</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>



        <!--弹出框-->
        <el-dialog custom-class="info" title="模块配置" :visible.sync="moduleVisible" width="50%"
                   @close="closeDialog">
          <div class="modalContent">
            <el-form  :model="bean" :rules="rules" ref="ruleForm"   class="demo-ruleForm">
              <div class="demo-input-suffix">
                <el-form-item label="类型" prop="type">
                  <div>
                    <el-radio  v-model="bean.type" label="scrollModule" border>轮播图</el-radio>
                    <el-radio  v-model="bean.type" label="bizModule" border>订购业务</el-radio>
                    <el-radio  v-model="bean.type" label="optModule" border>自定义模块</el-radio>
                  </div>
                </el-form-item>
              </div>
              <div class="demo-input-suffix">
                <el-form-item label="排序号" prop="seq">
                  <el-input v-model="bean.seq" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
              </div>
              <div class="demo-input-suffix">
                <el-form-item label="名称" prop="name">
                  <el-input  v-model="bean.name" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
              </div>
              <div class="demo-input-suffix" v-if="bean.type=='bizModule'">
                分组名称:<el-input v-model="bean.groupName" placeholder="请输入内容" size="medium"></el-input>
              </div>
              <div class="demo-input-suffix">
                备注:<el-input v-model="bean.remark" placeholder="请输入内容" size="medium"></el-input>
              </div>
            </el-form>
            <!--</div>-->
            <div style="text-align: center;margin-top: 10px">
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveModule">确定</el-button>
            </div>
          </div>
        </el-dialog>


        <!--biz scroll-->
        <el-dialog title="轮播图列表" :visible.sync="outerScrollVisible"
                   custom-class="scroll_dialog" width="90%">
          <el-dialog
            width="90%"
            title="轮播图配置"
            :visible.sync="innerScrollVisible"
            append-to-body>
            <div class="scrollContent">
              <el-form  :model="scroll" class="demo-ruleForm">

                <div class="demo-input-suffix">
                  <el-form-item label="图片文字">
                    <el-input v-model="scroll.showText" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="url">
                    <el-input  v-model="scroll.url" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="显示时长">
                    <el-input v-model="scroll.duration" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="排序号">
                    <el-input v-model="scroll.seq" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <!--</div>-->
              <div style="text-align: center;margin-top: 10px">
                <el-button @click="innerScrollVisible = false">取消</el-button>
                <el-button type="primary" @click="saveScroll">确定</el-button>
              </div>
            </div>

          </el-dialog>

          <el-button type="primary" class="addScroll" @click="addScroll"><i class="el-icon-plus"></i>添加轮播图</el-button>
          <el-table :data="scrollList" width="100%">
            <el-table-column property="showText" label="文字" width="140"></el-table-column>
            <el-table-column property="url" label="url" width="200"></el-table-column>
            <el-table-column property="duration" label="时长" width="100"></el-table-column>
            <el-table-column property="seq" label="排序号" width="100"></el-table-column>
            <el-table-column  label="操作" width="320">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="scrollEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="info" @click="scrollView(scope.row)">查看</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="scrollDel(scope.row.id)">删除</el-button>
                <el-button size="mini" type="info" @click="scrollMoveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                <el-button size="mini" type="info" v-if="scope.$index < scrollList.length -1"@click="scrollMoveDown(scope)">下移</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div slot="footer" class="dialog-footer">
            <el-button @click="outerScrollVisible = false">取 消</el-button>
          </div>

        </el-dialog>


        <!--biz appConfig-->
        <el-dialog title="订购业务列表" :visible.sync="outerBizAppConfigVisible"
                   custom-class="bizAppConfig_dialog" width="90%">

          <el-dialog
            width="90%"
            title="订购业务配置"
            :visible.sync="innerBizAppConfigVisible"
            append-to-body>
            <div class="bizAppConfigContent">
              <el-form  :model="bizAppConfig" class="demo-ruleForm">

                <div class="demo-input-suffix">
                  <el-form-item label="业务编号">
                    <el-input v-model="bizAppConfig.bizId" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="业务名称">
                    <el-input  v-model="bizAppConfig.bizName" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="url">
                    <el-input v-model="bizAppConfig.url" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="icon">
                    <el-input v-model="bizAppConfig.icon" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="备注">
                    <el-input v-model="bizAppConfig.remark" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="排序号">
                    <el-input v-model="bizAppConfig.seq" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <!--</div>-->
              <div style="text-align: center;margin-top: 10px">
                <el-button @click="innerBizAppConfigVisible = false">取消</el-button>
                <el-button type="primary" @click="saveBizAppConfig">确定</el-button>
              </div>
            </div>

          </el-dialog>


          <h2>企业{{fixedSpId}}订购的业务，从平台获取</h2>
          <el-table :data="BizAppConfigListPlatForm" width="100%">
            <el-table-column property="bizId" label="业务编号" width="140"></el-table-column>
            <el-table-column property="bizName" label="业务名称" width="100"></el-table-column>
            <el-table-column property="url" label="url" width="180"></el-table-column>
            <el-table-column property="icon" label="icon" width="320"></el-table-column>
            <el-table-column property="seq" label="排序号" width="100"></el-table-column>
          </el-table>


          <el-button type="primary" class="addBizAppConfig" @click="addBizAppConfig"><i class="el-icon-plus"></i>添加订购业务</el-button>
          <el-table :data="BizAppConfigList" width="100%">
            <el-table-column property="bizId" label="业务编号" width="140"></el-table-column>
            <el-table-column property="bizName" label="业务名称" width="140"></el-table-column>
            <el-table-column property="url" label="url" width="100"></el-table-column>
            <el-table-column property="icon" label="icon" width="100"></el-table-column>
            <el-table-column property="remark" label="备注" width="100"></el-table-column>
            <el-table-column property="seq" label="排序号" width="100"></el-table-column>
            <el-table-column  label="操作" width="320">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="bizAppConfigEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="info" @click="bizAppConfigView(scope.row)">查看</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="bizAppConfigDel(scope.row.id)">删除</el-button>
                <el-button size="mini" type="info" @click="bizAppConfigMoveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                <el-button size="mini" type="info" v-if="scope.$index < BizAppConfigList.length -1"@click="bizAppConfigMoveDown(scope)">下移</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div slot="footer" class="dialog-footer">
            <el-button @click="outerBizAppConfigVisible = false">取 消</el-button>
          </div>

        </el-dialog>




        <!--opt biz element config-->
        <el-dialog title="订购业务列表" :visible.sync="outerBizOptElementVisible"
                   custom-class="bizOptElement_dialog" width="90%">

          <el-dialog
            width="90%"
            title="自定义业务数据配置"
            :visible.sync="innerBizOptElementVisible"
            append-to-body>
            <div class="bizOptElementContent">
              <el-form  :model="bizOptElement" class="demo-ruleForm">
                <el-select v-model="bizOptElement.templateId" placeholder="请选择模板">
                  <el-option
                    v-for="item in BizTemplateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <div class="demo-input-suffix">
                  <el-form-item label="业务名称">
                    <el-input  v-model="bizOptElement.name" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="url">
                    <el-input v-model="bizOptElement.url" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
                <div class="demo-input-suffix">
                  <el-form-item label="排序号">
                    <el-input v-model="bizOptElement.seq" placeholder="请输入内容" size="medium"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <!--</div>-->
              <div style="text-align: center;margin-top: 10px">
                <el-button @click="innerBizOptElementVisible = false">取消</el-button>
                <el-button type="primary" @click="saveBizOptElement">确定</el-button>
              </div>
            </div>

          </el-dialog>


          <h2>自定义业务模板数据</h2>
          <el-table :data="BizTemplateList" width="100%">
            <el-table-column property="id" label="模板编号" width="120"></el-table-column>
            <el-table-column property="name" label="名称" width="120"></el-table-column>
            <el-table-column property="type" label="类型" width="120"></el-table-column>
            <el-table-column property="height" label="高度" width="100"></el-table-column>
            <el-table-column property="width" label="宽度" width="100"></el-table-column>
            <el-table-column property="iconSize" label="图标大小" width="100"></el-table-column>
            <el-table-column property="textRows" label="行数" width="100"></el-table-column>
            <el-table-column property="textCols" label="列数" width="100"></el-table-column>
          </el-table>


          <el-button type="primary" class="addBizOptElement" @click="addBizOptElement"><i class="el-icon-plus"></i>添加自定义业务数据</el-button>
          <el-table :data="BizOptElementList" width="100%">
            <el-table-column property="tempName" label="模板名称" width="140"></el-table-column>
            <el-table-column property="name" label="业务名称" width="160"></el-table-column>
            <el-table-column property="url" label="url" width="140"></el-table-column>
            <el-table-column property="seq" label="排序号" width="100"></el-table-column>
            <el-table-column  label="操作" width="280">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="bizOptElementEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="info" @click="bizOptElementView(scope.row)">查看</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="bizOptElementDel(scope.row.id)">删除</el-button>
                <el-button size="mini" type="info" @click="bizOptElementMoveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                <el-button size="mini" type="info" v-if="scope.$index < BizOptElementList.length -1"@click="bizOptElementMoveDown(scope)">下移</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div slot="footer" class="dialog-footer">
            <el-button @click="outerBizOptElementVisible = false">取 消</el-button>
          </div>

        </el-dialog>


      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .scroll_dialog{
    width: 1400px;
  }
  .content{
    margin-top: 15px;
    border:1px solid lightblue;
  }
  .main{
    padding: 15px;
  }
  .banner{
    float: left;
    width: 220px;
    height:450px;
    background: url('~@/assets/images/app.png') no-repeat;
    background-size: auto 100%;
    background-position: center;
  }
  .modalContent{
    width: 70%;
    margin: auto;
  label{
    margin: 10px 0;
  }
  }
  .tableBox{
    float: left;
    margin-left: 15px;
    width: calc(100% - 235px);
  }
  .end-title{
    border-bottom: 1px solid lightblue;
  }
  .addBanner{
    float: right;
    margin-bottom: 15px;
    display: block;
  i{margin-right: 4px}
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .pageTableContent{
    width: 980px;
    /*min-width: 980px;*/
    position: relative;
  .cover{
    position: absolute;
    width: 100%;
    height:100%;
    background: white;
    z-index: 10;
    top:0;
    left: 0;
    opacity: 0.5;
  }
  }
  .addScroll{
    margin: 0px auto 10px;
  }
</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import {bizModuleList,getBizModule,saveBizModule,delBizModule,changeModuleSeq,
    bizScrollList,getBizScroll,saveBizScroll,delBizScroll,changeScrollSeq,
    bizAppConfigList,getBizAppConfig,saveBizAppConfig,delBizAppConfig,changeBizAppConfigSeq,
    bizAppConfigListPlatForm,
    bizTemplateListAll,
    bizOptElementList,getBizOptElement,saveBizOptElement,delBizOptElement,changeBizOptElementSeq
  } from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
      return {
        tableData:[],
        bean:{
          workbenchId:1,
          id:null,
          seq:null,
          type:null,
          name:null,
          remark:null,
          groupName:null
        },
        isBusy: false,
        moduleVisible:false,

        ruleForm:{
          type:'',
          seq:'',
          name:''
        },
        rules: {
          type: [
            {required: true, message: '请输入模块类型', trigger: 'blur'}
          ],
          name:[
            { required: true, message: '请输入模块名称', trigger: 'blur' }
          ],
          seq:[
            { required: true,type: 'number', message: '请输入模块排序号', trigger: 'blur' }
          ]
        },

        outerScrollVisible:false,
        innerScrollVisible:false,
        scrollList:[],
        scroll:{
          id:null,
          moduleId:null,
          url:null,
          showText:null,
          duration:null,
          seq:null
        },

//        固定的spId，后面要根据实际情况获取
        fixedSpId:"17112815160820008975",
        outerBizAppConfigVisible:false,
        BizAppConfigList:[],
        BizAppConfigListPlatForm:[],
        innerBizAppConfigVisible:false,
        bizAppConfig:{
          id:null,
          moduleId:null,
          bizId:null,
          bizName:null,
          url:null,
          icon:null,
          remark:null,
          seq:null
        },

//        自定义业务数据
        outerBizOptElementVisible:false,
        innerBizOptElementVisible:false,
        BizTemplateList:[],
        BizOptElementList:[],
        bizOptElement:{
          id:null,
          moduleId:null,
          templateId:null,
          name:null,
          url:null,
          seq:null
        }


      }
    },
    methods: {
      init(){
        let _this=this;
        _this.isBusy=true;
        bizModuleList({"workBenchId":"1"}).then(res => {
          _this.tableData=res;
          _this.isBusy=false;
        });
      },
      //添加模块
      addModule(){
        this.bean={
          workbenchId:1,
          id:null,
          seq:null,
          type:null,
          name:null,
          remark:null,
          groupName:null
        };
        this.moduleVisible = true
        $(".modalContent input").removeAttr("readonly");
      },
      edit(item){
        this.bean={
          workbenchId:1,
          id:item.id,
          seq:item.seq,
          type:item.type,
          name:item.name,
          remark:item.remark,
          groupName:item.groupName
        };
        this.moduleVisible = true
        $(".modalContent input").removeAttr("readonly");
      },
      view(item){
        this.edit(item);
        $(".modalContent input").attr("readonly","readonly");
      },
      del(id){
        this.$confirm('确认删除？')
          .then(res => {
            delBizModule({id}).then(() => {
              this.$message.success('删除数据成功')
              this.moduleVisible = false
              this.init();
            })
          });
      },
      saveModule(){
        this.bean.seq=parseInt(this.bean.seq);
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            saveBizModule(this.bean).then(() => {
              this.$message.success('保存成功')
              this.moduleVisible = false
              this.init();
            })
          } else {
            return false;
          }
        });
      },
      closeDialog(){
        this.moduleVisible = false
      },
      moveUp(scope){
        var id1=this.tableData[scope.$index].id;
        var id2=this.tableData[scope.$index-1].id;
        this.changeSeq(id1,id2);
      },
      moveDown(scope){
        var id1=this.tableData[scope.$index].id;
        var id2=this.tableData[scope.$index+1].id;
        this.changeSeq(id1,id2);
      },
      changeSeq(id1,id2){
        changeModuleSeq({"id1":id1,"id2":id2}).then(() => {
          this.init();
        })
      },
      config(id){
        var _this=this;
        _this.isBusy = true;
        getBizModule({"id":id}).then(res => {
          switch (res.type){
            case "scrollModule":{
              _this.scroll.moduleId = id;
              bizScrollList({"moduleId": id}).then(itemres => {
                _this.scrollList = itemres;
                _this.outerScrollVisible = true;
                _this.isBusy = false;
              });
            } break;
            case "bizModule":{
              _this.bizAppConfig.moduleId=id;
              bizAppConfigList({"moduleId": id}).then(bizres => {
                _this.BizAppConfigList = bizres;
                _this.outerBizAppConfigVisible = true;
                _this.isBusy = false;
              });
              bizAppConfigListPlatForm({"spId": this.fixedSpId}).then(bizresPlat => {
                _this.BizAppConfigListPlatForm = bizresPlat;
                _this.outerBizAppConfigVisible = true;
                _this.isBusy = false;
              });
            }break;
            case "optModule":{
              _this.bizOptElement.moduleId=id;
              bizTemplateListAll().then(tempRes => {
                _this.BizTemplateList = tempRes;
                _this.outerBizOptElementVisible = true;
                _this.isBusy = false;
              });
              bizOptElementList({"moduleId": id}).then(optRes => {
                _this.BizOptElementList = optRes;
                _this.outerBizOptElementVisible = true;
                _this.isBusy = false;
              });

            }break;
            default:break;
          }
        });


      },
      addScroll(){
        this.scroll={
          id:null,
          moduleId:this.scroll.moduleId,
          url:null,
          showText:null,
          duration:null,
          seq:null
        };
        this.innerScrollVisible=true;
      },
      scrollEdit(item){
        this.scroll={
          id:item.id,
          moduleId:this.scroll.moduleId,
          url:item.url,
          showText:item.showText,
          duration:item.duration,
          seq:item.seq
        };
        this.innerScrollVisible=true;
        $(".scrollContent input").removeAttr("readonly");
      },
      scrollView(item){
        this.scrollEdit(item);
        $(".scrollContent input").attr("readonly","readonly");
      },
      saveScroll(){
        saveBizScroll(this.scroll).then(() => {
          this.$message.success('保存成功')
          this.innerScrollVisible = false
          this.config(this.scroll.moduleId)
        })
      },
      scrollDel(id){
        this.$confirm('确认删除？')
          .then(res => {
            delBizScroll({id}).then(() => {
              this.$message.success('删除数据成功')
              this.innerScrollVisible = false
              this.config(this.scroll.moduleId)
            })
          });
      },
      scrollMoveUp(scope){
        var id1=this.scrollList[scope.$index].id;
        var id2=this.scrollList[scope.$index-1].id;
        this.changeScrollSeq(id1,id2);
      },
      scrollMoveDown(scope){
        var id1=this.scrollList[scope.$index].id;
        var id2=this.scrollList[scope.$index+1].id;
        this.changeScrollSeq(id1,id2);
      },
      changeScrollSeq(id1,id2){
        changeScrollSeq({"id1":id1,"id2":id2}).then(() => {
          this.config(this.scroll.moduleId)
        })
      },

      addBizAppConfig(){
        this.bizAppConfig={
          id:null,
          moduleId:this.bizAppConfig.moduleId,
          bizId:null,
          bizName:null,
          url:null,
          icon:null,
          remark:null,
          seq:null
        }
        this.innerBizAppConfigVisible=true;
      },
      bizAppConfigEdit(item){
        this.bizAppConfig={
          id:item.id,
          moduleId:this.bizAppConfig.moduleId,
          bizId:item.bizId,
          bizName:item.bizName,
          url:item.url,
          icon:item.icon,
          remark:item.remark,
          seq:item.seq
        }
        this.innerBizAppConfigVisible=true;
        $(".bizAppConfigContent input").removeAttr("readonly");
      },
      bizAppConfigView(item){
        this.bizAppConfigEdit(item);
        $(".bizAppConfigContent input").attr("readonly","readonly");
      },
      saveBizAppConfig(){
        saveBizAppConfig(this.bizAppConfig).then(() => {
          this.$message.success('保存成功')
          this.innerBizAppConfigVisible = false
          this.config(this.bizAppConfig.moduleId)
        })
      },
      bizAppConfigDel(id){
        this.$confirm('确认删除？')
          .then(res => {
            delBizAppConfig({id}).then(() => {
              this.$message.success('删除数据成功')
              this.innerBizAppConfigVisible = false
              this.config(this.bizAppConfig.moduleId)
            })
          });
      },
      bizAppConfigMoveUp(scope){
        var id1=this.BizAppConfigList[scope.$index].id;
        var id2=this.BizAppConfigList[scope.$index-1].id;
        this.changeBizAppConfigSeq(id1,id2);
      },
      bizAppConfigMoveDown(scope){
        var id1=this.BizAppConfigList[scope.$index].id;
        var id2=this.BizAppConfigList[scope.$index+1].id;
        this.changeBizAppConfigSeq(id1,id2);
      },
      changeBizAppConfigSeq(id1,id2){
        changeBizAppConfigSeq({"id1":id1,"id2":id2}).then(() => {
          this.config(this.bizAppConfig.moduleId)
        })
      },


//      自定义业务数据编辑
      addBizOptElement(){
        this.bizOptElement={
          id:null,
          moduleId:this.bizOptElement.moduleId,
          templateId:null,
          name:null,
          url:null,
          seq:null
        }
        this.innerBizOptElementVisible=true;
      },
      bizOptElementEdit(item){
        this.bizOptElement={
          id:item.id,
          moduleId:this.bizOptElement.moduleId,
          templateId:item.templateId,
          name:item.name,
          url:item.url,
          seq:item.seq
        }
        this.innerBizOptElementVisible=true;
        $(".bizOptElementContent input").removeAttr("readonly");
      },
      bizOptElementView(item){
        this.bizOptElementEdit(item);
        $(".bizOptElementContent input").attr("readonly","readonly");
      },
      bizOptElementDel(id){
        this.$confirm('确认删除？')
          .then(res => {
            delBizOptElement({id}).then(() => {
              this.$message.success('删除数据成功')
              this.innerBizOptElementVisible = false
              this.config(this.bizOptElement.moduleId)
            })
          });
      },
      bizOptElementMoveUp(scope){
        var id1=this.BizOptElementList[scope.$index].id;
        var id2=this.BizOptElementList[scope.$index-1].id;
        this.changeOptElementSeq(id1,id2);
      },
      bizOptElementMoveDown(scope){
        var id1=this.BizOptElementList[scope.$index].id;
        var id2=this.BizOptElementList[scope.$index+1].id;
        this.changeOptElementSeq(id1,id2);
      },
      changeOptElementSeq(id1,id2){
        changeBizOptElementSeq({"id1":id1,"id2":id2}).then(() => {
          this.config(this.bizOptElement.moduleId)
        })
      },
      saveBizOptElement(){
        saveBizOptElement(this.bizOptElement).then(() => {
          this.$message.success('保存成功')
          this.innerBizOptElementVisible = false
          this.config(this.bizOptElement.moduleId)
        })
      }
    },
    created () {
      this.init();
    },
    components: {
      NavBar
    }
  }

</script>
