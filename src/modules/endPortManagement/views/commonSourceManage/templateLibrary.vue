<!-- Created by chunmingdeng on 2018/3/27 -->
<template>
  <div class="end-container" v-loading.fullscreen="loading">
    <!--<div style="padding: 10px 0;">-->
      <!--<NavBar></NavBar>-->
    <!--</div>-->
    <div class="bgc-fff">
      <!--<div><span class="fs-24">概览</span></div>-->
      <div id="template-list">
        <div class="template-item marr-30 marb-30" v-for="item in templateList">
          <div class="content">
            1
          </div>
          <div class="template-item-footer">
            <div class="template-item-footer-l">
              <el-form label-width="90px" size="small">
                <el-form-item label="模版ID"></el-form-item>
                <el-form-item label="模版名称"></el-form-item>
              </el-form>
            </div>
            <div class="template-item-footer-r">
              <p><el-button type="text" size="small">编辑</el-button></p>
              <p><el-button type="text" size="small">删除</el-button></p>
            </div>
          </div>
        </div>
        <!--新建-->
        <div class="template-item marr-30 marb-30 add-item cur-p" @click="newTemplate">
          <i class="el-icon-plus fs-24"></i>
          <span class="fs-14">新建</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/navBar'
  export default {
    data: function () {
      return {
        loading:false,
        templateList:[1,2,3,4,5,6]
      }
    },
    methods:{
      newTemplate:function () {
        this.$router.push({path:'/base/newTemplate'});
      }
    },
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  #template-list{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .template-item{
    width: 28%;
  }
  .template-item{
    min-height: 150px;
    border:1px solid #eeeeee;
    border-radius: 3px;
    padding:15px;
  }
  .add-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .template-item>.content{
    min-height: 100px;
  }
  .template-item-footer{
    display: flex;
  }
  .template-item-footer-l{
    width: 70%;
  }
  .template-item-footer-r{
    width: 30%;
  }
  .template-item-footer-l>p,.template-item-footer-r>p{
    padding:9px 15px;
  }
  .template-item-footer-r button{
    padding: 0!important;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }

</style>
