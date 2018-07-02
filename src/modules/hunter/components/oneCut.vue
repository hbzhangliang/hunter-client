<template>
  <section>
    <div>
      <label>栏目名字</label>
      <el-radio class="radio" v-model="name" :label="true">显示</el-radio>
      <el-radio class="radio" v-model="name" :label="false">隐藏</el-radio>
      <el-input v-model="nameData" placeholder="请输入内容" v-show="name" style="width: 150px;margin-left: 15px"></el-input>
    </div>
    <div>
      <label>数据来源</label>
      <el-input v-model="dataComming" placeholder="请选择" style="width: 250px;margin-left: 15px"></el-input>
      <el-button type="primary" class="addBanner" @click="isChose = true">选择</el-button>
    </div>
    <div v-show="isChose">
      <p style="margin-bottom: 15px;color: #97a8be">订购业务</p>
      <div>
        <label>业务展示</label>
        <el-radio class="radio" v-model="showBusiness" label="1">图标文字</el-radio>
        <el-radio class="radio" v-model="showBusiness" label="2">自定义模板</el-radio>
        <div class="businessContainer">
           <div class="icon-word" v-if="showBusiness === '1'">
             图标文字
           </div>
          <div class="selfModules" v-else>
            自定义模板
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        name: this.showName,
        nameData: '通知公告',
        dataComming: '',
        isChose: true,
        showBusiness: '1'
      }
    },
    props: {
      showName: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
<style scoped lang="scss">
  section{
    padding: 30px;
    border: 1px solid #dcdcdc;
    margin-top: 15px;
  }
  section>div{
    margin: 15px 0;
  }
  label{
    margin-right: 50px;
  }
  .businessContainer{
    border:1px solid #dcdcdc;
    padding: 30px;
    margin: 15px 0;
  }
</style>
