<!-- Created by chunmingdeng on 2018/3/27 -->
<template>
  <div class="end-container" v-loading.fullscreen="loading">
    <div style="padding: 10px 0;">
      <NavBar></NavBar>
    </div>
    <div class="bgc-fff">
      <!--<div><span class="fs-24">概览</span></div>-->
      <div id="template-list">
        <div class="template-item marr-30 marb-30" v-for="item in templateList">
          <div class="template-item-l">
            <!--{{JSON.parse(item.preview).length&&JSON.parse(item.preview)[0].url}}-->
            <iframe class="customerIframe" :src="JSON.parse(item.preview).length?JSON.parse(item.preview)[0].url:''"
                    width="303" height="490" frameborder="0"
                    style="transform:  scale(0.5);transform-origin: 0 0;"></iframe>
          </div>
          <div class="template-item-r">
            <p style="word-break: break-all">{{item.name}}</p>
            <p><el-button type="primary" size="small" @click="action(1,item)">编辑</el-button></p>
            <p><el-button type="primary" size="small" @click="action(2,item)">删除</el-button></p>
            <p><el-button type="primary" size="small">预览</el-button></p>
          </div>
        </div>
        <!--新建-->
        <div class="template-item marr-30 marb-30 add-item cur-p" @click="newTemplate">
          <i class="el-icon-plus fs-24"></i>
          <span class="fs-14">新建</span>
        </div>
      </div>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageObj.currentPage"
        layout="total, prev, pager, next"
        :total="pageObj.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/navBar';
  import {getThemeListData,delTheme} from '@/api/api';
  export default {
    data: function () {
      return {
        loading:false,
        templateList:[],
        pageObj: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        }
      }
    },
    mounted:function () {
      this.getThemeListData();
    },
    methods:{
      newTemplate:function () {
        this.$router.push({path:'/base/newTheme'});
      },
      /**
       * get theme list*/
      getThemeListData:function () {
        var that = this;
        that.loading = true;
        getThemeListData({
          "page": that.pageObj.currentPage,
          "pageSize": "10",
          "filter" : {}
        }).then(function (res) {
          that.loading = false;
          that.templateList = res.data;
          that.pageObj.total = res.tatalRows;
        }).catch(function (err) {
          that.loading = false;
          that.$alert(err.message,"提示");
        })
      },
      /**
       * user click action
       * actionType:1 edit,2 delete*/
      action:function (actionType,item) {
        var that = this;
        switch (actionType){
          case 1:
            this.$router.push({path:'/base/newTheme',query:{id:item.id}})
            break;
          case 2:
            that.$confirm('你真的要执行删除操作吗？','提示').then(function (res) {
              that.loading = true;
              delTheme({
                id:item.id
              }).then(function (res) {
                that.loading = false;
                that.$message.success('删除成功！');
                that.getThemeListData();
              }).catch(function (err) {
                that.loading = false;
                that.$message.error('删除失败！');
              })
            }).catch(function (res) {
              that.$message.error('删除取消！');
            })
            break;
        }
      },

      /**
       * page change*/
      handleCurrentChange:function (e) {
        this.pageObj.currentPage = e;
        this.getThemeListData();
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
    display: flex;
  }
  .template-item{
    min-height: 275px;
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
  .template-item-l{
    width: 151px;
    height: 245px;
  }
  .template-item-r{
    width: 30%;
    margin-left:5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .template-item-r>p{
    margin-bottom: 15px;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }

</style>