<template>
    <div class="content-list" >
    	<div class="filter" style="display:none">
	        <el-form  :model="contentListFilter" label-width="auto"  :inline="true"> 
	          <el-form-item label="状态">
	            <el-select  placeholder="请选择状态" size="small" v-model="contentListFilter.isUse">
	              <el-option label="开放" value="1"></el-option>
	              <el-option label="屏蔽" value="2"></el-option>
	            </el-select>
	          </el-form-item> 
	          <el-form-item label="内容类型">
	            <el-select  placeholder="请选择内容类型" size="small" v-model="contentListFilter.type">
	              <el-option label="外链" value="OUTLINE"></el-option>
	              <el-option label="非外链" value="FILLCONTENT"></el-option>
	            </el-select>
	          </el-form-item>  
	          <el-form-item label="关键字">
	              <el-input placeholder="请输入文章标题搜索" class="w-250" size="small" v-model="contentListFilter.title" ></el-input>
	              <el-button  @click="search" size="small" type="primary" style="width:80px;">搜索</el-button>
	          </el-form-item>
	        </el-form>
        </div>
        <el-button type="primary"  size="small" class="new" @click="createContent"><i class="el-icon-plus"></i><span>新建</span></el-button>
        <el-table
        :data="contentListData"
        style="width: 100%">
        <!-- <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column> -->
        <el-table-column
          prop="id"
          label="文章ID">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
          <template slot-scope="scope">
             <span v-show="scope.row.type == 'OUTLINE'">外链</span>
             <span v-show="scope.row.type == 'FILLCONTENT'">非外链</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isUse"
          label="状态">
          <template slot-scope="scope">
             <span v-show="scope.row.isUse == '1'">开放</span>
             <span v-show="scope.row.isUse == '0'">屏蔽</span>
          </template>
        </el-table-column>
        <el-table-column
          width='180px'
          label="推送端|栏目">
           <template slot-scope="scope">
               <div v-for="(item,index) in scope.row.releaseList">
               	   {{item.terminalName}}-{{item.colName}}
               </div>
          </template> 
        </el-table-column>
        <el-table-column
          width='180px'
          label="创建人|发布时间">
          <template slot-scope="scope">
              {{scope.row.createBy}}|
              {{scope.row.createTime?scope.row.createTime:'--'  | formatTime('yyyy-MM-dd hh:mm')}} 
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
             <el-button type="text" @click="editContent(scope.row)">编辑</el-button>
              <!-- 内容状态（isUse）1开放0-屏蔽 -->
             <el-button type="text" v-show='scope.row.isUse == 1' @click="goPublish(scope.row)">发布</el-button>
             <el-button type="text" v-show='scope.row.isUse == 0' @click="modifyStatus(scope.row,1,'是否开放？')">开放</el-button>
             <el-button type="text" v-show='scope.row.isUse == 1' @click="modifyStatus(scope.row,0,'屏蔽后内容将不能访问。是否确认屏蔽？')">屏蔽</el-button>
             <el-button type="text" @click="delCon(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--pagination-->
      <pagination
        v-show="contentListData.length"
        :total="total"
        :pageSize="pageSize"
        @current-change="currentChange"
        @sizeChange="sizeChange">
      </pagination>
      <!--pagination end-->

      <publish-dialog 
       :isDialogVisible="isDialogVisible"
       :id='id'
       @handelClose="isDialogVisible=false">
       </publish-dialog>

       <content-status-dialog
        :statusDialogVisible="statusDialogVisible"
        :id='id'
        :status="status"
        :text="text"
        @statusHandelClose="statusHandelClose">
       </content-status-dialog>

       <content-del-dialog
       :delDialogVisible="delDialogVisible"
       :id='id'
       @delHandelClose="delHandelClose"
       >
       </content-del-dialog>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
Vue.use(axios);
import {getListColContent} from '@/api/api'
import publishDialog from './components/publishDialog.vue'
import contentStatusDialog from './components/contentStatusDialog.vue'
import contentDelDialog from './components/contentDelDialog.vue'
import pagination from './components/pagination.vue'
export default {
  name: "content-list",
  data() {
    return {
      contentListFilter: {
        //搜索数据
        isUse: null, //内容状态
        type: null, //内容类型
        title: null //标题
      },
      contentListData:[],
      id: '',
      total: 0,
      curPage: 1,
      pageSize: 10,
      isDialogVisible: false,
      statusDialogVisible:false,
      status:'',
      text:'',
      delDialogVisible:false
    };
  },
  components:{
    publishDialog,
    contentStatusDialog,
    contentDelDialog,
    pagination
  },
  created() {
    this.getList();
  },
  methods: {
    search() {
      this.getList(this.contentListFilter);
    },
    //获取列表
     getList2: async function (){
        try{

            let fault = {
              "page": this.curPage,
              "pageSize": this.pageSize,
            };
            let searchFilter = {
                // type: this.contentListFilter.type,
                // isUse: this.contentListFilter.isUse,
                // title: this.contentListFilter.title,
            }
            let param = Object.assign(fault, {filter: searchFilter});
            //debugger;
            this.contentListData  = getListColContent(param);
           // console.log("1111"+getListColContent(param).data)
           
           // this.contentListData = res.data.data|| [];


            // getListColContent(param)
            //     .then(res => {
            //     //this.contentListData = res.data.data|| [];
            //     this.id = this.contentListData.id;
            //     this.total = res.tatalRows;
            //   })
            //   .catch(function(err) {
            //   });
        }catch (e){
           // this.$message.error('添加失败')
           //console.log(e)
       }
    },
    getList() {
      let fault = {
        "page": this.curPage,
        "pageSize": this.pageSize,
      };
      let searchFilter = {
          // type: this.contentListFilter.type,
          // isUse: this.contentListFilter.isUse,
          // title: this.contentListFilter.title,
      }
      let param = Object.assign(fault, {filter: searchFilter});
      axios
        .post("/api/colContent-manager/listColContent", param, {})
        .then(res => {
          this.contentListData = res.data.data|| [];
          this.id = this.contentListData.id;
          this.total = res.data.tatalRows;
        })
        .catch(function(err) {

        });
    },
    //状态修改
    modifyStatus(row,status,text){
       this.statusDialogVisible =true;
       this.id = row.id;
       this.status = status;
       this.text = text;
    },
    statusHandelClose(){
        this.statusDialogVisible = false;
        this.getList();
    },
    //删除
    delCon(row){
      this.delDialogVisible= true;
      this.id = row.id;
    },
    delHandelClose(){
         this.delDialogVisible = false;
         this.getList();
    },
    //发布
    goPublish(row){
      this.isDialogVisible= true;
      this.id = row.id;
    },
    //新增内容
    createContent(){
     this.$router.push({ path: `createContent`});
    },
    //编辑内容
    editContent(row){
     this.$router.push({path:'editContent',query:{id:row.id}});
    },
    currentChange(num){
      this.curPage = num;
      this.getList();
    },
    sizeChange(num){
      this.pageSize = num;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.content-list{
   padding: 30px 40px;
   position: relative;
   .new{
   	width:100px;
   	margin-bottom:20px;
   }
   .filter{
    float:right;
  }
  // table
  .el-table__header{
     th{
        background:#f2f2f7;
        padding: 8px 0px;
        border-right: 1px solid #fff;
     }
  }
  .el-table__body{ 
    td{
        padding:0px 5px;
     }
  }
  //table
  .el-pagination{
    text-align:right;
  }
}
</style>