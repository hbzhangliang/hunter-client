<template>
  <section>
    <el-dialog title="请登录系统" :visible.sync="loginDialog" size="tiny" :show-close="false"
               width="28%"
               @close="closeLoginDialog">

      <el-form :model="user" :rules="userRules" ref="user" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="user.account" prefix-icon="el-icon-mobile-phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="user.pwd" type="password"  prefix-icon="el-icon-view"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('user')">登录</el-button>
          <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
      </el-form>
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
          userRules: {
              account: [
                  {required: true, message: '请输入账号', trigger: 'blur'},
                  {min: 5, max: 30, message: '长度最少6个字符', trigger: 'blur'}
              ],
              pwd: [
                  {required: true, message: '请输入密码', trigger: 'blur'},
                  {min: 1, max: 30, message: '长度最少6个字符', trigger: 'blur'}
              ],
          }
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
            this.loginDialog=true
          },
        login(formName){
            let _this=this

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    accountCheckInfo(_this.user).then(p=>{
                        if(null!=p){
                            _this.$store.state.userInfo=p
                            _this.loginDialog=false
                        }
                        else {
                            _this.$message.error('账号或密码错误');
                        }
                    }).catch(function (error) {
                        _this.$message.error('后端错误:'+error.message);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
          resetForm(formName){
              this.$refs[formName].resetFields();
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
