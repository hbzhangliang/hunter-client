<!-- Created by chunmingdeng on 2018/3/27 -->
<template>
  <section class="end-container" v-loading.fullscreen="loading">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <el-form label-width="120px" style="width: 800px">
          <el-form-item label="工作台模版名称" class="w-300">
            <el-input size="small" v-model="template.name"></el-input>
          </el-form-item>
          <el-form-item label="工作台模版描述" class="w-300">
            <el-input size="small" v-model="template.note"></el-input>
          </el-form-item>
          <el-form-item label="工作台模版上传">
            <Ue></Ue>
          </el-form-item>
          <el-form-item label="">
            <div class="tac">
              <el-button type="" size="small" class="w-120">取消</el-button>
              <el-button type="primary" size="small" class="w-120" @click="">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  import NavBar from '@/components/navBar'
  import Ue from '@/components/ueditor'
  import {} from '@/api/api'
  export default {
    data: function () {
      return {
        loading:false,
        template:{
          name:'test01',
          note:'测试',
          url:''
        },
        themePreview:''
      }
    },
    methods:{

    },
    components: {
      NavBar,Ue
    }
  }
</script>

<style>

</style>