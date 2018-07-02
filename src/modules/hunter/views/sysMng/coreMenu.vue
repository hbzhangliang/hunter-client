<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">
        </div>


        <div class="tableBox">
          <div class="pageTableContent">
            <el-button type="primary" class="addBanner" @click="addMenu"><i class="el-icon-plus"></i>新增菜单</el-button>
            <el-table :data="PageParams.data" border width="100%">
              <el-table-column prop="code" label="编号" width="160px">
              </el-table-column>
              <el-table-column prop="name" label="名称" width="180px">
              </el-table-column>
              <el-table-column prop="aclKey" label="权限编号" width="200px">
              </el-table-column>
              <el-table-column prop="parentId" label="父节点" width="180px">
              </el-table-column>
              <el-table-column prop="seq" label="排序号" width="140px">
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="200px">
              </el-table-column>
              <el-table-column  label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row,scope.row.id)">编辑</el-button>
                  <el-button type="text" @click="view(scope.row,scope.row.id)">查看</el-button>
                  <el-button type="text" @click="del(scope.$index,scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="block">
          <span class="demonstration"></span>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="PageParams.page"
            :page-size="PageParams.pageSize"
            layout="prev, pager, next, jumper"
            :total="PageParams.tatalRows">
          </el-pagination>
        </div>

        <!--弹出框-->
        <el-dialog custom-class="info" title="管理菜单信息" :visible.sync="moduleVisible" size="tiny"
                   @close="closeDialog">
          <div class="modalContent">
            <div class="demo-input-suffix">
              编号:<el-input v-model="temp.code" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              名称:<el-input v-model="temp.name" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              权限编号:<el-input v-model="temp.aclKey" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              父节点:
              <el-input v-model="temp.parentId" placeholder="请选择" size="medium" readonly="readonly"></el-input>
              <el-tree :data="menuTree" :props="defaultTreeProps"
                     @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="demo-input-suffix">
              排序号:<el-input v-model="temp.seq" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              备注:<el-input v-model="temp.remark" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <!--</div>-->
            <div style="text-align: center;margin-top: 10px">
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveMenu">确定</el-button>
            </div>
          </div>
        </el-dialog>



      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>


</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import {menuList,getMenu,saveMenu,delMenu,menuTree} from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
      return {
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
          aclKey:null,
          parentId:null,
          seq:null,
          remark:null,
          dateCreated:null
        },
        moduleVisible:false,
        defaultPageSize:10,

        menuTree:[],
        defaultTreeProps:{
          children: 'children',
          label: 'label'
        }

      }
    },
    methods: {
      init(page,pageSize){
        var _this=this;
        _this.PageParams.data=[];
        menuList({"page":page,"pageSize":pageSize}).then(res => {
          _this.PageParams.page=res.page;
          _this.PageParams.pageSize=res.pageSize;
          _this.PageParams.tatalRows=res.tatalRows;
          _this.PageParams.totalPage=res.totalPage;
          _this.PageParams.data=res.data;
        });
      },
      handleCurrentChange(item){
        this.init(item,this.defaultPageSize);
      },
      closeDialog(){
        this.moduleVisible = false
      },
      addMenu(){
        this.moduleVisible = true;
        this.temp={
          id:null,
          code:null,
          name:null,
          aclKey:null,
          parentId:null,
          seq:null,
          remark:null,
          dateCreated:null
        }
      },
      edit (item, id) {
        this.temp={
          id:item.id,
          code:item.code,
          name:item.name,
          aclKey:item.aclKey,
          parentId:item.parentId,
          seq:item.seq,
          remark:item.remark,
          dateCreated:item.dateCreated
        }
        this.moduleVisible = true
        $(".modalContent input").removeAttr("readonly");
      },
      view(item,id){
        this.edit(item,id);
        $(".modalContent input").attr("readonly","readonly");
      },
      del (index, id) {
        this.$confirm('确认删除？')
          .then(res => {
            delMenu({id}).then(() => {
              this.$message.success('删除数据成功')
              this.moduleVisible = false
              this.init(1,this.defaultPageSize);
            })
          });
      },
      saveMenu(){
        saveMenu(this.temp).then(() => {
          this.$message.success('保存成功')
          this.moduleVisible = false
          this.init(1,this.defaultPageSize);
        })
      },
      initRootTree(){
          var _this=this;
          console.log("initRootTree")
        menuTree({}).then(res => {
            _this.menuTree=res;
        })
      },
      handleNodeClick(data) {
         console.log(data.id);
       this.temp.parentId=data.id;
      }
    },
    created () {
      this.init(1,this.defaultPageSize);
      this.initRootTree();
    },
    components: {
      NavBar
    }
  }

</script>
