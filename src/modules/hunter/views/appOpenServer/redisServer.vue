<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">
            <div style="margin: 5px 0px 10px 0px">
              <el-input v-model="key" placeholder="请输入内容" size="medium" style="width: 360px"></el-input>
              <el-button type="primary" @click="redisSearch">查询</el-button>
            </div>
             <div id="keyArea" style="background: whitesmoke;color: dodgerblue;width: 40%;height: 300px;overflow: scroll;float: left">
               <el-tree   v-loading="isBusy"  ref="tree" show-checkbox :data="keys" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
             </div>

              <el-input  rows="12" style="width: 55%;height: 300px;vertical-align: top" type="textarea" v-model="value"></el-input>

          <el-button type="danger" round @click="dekKeys">删除选中项</el-button>
        </div>

      </div>
    </div>

  </section>
</template>
<style lang="scss" scoped>

</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import { redisList,redisValue,redisDelKey } from '@/api/api'

  import $ from 'jquery'

  export default{
    data () {
       return{
           key:"",
         keys:[],
         value:null,
         delKeys:[],
         isBusy: false
       }
    },
    methods:{
      redisSearch(){
          var _this=this;
          this.keys=[];
          this.isBusy=true;
          console.log("dddd")
        redisList({"key":this.key}).then(res => {
          res.forEach(function (item,index) {
              var tmp={
                label:item
              }
              _this.keys.push(tmp);
          });
        });
        this.isBusy=false;
      },
      handleNodeClick(item){
          var _this=this;
        var tmpKey=item.label;
        redisValue({"key":tmpKey}).then(res=>{
            if(undefined==res){
                _this.value='redis取出数据格式出错';
            }else
           _this.value=res;
        });
      },
      dekKeys(){
          var _this=this;
          if(this.$refs.tree.getCheckedNodes().length<1){
            this.$message({
              message: '请选择需要删除的keys值，至少一项',
              type: 'warning'
            });
            return;
          }
        this.$confirm('此操作将删除此缓存键值, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         $.each(this.$refs.tree.getCheckedNodes(),function (index,item) {
            _this.delKeys.push(item.label);
            _this.keys.splice($.inArray(item.label,_this.keys),1);

          });
            redisDelKey({"key":_this.delKeys}).then(res=>{
              _this.$message({
                message: '删除redis数据成功',
                type: 'success'
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }

    },
    created () {

    },
    components: {
      NavBar
    }
  }
</script>
