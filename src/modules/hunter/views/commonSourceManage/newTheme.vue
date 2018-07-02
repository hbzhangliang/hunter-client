<!-- Created by chunmingdeng on 2018/1/8 -->
<template>
  <section class="end-container" v-loading.fullscreen="loading">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <el-form label-width="100px" style="width: 500px">
          <el-form-item label="主题模版名称" class="w-300">
            <el-input size="small" v-model="theme.name"></el-input>
          </el-form-item>
          <el-form-item label="主题模版描述" class="w-300">
            <el-input size="small" v-model="theme.note"></el-input>
          </el-form-item>
          <el-form-item label="zip包上传" style="width: 252px">
            <!--<div class="themePreview pos-r">-->
            <!--<span class="close" @click="themePreview = ''" v-if="themePreview">x</span>-->
            <!--<el-upload-->
            <!--action=""-->
            <!--:show-file-list="false"-->
            <!--:http-request="zipPackageUpload">-->
            <!--<div v-if="themePreview" style="height: 245px;width: 152px">-->
            <!--<iframe class="customerIframe" :src="themePreview"-->
            <!--width="303" height="490" frameborder="0" style="position: absolute;-->
            <!--top: 0;left: 0;transform:  scale(0.5);left: -76px;top:-123px;"></iframe>-->
            <!--</div>-->
            <!--<i v-else class="el-icon-plus" style="font-size: 28px;color: #8c939d;width: 152px;height: 245px;-->
            <!--line-height: 178px!important;text-align: center;"></i>-->
            <!--</el-upload>-->
            <!--</div>-->

            <div class="themePreview pos-r" style="margin: 0 auto;">
              <span class="close" @click="themePreview = '';themeUrl = '';" v-if="themePreview">x</span>
              <el-upload
                action=""
                :show-file-list="false"
                :http-request="zipPackageUpload">
                <div v-if="themePreview" style="height: 245px;width: 152px;position: relative;margin: 0 auto;">
                  <iframe class="customerIframe" :src="themePreview"
                          width="303" height="490" frameborder="0"
                          style="transform:  scale(0.5);transform-origin: 0 0;"></iframe>
                </div>
                <i v-else class="el-icon-plus" style="font-size: 28px;color: #8c939d;width: 152px;
                                            height: 245px;line-height: 178px!important;text-align: center;border: 1px solid #eee;"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="">
            <div class="tac">
              <el-button type="" size="small" class="w-120">取消</el-button>
              <el-button type="primary" size="small" class="w-120" @click="saveTheme">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  import NavBar from '@/components/navBar'
  import {uploadTheme, getThemeDetials, saveTheme} from '@/api/api'
  export default {
    data: function () {
      return {
        loading: false,
        theme: {
          name: 'test01',
          note: '测试',
          url: ''
//          url: 'http://terminal-center.oss-cn-hangzhou.aliyuncs.com/umsapp6.1.0/file/temp/5ab9e5b7e4b0d8196c0659ad'
        },
        themePreview: ''
//        themePreview: 'http://terminal-center.oss-cn-hangzhou.aliyuncs.com/umsapp6.1.0/file/temp/5ab9e5b7e4b0d8196c0659ad/html/login.html'
      }
    },
    mounted:function () {
      if(this.$route.query.id){
        this.getThemeDetials(this.$route.query.id);
      }
    },
    methods: {
      zipPackageUpload: function (data) {
        var _this = this;
        var file = data.file;
        var formData = new FormData();
        formData.append("file", file);
        _this.loading = true;
        uploadTheme(formData).then(function (res) {
          _this.loading = false;
          _this.theme.url = res.url;
          _this.themePreview = res.previews[0];

        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, "提示");
        })
      },
      /**
       * @param
       * id string*/
      getThemeDetials: function (id) {
        var _this = this;
        _this.loading = true;
        getThemeDetials({
          id: id,
        }).then(function (res) {
          _this.loading = false;
          _this.theme.name = res.name;
          _this.theme.note = res.note;
          _this.theme.url = res.url;
          _this.themePreview = JSON.parse(res.preview).length?JSON.parse(res.preview)[0].url:'';
        }).catch(function (err) {
          _this.loading = false;

        })
      },
      /**
       * @param
       * 参数   参数定义   参数类型 必填  备注
       * id  id  string  否  传id为更新，不传为新增
       * name   名称  string  是
       * url    资源包地址  string  是
       * previews   预览图地址集合   list  否  可以上传多个，现阶段限制只能上传一个
       * note   描述  string  否   */
      saveTheme: function () {
        var _this = this;
        if (!_this.theme.name) {
          _this.$message({message: '主题模版名称必填！', type: 'error'});
          return;
        }
        if (!_this.theme.url) {
          _this.$message({message: '主题包必传！', type: 'error'});
          return;
        }
        _this.loading = true;
        saveTheme({
          id: this.$route.query.id?this.$route.query.id:'',
          name: _this.theme.name,
          note: _this.theme.note,
          url: _this.theme.url,
          previews: [{
            url:_this.themePreview
          }],
        }).then(function (res) {
          _this.loading = false;
          _this.$message({message: '保存成功！', type: "success"})
        }).catch(function (err) {
          _this.loading = false;

        })
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .el-upload iframe{
    z-index: 10!important;
    opacity: 1!important;
  }
  .themePreview .close{
    cursor: pointer;
    position: absolute;
    display: inline-block;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    top:0px;
    z-index: 99;
  }
</style>