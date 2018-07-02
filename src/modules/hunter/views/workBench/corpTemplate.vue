<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">
        </div>

        <p  style="margin: 5px 2px">
          <b>企业spId:</b> <el-input class="search_input" v-model="PageForm.params.spId" placeholder="请输入内容"></el-input>
          <el-button type="primary" icon="el-icon-search"  @click="searchBlck">搜索</el-button>
        </p>
        <div class="tableBox">
          <div class="pageTableContent">
            <el-button style="margin-bottom: 15px;margin-top: 10px;" type="primary" class="addBanner" @click="addBizTemplate" icon="el-icon-plus" circle>新  建</el-button>

            <el-button type="primary" class="addBanner" @click="delBatchBlock" icon="el-icon-delete" circle>删  除</el-button>
            <el-table :data="tableData" border width="100%" v-loading="isBusy">
              <el-table-column prop="id" label="编号" min-width="5%">
              </el-table-column>
              <el-table-column prop="code" label="编码" min-width="6%">
              </el-table-column>
              <el-table-column prop="name" label="名称" min-width="8%">
              </el-table-column>
              <el-table-column prop="img" label="图片" min-width="8%">
                <template slot-scope="scope">
                  <img :src="scope.row.img" style="width: 80px;height: 60px;"/>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" min-width="8%">
              </el-table-column>
              <el-table-column prop="spId" label="企业编号" min-width="6%">
              </el-table-column>
              <el-table-column prop="" label="模板Html块" min-width="6%">
                  <template slot-scope="scope">
                      <el-dropdown trigger="click" placement="bottom-end" style="margin-right: 10px;" @visible-change="showData(scope.row)">
                          <span class="el-dropdown-link qrSpan">预览</span>
                          <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item class="qr-item">
                                <div :id="generateId(scope.row.id)" style="width:260px;height:260px;"></div>
                              </el-dropdown-item>
                          </el-dropdown-menu>
                      </el-dropdown>
                  </template>
              </el-table-column>
              <el-table-column prop="" label="状态" min-width="8%">
                <template slot-scope="scope">
                  <a v-if="scope.row.status=='publish'" style="color: green;font-size: large">发布</a>
                  <a v-else>保存</a>
                </template>
              </el-table-column>
              <el-table-column  label="操作" min-width="10%">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                  <el-button type="text" @click="del(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="block">
          <span class="demonstration"></span>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="PageForm.page"
            :page-size="PageForm.pageSize"
            layout="prev, pager, next, jumper"
            :total="PageForm.totalRows">
          </el-pagination>
        </div>

        <!--弹出框-->
        <el-dialog custom-class="info" title="自定义模板" :visible.sync="moduleVisible" size="tiny"
                   @close="closeDialog">
          <div class="modalContent">
            <div class="demo-input-suffix">
              编码:<el-input v-model="temp.code" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              名称:<el-input v-model="temp.name" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              备注:<el-input v-model="temp.remark" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              数据:<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="temp.data" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              img:<el-input v-model="temp.img" placeholder="请输入内容" size="medium" class="hidden"></el-input>
              <el-upload
                      action=""
                      list-type="picture"
                      :on-preview="handlePictureCardPreview"
                      :before-upload="beforeUpload"
                      :file-list="fileList"
                      :on-remove="handleRemove">
                <el-button size="small" type="primary" style="float: left;" >点击上传</el-button>
              </el-upload>
            </div>
            <div class="demo-input-suffix">
              状态:
              <el-radio v-model="temp.status" label="publish">发布</el-radio>
              <el-radio v-model="temp.status" label="store">保存</el-radio>
            </div>
            <!--</div>-->
            <div style="text-align: center;margin-top: 10px">
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveBizTemplate">确定</el-button>
            </div>
          </div>
        </el-dialog>


      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .search_input{
    width:24%;
    margin: 0 auto;
  }

  .floatImgDiv{
    position: absolute;
    left: 40%;top: 20%;
    width: 300px;height: 300px;
  }
</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import {fileUpload,blockList,blockSave,blockGet,blockDel} from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
      return {
          fileList:[],
        tableData:[],
        temp:{
          id:null,
          name:null,
          code:null,
          remark:null,
          img:null,
          spId:null,
          data:null,
            flag:null,
            status:null
        },
        moduleVisible:false,
        defaultPageSize:10,
        isBusy: false,

        PageForm:{
          page:1,
          pageSize:10,
          totalRows:null,
          totalPage:null,
          params:{
            name:null,
            type:null
          }
        }

      }
    },
    methods: {
      init(page,pageSize){
          // this.fileList=[]
        var _this=this;
        _this.isBusy=true;
        _this.tableData=[];
        _this.PageForm.page=page;
        _this.PageForm.pageSize=pageSize;
          blockList(_this.PageForm).then(res => {
              console.log(res)
          _this.tableData=res.data;
          _this.PageForm.totalRows=res.tatalRows;
          _this.PageForm.totalPage=res.totalPage;
          _this.isBusy=false;
        });
      },
        searchBlck(){
        this.init(1,this.defaultPageSize);
      },
      handleCurrentChange(item){
        this.init(item,this.defaultPageSize);
      },
      addBizTemplate(){
          this.temp={
              id:null,
              name:null,
              code:null,
              remark:null,
              img:null,
              spId:null,
              data:null,
              flag:null,
              status:null
          }
          this.fileList=[]
        this.moduleVisible = true
        $(".modalContent input").removeAttr("readonly");
      },
      edit(item){
          this.temp={
              id:item.id,
              name:item.name,
              code:item.code,
              remark:item.remark,
              img:item.img,
              spId:item.spId,
              data:item.data,
              flag:item.flag,
              status:item.status
          },
            this.fileList=[]
          this.fileList.push({
              name:"",
              url:this.temp.img
          })
          this.moduleVisible = true
        $(".modalContent input").removeAttr("readonly");
      },
      del(id){
        let ids=[]
        ids.push(parseInt(id))
        this.$confirm('确认删除？')
          .then(res => {
              blockDel({ids:ids}).then(() => {
              this.$message.success('删除数据成功')
              this.moduleVisible = false
              this.init(1,this.defaultPageSize);
            })
          });
      },
      saveBizTemplate(){
          blockSave(this.temp).then(() => {
          this.$message.success('保存成功')
          this.moduleVisible = false
          this.init(1,this.defaultPageSize);
        })
      },
      closeDialog(){
        this.moduleVisible = false
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
                _this.temp.img=res
            })
        },
        delBatchBlock(){
          console.log("ddd")
        },
        generateId(id){
          return id;
        },
        showData(item){
          let id=item.id
          $("#"+id).html(item.data)
        }

    },
    created () {
      this.init(1,this.defaultPageSize);
    },
    components: {
      NavBar
    }
  }

</script>
