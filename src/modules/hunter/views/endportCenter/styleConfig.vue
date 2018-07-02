<template>
  <section class="end-container">
    <nav-bar></nav-bar>
    <div class="content" style="overflow: visible">
      <div class="left">
        <h3 class="end-title">启动图</h3>
        <div class="banner">
          <span class="uploadImg"></span>
        </div>
        <div class="editImgBox">
          <button class="end-button-primary">修改</button>
          <span>上传图片建议尺寸750*1334,png格式，不超过300k。</span>
        </div>
      </div>
      <div class="right">
        <h3 class="end-title">登录页</h3>
        <div class="banner">
          <span class="uploadImg"></span>
        </div>
        <div class="editImgBox">
          <p style="margin-bottom: 30px">背景图</p>
          <button class="end-button-primary">修改</button>
          <span>上传图片建议尺寸750*1334,png格式，不超过300k。</span>
          <p style="margin-top: 80px;margin-bottom: 10px">登录框</p>
          <div class="appInputStyle">
            <img src="~@/assets/images/mobile.png">
            <input type="text" readonly placeholder="请输入手机号码"/>
          </div>
          <div class="appInputStyle">
            <img src="~@/assets/images/password.png">
            <input type="text" readonly placeholder="请输入密码"/>
          </div>
          <colorPicker v-model="colorApp" v-on:change="headleChangeColorApp" btnName="图标选中颜色"></colorPicker>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>

    <div class="content" style="overflow: visible">
      <h3 class="end-title" style="margin-bottom: 15px">首页-工作台头部&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <el-radio class="radio" v-model="radio" label="1">显示</el-radio>
        <el-radio class="radio" v-model="radio" label="2">隐藏</el-radio>
      </h3>
      <div class="workBenchHead">
        <label>企业logo</label>
        <span class="logoPic"></span>
        <el-button type="primary">修改头像</el-button>
        <el-radio class="radio" v-model="radio2" label="show">显示</el-radio>
        <el-radio class="radio" v-model="radio2" label="hide">隐藏</el-radio>
      </div>
      <div class="workBenchHead choseColor">
        <label>顶部颜色</label>
        <input type="text" class="end-input" readonly v-model="color">
        <colorPicker v-model="color" v-on:change="headleChangeColor"></colorPicker>
      </div>
    </div>
    <div class="content">
      <h3 class="end-title">底部菜单配置</h3>
      <div style="padding: 20px">
        <el-table :data="tableData" border width="100%">
          <el-table-column type="index" label="排序" width="80">
          </el-table-column>
          <el-table-column prop="text" label="文本" width="150">
          </el-table-column>
          <el-table-column label="常规图标" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.icon" class="menuIcon"/>
            </template>
          </el-table-column>
          <el-table-column prop="iconActive" label="选中图标" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.iconActive" class="menuIcon"/>
            </template>
          </el-table-column>
          <el-table-column label="默认选中" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.defaultChose" class="use">是</span>
              <span v-if="!scope.row.defaultChose" class="notuse">否</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.status" class="notuse">禁用</span>
              <span v-if="!scope.row.status" class="use">启用</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="notAllowd(scope.row.id)">禁用</el-button>
              <el-button type="text" @click="del(scope.row.id,scope.$index)">删除</el-button>
              <el-button type="text" @click="moveUp(scope)" v-if="scope.$index > 0">上移</el-button>
              <el-button type="text" v-if="scope.$index < tableData.length -1"@click="moveDown(scope)">下移</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </section>
</template>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import colorPicker from '@/components/vue-color-picker/colorPicker'
  export default{
    data () {
      return {
        radio: '1',
        radio2: 'show',
        tableData: [
          {text: '消息', icon: require('@/assets/images/styleConfig/消息.svg'), iconActive: require('@/assets/images/styleConfig/消息_1.svg'), defaultChose: 0, status: 0},
          {text: '提醒', icon: require('@/assets/images/styleConfig/会议通知.svg'), iconActive: require('@/assets/images/styleConfig/提醒.svg'), defaultChose: 1, status: 1},
          {text: '工作台', icon: require('@/assets/images/styleConfig/工作台_1.svg'), iconActive: require('@/assets/images/styleConfig/工作台.svg'), defaultChose: 0, status: 0},
          {text: '通讯录', icon: require('@/assets/images/styleConfig/通讯录_1.svg'), iconActive: require('@/assets/images/styleConfig/通讯录.svg'), defaultChose: 1, status: 1},
          {text: '我', icon: require('@/assets/images/styleConfig/我_1.svg'), iconActive: require('@/assets/images/styleConfig/我.svg'), defaultChose: 1, status: 1}
        ],
        color: '#FFFFFF',
        colorApp: '#8a8a8a'
      }
    },
    methods: {
      moveUp (scope) {
        end.arrSplice(this.tableData, scope.$index, scope.$index - 1)
      },
      moveDown (scope) {
        end.arrSplice(this.tableData, scope.$index, scope.$index + 1)
      },
      del (id, index) {
        console.log(id, index)
        this.$confirm('确认删除？')
          .then(res => {
            this.tableData.splice(index, 1)
          })
          .catch();
      },
      edit () {
      },
      notAllowd () {},
      headleChangeColor (val) {
        console.log(val)
        this.color = val
      },
      headleChangeColorApp (val) {
        console.log(val)
      }
    },
    components: {
      NavBar,
      colorPicker
    }
  }
</script>
<style lang="scss" scoped>
  $borderColor:rgba(220,220,200,0.4);
  .content{
    margin-top: 15px;
    border:1px solid $borderColor;
    overflow: hidden;
    color: #626262;
    h3{
      border-bottom: 1px solid $borderColor;
    }
    .left,.right{
      box-sizing: border-box;
      width: 50%;
      float: left;
      display: inline-block;
      height: 100%;
      position: relative;
      padding-bottom: 20px;
    }
  }
  .left{
    border-right: 1px solid $borderColor;
    .editImgBox{
      position: absolute;
      span{font-size: 12px;}
      left: 210px;
      bottom: 80px;
      width: calc(100% - 220px);
    }
  }
  .right>.editImgBox{
      position: absolute;
      span{font-size: 12px;}
      left: 210px;
      top: 80px;
      width: calc(100% - 220px);
  }
  .banner{
    width: 180px;
    height:365px;
    margin: 15px 0 0 15px;
    background: url('~@/assets/images/appWhite.png') no-repeat;
    background-size: 100% auto;
    background-position: center;
    .uploadImg{
      display: inline-block;
      width: 159px;
      height:widthRheight(159px,1.778);
      position: relative;
      top: 41px;
      left: 9px;
      background: url('~@/assets/images/default-styleconfig.png') no-repeat;
      background-size: cover;
    }
  }
  .appInputStyle{
    position: relative;
    img{
      position: absolute;
      left:0px;
      top:10px;
    }
    input{
      border:none;
      border-bottom: 1px solid #dcdcdc;
      margin: 10px 0;
      padding-left: 20px;
      padding-bottom: 5px;
    }
  }
  .workBenchHead{
    padding: 10px 20px;
    button{
      margin-right: 20px;
    }
  }
  .logoPic{
    width: 50px;
    height:50px;
    display: inline-block;
    border-radius: 50%;
    background: #999999;
    vertical-align: middle;
    margin-left: 20px;
    margin-right: 20px;
  }
  .choseColor{
    input{
      margin-left: 20px;
      width: 200px;
    }
    button{
      margin-left: -5px;
    }
  }
  .menuIcon{
    width: 25px;
    height:25px;
    margin-top: 5px;
  }
  .use{
    padding: 5px;
    color: white;
    background: #7cb562;
  }
  .notuse{
    padding: 5px;
    color: white;
    background: #f69328;
  }
</style>
