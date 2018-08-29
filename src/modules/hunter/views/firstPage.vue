<template>
  <section>
this is main
    <el-button type="primary" @click="searchAll">查询所有</el-button>
    <el-dialog title="请登录系统" :visible.sync="loginDialog" size="tiny"
               width="28%"
               @close="closeLoginDialog">
      <div class="modalContent">
        <div class="demo-input-suffix">
          用户名:<el-input v-model="user.account" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          密码:<el-input v-model="user.pwd" placeholder="请输入内容" size="medium"></el-input>
        </div>
        <div class="demo-input-suffix">
          <span style="color: red">{{errorInfo}}</span>
        </div>
      </div>
      <div style="text-align: center;margin-top: 25px">
        <el-button type="primary" @click="login">确定</el-button>
      </div>

    </el-dialog>

  </section>
</template>
<script>
    import end from '@/common/js/utils.js'
  import {healthcheck,accountCheck,accountCheckInfo,accountListAll,accountInfo} from '@/api/api'
    import $ from 'jquery'
  export default{
    data () {
      return {
          loginDialog:false,
          user:{
              account:null,
              pwd:null
          },
          errorInfo:null
      }
    },
      methods:{
        healthCheck(){
            let _this=this
            healthcheck().then(p=>{
                accountInfo().then(v=>{
                    _this.$store.state.userInfo=v
                })
            }).catch(function (error) {
                _this.loginDialog=true
            });
        },
          closeLoginDialog(){
              this.loginDialog=false
          },
        login(){
            let _this=this
            console.log(this.user)
            accountCheckInfo(_this.user).then(p=>{
                if(null!=p){
                    _this.$store.state.userInfo=p
                    _this.loginDialog=false
                    console.log(p)
                }
                else {
                    _this.errorInfo="用户名或密码错误"
                }
            })

        },
        searchAll(){
            accountListAll().then(p=>{
                console.log(p)
            })
        }

      },
    components: {

    },
    watch: {

    },
    created () {
      this.healthCheck()
    }
  }
</script>
<style lang="scss" scoped>

</style>
