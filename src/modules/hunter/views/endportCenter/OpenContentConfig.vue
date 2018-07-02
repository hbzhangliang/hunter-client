<template xmlns:e-html="http://www.w3.org/1999/xhtml">
  <section style="padding: 0px 20px" v-loading.fullscreen="loading">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">

          <div class="tableBox">
            <div class="pageTableContent">
              <el-button size="small" type="primary" class="addBanner" @click="addOpenContent" style="margin-bottom: 10px;"><i class="el-icon-plus"></i>添加开放服务数据</el-button>
              <el-table
                :data="PageParams.data"
                border
                style="width: 100%"
                :resizable="false"
                :header-cell-style="{textAlign:'center'}">
                <!--<el-table-column prop="id"  label="层级" width="160px" v-show="false">-->
                <!--</el-table-column>-->
                <el-table-column label="终端基础能力ID" width="120px" align="center">
                  <template slot-scope="scope">
                  <div class="lineOne">{{scope.row.id}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="名称" width="160px" align="center">
                  <template slot-scope="scope">
                  <div class="lineOne">{{scope.row.name}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="类型" width="80px" align="center">
                  <template slot-scope="scope">
                    <div class="lineOne">{{scope.row.type=='Dingding'?'钉钉':scope.row.type=='Wechat'?'微信':'app'}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="发布时间" width="120px" align="center">
                  <template slot-scope="scope">
                    <div class="lineOne">{{scope.row.dateUpdated | dateFromat}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="状态" width="120px" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.status=='enable'" style="color: #00a0e9">启用</div>
                    <div v-if="!(scope.row.status=='enable')" style="color: red">禁用</div>
                  </template>
                </el-table-column>
                <!--<el-table-column label="服务介绍">-->
                  <!--<template slot-scope="scope">-->
                    <!--<div class="lineOne">{{scope.row.introduction}}</div>-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column  label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row,scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="view(scope.row,scope.row.id)">查看</el-button>
                    <el-button type="text" size="small" @click="del(scope.$index,scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click="changeServiceStatus(scope.row,'enable')" v-if="!(scope.row.status=='enable')">启用</el-button>
                    <el-button type="text" size="small" @click="changeServiceStatus(scope.row,'disable')" v-if="scope.row.status=='enable'">禁用</el-button>
                    <el-button type="text" size="small" @click="sort(PageParams.data[scope.$index-1],scope.row)" v-if="scope.$index!=0">上移</el-button>
                    <el-button type="text" size="small" @click="sort(scope.row,PageParams.data[scope.$index+1])" v-if="scope.$index!=(PageParams.data.length-1)">下移</el-button>
                    <el-button type="text" size="small" @click="preView(scope.row,scope.row.id)">预览</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="block mart-30">
              <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="PageParams.page"
                      :page-size="PageParams.pageSize"
                      layout="prev, pager, next, jumper"
                      :total="PageParams.tatalRows">
              </el-pagination>
            </div>
          </div>




          <!--弹出框-->
          <el-dialog custom-class="info"  width="1100px" title="添加开放服务内容" :visible.sync="moduleVisible" size="tiny"
                     @close="closeDialog">
            <div class="modalContent">
            <el-form label-width="90px">
              <el-form-item label="服务名称：" class="w-350">
                <el-input v-model="temp.name" placeholder="请输入内容" size="small"></el-input>
              </el-form-item>
              <!--<el-form-item label="编号：" class="w-350">-->
                <!--<el-input v-model="temp.code" placeholder="请输入内容" size="small"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="排序号：" class="w-350">-->
                <!--<el-input v-model="temp.seq" placeholder="请输入内容" size="small"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="能力属性：" class="w-350">
                <el-select v-model="temp.type" size="small" class="w-p-100">
                  <el-option value="Dingding" label="钉钉"></el-option>
                  <el-option value="Wechat" label="微信"></el-option>
                  <el-option value="UmsApp" label="app"></el-option>
                </el-select>
              </el-form-item>
              <!--<el-form-item label="服务介绍：" resize="none">-->
                <!--<el-input v-model="temp.introduction" type="textarea" placeholder="请输入内容" style="width:543px"></el-input>-->
              <!--</el-form-item>-->
            </el-form>
            <div class="components-container" style="margin-top: 10px;">
               <!--<button @click="getUEContent()">获取内容</button>-->
              <div class="editor-container" >
                <UE :defaultMsg=ueParams.defaultMsg :config=ueParams.config ref="ue"></UE>
              </div>
            </div>
            <!--</div>-->
              <div style="text-align: center;margin-top: 30px">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="saveOpenContent">确定</el-button>
              </div>
            </div>
          </el-dialog>

          <!--弹出框 查看-->
          <el-dialog custom-class="info"  width="1100px" :title="viewModuleName" :visible.sync="viewModuleVisible" size="tiny"
                     @close="viewModuleVisible = false">
            <div class="modalContent" id="viewCon">
              <div class="components-container" v-html="viewModuleContent">
                <!--<iframe src="" frameborder="0"></iframe>-->
              </div>
            </div>

            <span slot="footer" class="dialog-footer">
              <div style="text-align: center;margin-top: 30px">
                <el-button @click="viewModuleVisible = false">确定</el-button>
              </div>
            </span>
          </el-dialog>

        </div>
      </div>
    </div>
  </section>


</template>
<style>
.info{
  width: 1100px;
}
.info .el-dialog__header{
  border-bottom: 1px solid #d9d9d9;
}
@media (min-width: 1280px) {
  #viewCon{max-height: 400px;overflow: scroll}
}
@media (min-width: 1440px) {
  #viewCon{max-height: 430px;overflow: scroll}
}
@media (min-width: 1680px) {
  #viewCon{max-height: 470px;overflow: scroll}
}
@media (min-width: 1920px) {
  #viewCon{max-height: 500px;overflow: scroll}
}
.el-form-item{
  margin-bottom: 15px;
}

</style>

<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import { getOpenContentList,getOpenContent,saveOpenContent,delOpenContent,sortOpenServicetList,changeServiceStatus } from '@/api/api'
  import $ from 'jquery'

  import UE from '@/components/ueditor'

  export default{
    data () {
      return{
        loading:false,
        PageParams:{
          page:1,
          pageSize:10,
          tatalRows:10,
          totalPage:1,
          data:[]
        },
        temp:{
          id:null,
          code:null,
          name:null,
          content:null,
          strContent:null,
          seq:null,
          type:'Dingding',
        },
        moduleVisible:false,
        viewModuleVisible:false,
        viewModuleContent:'',
        viewModuleName:'',
        defaultPageSize:10,
        ueParams:{
          defaultMsg:"这里是UE数据",
          config: {
            initialFrameWidth: 0,
            initialFrameHeight: 300
          }
        },
        pageObj:{
          currentPage:'1'
        }
      }
    },
    methods:{
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
//        let content = this.$refs.ue.editor.getAllHtml();
//        console.log(content);
        this.temp.content=content;
//        this.$notify({
//          title: '获取成功，可在控制台查看！',
//          message: content,
//          type: 'success'
//        });
      },
      init(page,pageSize){
         var _this=this;
        _this.PageParams.data=[];
        _this.loading = true;
        getOpenContentList({"page":page,"pageSize":pageSize}).then(res => {
          _this.loading = false;
            _this.PageParams.page=res.page;
            _this.PageParams.pageSize=res.pageSize;
            _this.PageParams.tatalRows=res.tatalRows;
            _this.PageParams.totalPage=res.totalPage;
            _this.PageParams.data=res.data;
      });
    },
      handleSizeChange(item){
      },
      handleCurrentChange(item){
        this.pageObj.currentPage = item;
        this.init(item,this.defaultPageSize);
      },
      addOpenContent(){
        this.moduleVisible = true;
        this.temp={
          id:null,
          code:null,
          name:null,
          content:null,
          strContent:null,
          seq:null,
          type:'Dingding',

        }
//        this.ueParams.defaultMsg="";
        this.$nextTick(function () {
          this.$refs.ue.setUEContent("这是内容区域");
        })

      },
      closeDialog(){
        this.moduleVisible = false
      },
      edit (item, id) {
        this.temp={
          id:item.id,
          code:item.code,
          name:item.name,
          content:item.content,
          seq:item.seq,
          introduction:item.introduction,
          type:item.type,
        }
        this.$nextTick(function () {
          this.$refs.ue.setUEContent(this.temp.content);
        })
        this.moduleVisible = true
      },
      view(item,id){
//        this.edit(item,id);
//        $(".modalContent input").attr("readonly","readonly");
//        var newWindowObi=window.open('');
//        newWindowObi.document.write(item.content);
        this.viewModuleContent = item.content;
        this.viewModuleName = item.name;
        this.viewModuleVisible = true;
      },
      del (index, id) {
        var _this = this;
        this.$confirm('确认删除？')
          .then(res => {
            _this.loading = true;
            delOpenContent({id:id}).then(() => {
              _this.loading = false;
              this.$message.success('删除数据成功')
              this.moduleVisible = false
              this.init(1,this.defaultPageSize);
            })
          });
      },
      saveOpenContent(){
        var _this = this;
        this.getUEContent();
        _this.loading = true;
        saveOpenContent(this.temp).then(() => {
          _this.loading = false;
          this.$message.success('保存成功')
          this.moduleVisible = false
          this.init(1,this.defaultPageSize);
        })
      },
      /**
       * sort
       * @param
       * prevItem:(object)
       * nextItem:(object)
       * */
      sort:function (prevItem,nextItem) {
        console.log(prevItem);
        console.log(nextItem);
        var _this = this;
        _this.loading = true;
        sortOpenServicetList({id1:prevItem.id,id2:nextItem.id}).then(function (res) {
          _this.loading = false;
          _this.init(_this.pageObj.currentPage,_this.defaultPageSize);
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message,'提示')
        })
      },
      /**
       * 启用或者禁用
       * @param
       * status*/
      changeServiceStatus:function (item,status) {
        console.log(status);
        var _this = this;
        _this.loading = true;
        changeServiceStatus({id:item.id,status:status}).then(function (res) {
          _this.loading = false;
          _this.init(_this.pageObj.currentPage,_this.defaultPageSize);
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message,'提示');
        })
      },
        preView(item){
          // console.log(this.state)
          let url="http://mobile-doc.test61.ums86.com/#/base/app/"+item.name+"/"+item.id
          window.open(url)
        }
    },
    created () {
      this.init(1,this.defaultPageSize);
    },
    components: {
      NavBar,
      UE
    }
  }


</script>
