<template>
    <div class="column-list-app">
      <el-table
        :data="columnListData"
        style="width: 100%">
        <el-table-column
          prop="id"
          align="center"
          label="栏目ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="栏目名称">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述"
          width="250">
        </el-table-column>
        <!-- <el-table-column
          prop="spName"
          align="center"
          label="所属企业">
        </el-table-column> -->
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
             <span v-show="scope.row.status == 'on'"><i class="el-icon-success icon"></i>开启</span>
             <span v-show="scope.row.status == 'off'"><i class="el-icon-warning icon"></i>关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="栏目数据类型">
          <template slot-scope="scope">
             <span v-show="scope.row.type == 'INTERFACE'">接口</span>
             <span v-show="scope.row.type == 'OPEN'">开放</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="创建人">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
             <el-button type="text"  @click="detail(scope.row)">查看</el-button>
             <span v-if="scope.row.status == 'on'">
              <!-- 0-关闭1-开启 -->
               <el-button type="text"  @click="modifyStatus(scope.row,0,'确认关闭？')">关闭</el-button>
             </span>
             <span v-if="scope.row.status == 'off'">
               <el-button type="text" @click="modifyStatus(scope.row,1,'确认开启？')">开启</el-button>
             </span>
             <el-button type="text" @click="createContent">新增内容</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--pagination-->
      <pagination
        v-show="columnListData.length"
        :total="total"
        :pageSize="pageSize"
        @current-change="currentChange"
        @sizeChange="sizeChange">
      </pagination>
      <!--pagination end-->

      <column-status-dialog
        :statusDialogVisible="statusDialogVisible"
        :id="id"
        :status="status"
        :text="text"
        @statusHandelClose="statusHandelClose"
      ></column-status-dialog>
    </div>
</template>

<script>
import {getTerminalList,getListCol} from '@/api/api'
import columnStatusDialog from './components/columnStatusDialog.vue'
import pagination from './components/pagination.vue'
export default {
  name: "column-list",
  data() {
    return {
      columnListFilter: {
        //搜索数据
        status: "", //状态On/off
        type: "", //数据类型INTERFACE:接口OPEN：开放
        name: "", //名称
        terminalId:'1',//终端类型app/微信/门户等，目前是app
      },
      columnListData:[],
      id:'',
      total: 0,
      curPage: 1,
      pageSize: 10,
      target:[],
      targetOptions:[],
      statusDialogVisible:false,
      status:'',
      text:'',
    };
  },
  components:{
    columnStatusDialog,
    pagination
  },
  created() {
    this.getList();
    getTerminalList({"catagoryName":"terminal"}).then(r=>{
      this.targetOptions = r;
      console.log(r[0])
      this.target = [r[0].id]
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    //获取列表
    getList() {
      let fault = {
        "page": this.curPage,
        "pageSize": this.pageSize,
      };
      let searchFilter = {
          type: this.columnListFilter.type,
          status: this.columnListFilter.status,
          name: this.columnListFilter.name,
          //terminalId: this.target.join(','),
          terminalId: this.columnListFilter.terminalId,
      }
      let param = Object.assign(fault, {filter: searchFilter});
      getListCol(param)
        .then(res => {
          this.columnListData = res.data|| [];
          this.id = this.columnListData.id;
          this.total = res.tatalRows;
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
       console.log(this.id)
    },
    statusHandelClose(){
         this.statusDialogVisible = false;
         this.getList();
    },
    //新增内容
    createContent(){
     this.$router.push({ path: `createContent`});
    },
    //查看详情
    detail(row){
      this.$router.push({path:'columnContentList',query:{id:row.id}});
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
.column-list-app {
  padding: 30px 40px;
  position: relative;
  .filter{
    float:right;
  }
  .el-form-item {
    margin:0 0 20px 5px !important;
  }
  .new-col {
    position: absolute;
    top: 35px;
    left: 40px;
  }
  .el-pagination{
    text-align:right;
  }
  .icon{
    font-size: 14px;
    margin-right:5px;
    &.el-icon-success{
       color:#71c200;
    }
    &.el-icon-warning{
      color:#f06d6a;
    }
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
}
</style>