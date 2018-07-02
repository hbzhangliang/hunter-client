<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <h3 class="end-title">自定义业务模板配置</h3>
      <div class="main">
        <div class="banner">
          <!--<el-carousel trigger="click" height="450px"style="width: 250px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>-->
        </div>

        <div class="tableBox">
          <div class="pageTableContent">
            <el-button type="primary" class="addBanner" @click="addConfigElement"><i class="el-icon-plus"></i>添加模块元素</el-button>
            <el-table :data="configData" border width="100%">
              <!--<el-table-column prop="id"  label="层级" width="160px" v-show="false">-->
              <!--</el-table-column>-->
              <el-table-column prop="layer" label="层级" width="140px">
              </el-table-column>
              <el-table-column prop="name" label="名称" width="230px">
              </el-table-column>
              <el-table-column prop="url" label="url" width="440px">
              </el-table-column>
              <el-table-column prop="height" label="高度" width="120px">
              </el-table-column>
              <el-table-column prop="strChoose" label="默认选中" width="100px">
              </el-table-column>
              <el-table-column  label="操作" width="231px">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row,scope.row.id)">编辑</el-button>
                  <el-button type="text" @click="view(scope.row,scope.row.id)">查看</el-button>
                  <el-button type="text" @click="del(scope.$index,scope.row.id)">删除</el-button>
                  <!--<el-button type="text" @click="moveUp(scope)" v-if="scope.$index > 0">上移</el-button>-->
                  <!--<el-button type="text" v-if="scope.$index < configData.length -1"@click="moveDown(scope)">下移</el-button>-->
                </template>
              </el-table-column>
            </el-table>
            <!--<el-button type="primary" @click="savePage" style="margin: 15px auto;display: block">保存</el-button>-->
            <!--<div class="cover" v-show="tableVisible"></div>-->
          </div>
        </div>

      </div>
    </div>


    <!--弹出框-->
    <el-dialog title="请添加模块元素" :visible.sync="moduleVisible" size="tiny"
               @close="closeDialog">
      <div class="modalContent">
        <div class="demo-input-suffix">
          企业编号:<el-input v-model="configElement.spId" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
           层级:<el-input v-model="configElement.layer" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          名称:<el-input v-model="configElement.optConfig.name" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          url:<el-input v-model="configElement.optConfig.url" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          高度:<el-input v-model="configElement.optConfig.height" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          是否选中:
          <el-radio class="radio" v-model="configElement.optConfig.strChoose" label="1">是</el-radio>
          <el-radio class="radio" v-model="configElement.optConfig.strChoose" label="0">否</el-radio>
        </div>
      </div>
      <div style="text-align: center;margin-top: 25px">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveConfigElement">确定</el-button>
      </div>

    </el-dialog>

  </section>
</template>
<style lang="scss" scoped>


</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import { getSelfData,saveSelfData,delSelfData } from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
        return{
          colShow:false,
          configData:[],
          moduleVisible:false,
          configElement:{
              id:null,
              spId:"1c5d468652ba4af295f9dd83aa62e152",
              layer:1,
              optConfig:{
                name:"test",
                url:"www.baidu.com",
                height:80,
                choose:true,
                strChoose:"1"
              }
          }
        }
    },
    methods: {
      getConfigElementByspId () {
        console.log("info")
          var _this = this;
        _this.configData=[]
        getSelfData().then(res => {
            res.forEach(function (item,index) {
                var p={
                    spId:item.spId,
                    id:item.id,
                    layer:item.layer,
                    name:item.optConfig.name,
                    url:item.optConfig.url,
                    height:item.optConfig.height,
                    choose:item.optConfig.choose,
                  strChoose:item.optConfig.choose==true?"1":"0"
                }
              _this.configData.push(p)
            })
        })
      },
      addConfigElement(){
        this.moduleVisible = true
      },
      closeDialog(){
        this.moduleVisible = false
      },
      saveConfigElement(){
        if(this.configElement.optConfig.strChoose=="1"){
            this.configElement.optConfig.choose=true;
        }
        else this.configElement.optConfig.choose=false;
        saveSelfData(this.configElement).then(() => {
          this.$message.success('保存成功')
          this.moduleVisible = false
          this.getConfigElementByspId()
        })
      },
      del (index, id) {
        this.$confirm('确认删除？')
          .then(res => {
            delSelfData({id}).then(() => {
              this.$message.success('删除数据成功')
              this.moduleVisible = false
              this.getConfigElementByspId()
            })
          });
      },
      edit (item, id) {
        console.log("edit element");
        this.configElement={
          id:item.id,
            spId:item.spId,
            layer:item.layer,
            optConfig:{
            name:item.name,
              url:item.url,
              height:item.height,
              choose:item.choose,
              strChoose:item.strChoose
          }
        }
        this.moduleVisible = true
      },
      view(item,id){
          this.edit(item,id);
          $(".modalContent input").attr("readonly","readonly");
      },
      savePage(){

      }

    },
    created () {
      this.getConfigElementByspId()
    },
    components: {
      NavBar
    }
  }
</script>

