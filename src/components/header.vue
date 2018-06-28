<template>
  <header class="header-default">
    <div class="container">
      <el-row>
        <el-col :span="12">
          <div class="navbar-brand" @click="backHome">
            <img class="navbar-logo" src="~@/assets/images/logo.png" alt="">
            <span class="navbar-tit">终端运营管理后台<span class="rt"></span></span>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <div  v-if="isLogin">
            <el-tooltip placement="top" effect="light">
              <div slot="content">
                  <h1 style="font-size: large">企业信息</h1>
                  <p>企业编号:{{spCode}}</p>
                  <p>企业名称:{{spName}}</p>
                  <!--<h1 style="font-size: large">用户信息</h1>-->
                  <!--<p>用户编号:{{userId}}</p>-->
                  <!--<p>用户名称:{{userName}}</p>-->
                  <!--<p>手机:{{mobile}}</p>-->
                  <h1 style="font-size: large">成员信息</h1>
                  <p>成员编号:{{memberId}}</p>
                  <p>成员名称:{{memberName}}</p>
                  <p>手机:{{mobile}}</p>
              </div>
              <el-button style="height: 26px;background: transparent;color: white;border: none">{{memberName}}</el-button>
            </el-tooltip>
            <!--<span style="color: white">企业编号:{{spCode}},企业名称:{{spName}},成员名:{{memberName}}</span>-->
            <el-button type="text" class="c-white" @click="logout">退出</el-button>
          </div>
          <div v-else="isLogin">
            <el-button  type="text" @click="login" class="c-white">登陆</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
    import $ from 'jquery'
    import {mapMutations} from 'vuex'
    import {getTokenInfo,corpDetail} from '@/api/api'
    export default {
        data () {
            return {
                token:null,
                isLogin:false,
                memberId:null,
                memberName:null,
                spId:null,
                spCode:null,
                spName:null,
                userId:null,
                userName:null,
                mobile:null,
                city:null,
                contactName:null,
                contactPhone:null,
                redirectUrl:null,
                baseUrl:null
            }
        },
        methods: {




        },
        created () {

        }
    }
</script>
<style lang="scss">
  @import  '../style/public.scss';
  .login-btn{
    padding: 9px 15px;
    /*color:white;*/
    font-weight: bold;
    /*background-color: #646d78;*/
    /*border-color: #646d78;*/
  }
  .header-default {
    width: 100%;
    text-align: center;
    height: 64px;
    /*padding: 5px 0;*/
    background-color: $blue;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .04);
    position: relative;
    z-index: 2;
    min-width: 1200px;
  }
  .navbar-brand {
    cursor: pointer;
    float: left;
    /*padding: 15px;*/
    padding-bottom: 0;
    font-size: 18px;
    height: 45px;
    line-height: 30px;
    color: #777;
    .navbar-logo {
      height: 45px;
      vertical-align: middle;
      margin-top: -26px;
    }
    .navbar-tit {
      padding-left: 10px;
      margin-left: 10px;
      //border-left: 1px solid #ccc;
      display: inline-block;
      max-width: 500px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 22px;
      color:$white;
      position: relative;
      margin-top: 3px;
      .rt{
        position: relative;
        top:-22px;
        font-size: 12px;
        color:white;
      }
    }
  }

  .headnav-btn {
    line-height: 30px;
    text-align: right;
    padding-right: 20px;
  }

  .headnav-btn ul {
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background: white;
    text-align: center;
    width: 120px;
    display: inline-block;
  }

  .headnav-btn ul li:hover {
    background: #eaeefb;
    cursor: pointer;
  }

  .headnav-btn > p.username:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .container{
    width: 97%!important;
    margin: 0 auto;
    padding-top: 15px;
    padding-buttom: 15px;
  }
</style>
