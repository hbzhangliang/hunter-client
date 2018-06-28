<!-- Created by chunmingdeng on 2017/12/25 -->
<template>
  <section class="end-container" v-loading.fullscreen="loading">
    <!--<div style="padding: 10px 0;">-->
      <!--<NavBar></NavBar>-->
    <!--</div>-->
    <div class="bgc-fff">
      <div>
        <el-form label-width="150px" size="small">
          <el-form-item label="名称" class="w-400">
            <el-input :maxlength="10" v-model="industryObj.name"></el-input>
          </el-form-item>
          <el-form-item label="输入行业" class="w-400">
            <el-input :maxlength="10" v-model="industryObj.category"></el-input>
          </el-form-item>
          <el-form-item label="行业ID：" class="w-400">
            <el-input v-on:input="changeCategoryId" v-model="industryObj.categoryId"></el-input>
          </el-form-item>
          <el-form-item label="android Phone包名：" class="w-500">
            <el-input v-model="industryObj.androidPackageName"></el-input>
          </el-form-item>
          <el-form-item label="iphone包名：" class="w-500">
            <el-input v-model="industryObj.iosPackageName"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!--<div>-->
        <!--<p class="p-title">基本信息</p>-->
        <!--<el-form label-width="150px">-->
          <!--<el-form-item label="桌面图标">-->
            <!--&lt;!&ndash;<el-input size="small" style="width: 400px" :maxlength="10"></el-input>&ndash;&gt;-->
            <!--<el-upload-->
              <!--action=""-->
              <!--:http-request="uploadIcon"-->
              <!--:show-file-list="false"-->
              <!--style="display: inline-block">-->
              <!--<el-button size="small" type="primary">点击上传</el-button>-->
            <!--</el-upload>-->
            <!--<span class="c-999">上传图片建议为512*512，png格式，不超过2M</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="">-->
            <!--<div>安卓图标</div>-->
            <!--<div style="display: flex;align-items: flex-end;">-->
              <!--<div class="dis-i-b marr-15 bgc-f8f8f8" style="height:144px;width: 144px;border: 1px solid #d6d6d6;border-radius: 8px;-->
                <!--text-align: center;line-height: 144px;" :class="{hasIcon:baseInfo.iconArr[0]}">-->
                <!--<img :src="baseInfo.iconArr[0].value" alt="" v-if="baseInfo.iconArr[0]">-->
                <!--<span v-show="!baseInfo.iconArr[0]">144*144</span></div>-->
              <!--<div class="dis-i-b marr-15 bgc-f8f8f8" style="height:96px;width: 96px;border: 1px solid #d6d6d6;border-radius: 8px;-->
                <!--text-align: center;line-height: 96px;" :class="{hasIcon:baseInfo.iconArr[1]}">-->
                <!--<img :src="baseInfo.iconArr[1].value" alt="" v-if="baseInfo.iconArr[1]">-->
                <!--<span v-show="!baseInfo.iconArr[1]">96*96</span></div>-->
              <!--<div class="dis-i-b marr-15 bgc-f8f8f8" style="height:72px;width: 72px;border: 1px solid #d6d6d6;border-radius: 8px;-->
                <!--text-align: center;line-height: 72px;" :class="{hasIcon:baseInfo.iconArr[2]}">-->
                <!--<img :src="baseInfo.iconArr[2].value" alt="" v-if="baseInfo.iconArr[2]">-->
                <!--<span v-show="!baseInfo.iconArr[2]">72*72</span></div>-->
            <!--</div>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="">-->
            <!--<div>IOS</div>-->
            <!--<div style="display: flex;align-items: flex-end;">-->
              <!--<div class="dis-i-b marr-15 bgc-f8f8f8" style="height:180px;width: 180px;border: 1px solid #d6d6d6;border-radius: 8px;-->
                <!--text-align: center;line-height: 180px;" :class="{hasIcon:baseInfo.iconArr[3]}">-->
                <!--<img :src="baseInfo.iconArr[3].value" alt="" v-if="baseInfo.iconArr[3]">-->
                <!--<span v-show="!baseInfo.iconArr[3]">180*180</span></div>-->
              <!--<div class="dis-i-b marr-15 bgc-f8f8f8" style="height:120px;width: 120px;border: 1px solid #d6d6d6;border-radius: 8px;-->
                <!--text-align: center;line-height: 120px;" :class="{hasIcon:baseInfo.iconArr[4]}">-->
                <!--<img :src="baseInfo.iconArr[4].value" alt="" v-if="baseInfo.iconArr[4]">-->
                <!--<span v-show="!baseInfo.iconArr[4]">120*120</span></div>-->
              <!--<div class="dis-i-b marr-15 bgc-f8f8f8" style="height:114px;width: 114px;border: 1px solid #d6d6d6;border-radius: 8px;-->
                <!--text-align: center;line-height: 114px;" :class="{hasIcon:baseInfo.iconArr[5]}">-->
                <!--<img :src="baseInfo.iconArr[5].value" alt="" v-if="baseInfo.iconArr[5]">-->
                <!--<span v-show="!baseInfo.iconArr[5]">114*114</span></div>-->
              <!--<div class="dis-i-b marr-15 bgc-f8f8f8" style="height:57px;width: 57px;border: 1px solid #d6d6d6;border-radius: 8px;-->
                <!--text-align: center;line-height: 57px;" :class="{hasIcon:baseInfo.iconArr[6]}">-->
                <!--<img :src="baseInfo.iconArr[6].value" alt="" v-if="baseInfo.iconArr[6]">-->
                <!--<span v-show="!baseInfo.iconArr[6]">57*57</span></div>-->
            <!--</div>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->

      <div>
        <p class="p-title">启动图</p>
        <div class="marb-15" style="display: flex;justify-content: flex-start;align-items: flex-end;padding-left: 100px;">
          <div id="startImg-uploader-container">
            <el-upload
              action=""
              :http-request="uploadStartImgCrop"
              :show-file-list="false"
              style="display: inline-block"
              id="startImg-uploader">
              <img v-if="imageUrlCop" :src="imageUrlCop" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <span>因适应不同不尺寸，为保证质量，建议上传重要元素居中图片。1242*2208以上尺寸，不超过2M</span>
        </div>
        <div style="padding-left: 100px">
          <div style="padding: 30px 0 20px 0;">iOS</div>
          <div class="startImg-container">
            <div class="startImg-item">
              <img :src="UploadStartImgArr[0].value" alt="" class="startImg" v-if="UploadStartImgArr[0]">
              <el-upload
                action=""
                :http-request="uploadStartImg"
                :show-file-list="false"
                style="display: inline-block">
                <el-button size="small" type="primary" style="margin: 15px 0px;width: 120px;"
                           @click="currentUploadStartImgSize = [640,960];currentUploadStartImgIndex = 0;">修改
                </el-button>
              </el-upload>
              <div class="c-666">640*960px</div>
            </div>
            <div class="startImg-item">
              <img :src="UploadStartImgArr[1].value" alt="" class="startImg" v-if="UploadStartImgArr[1]">
              <el-upload
                action=""
                :http-request="uploadStartImg"
                :show-file-list="false"
                style="display: inline-block">
                <el-button size="small" type="primary" style="margin: 15px 0px;width: 120px;"
                           @click="currentUploadStartImgSize = [640,1136];currentUploadStartImgIndex = 1;">修改
                </el-button>
              </el-upload>
              <div class="c-666">640*1136px</div>
            </div>
            <div class="startImg-item">
              <img :src="UploadStartImgArr[2].value" alt="" class="startImg" v-if="UploadStartImgArr[2]">
              <el-upload
                action=""
                :http-request="uploadStartImg"
                :show-file-list="false"
                style="display: inline-block">
                <el-button size="small" type="primary" style="margin: 15px 0px;width: 120px;"
                           @click="currentUploadStartImgSize = [750,1334];currentUploadStartImgIndex = 2;">修改
                </el-button>
              </el-upload>
              <div class="c-666">750*1334px</div>
            </div>
            <div class="startImg-item">
              <img :src="UploadStartImgArr[3].value" alt="" class="startImg" v-if="UploadStartImgArr[3]">
              <el-upload
                action=""
                :http-request="uploadStartImg"
                :show-file-list="false"
                style="display: inline-block">
                <el-button size="small" type="primary" style="margin: 15px 0px;width: 120px;"
                           @click="currentUploadStartImgSize = [1242,2208];currentUploadStartImgIndex = 3;">修改
                </el-button>
              </el-upload>
              <div class="c-666">1242*2208px</div>
            </div>
          </div>
        </div>
        <div style="padding-left: 100px">
          <div style="padding: 30px 0 20px 0;">Android</div>
          <div class="startImg-container">
            <div class="startImg-item">
              <img :src="UploadStartImgArr[4].value" alt="" class="startImg" v-if="UploadStartImgArr[4]">
              <el-upload
                action=""
                :http-request="uploadStartImg"
                :show-file-list="false"
                style="display: inline-block">
                <el-button size="small" type="primary" style="margin: 15px 0px;width: 120px;"
                           @click="currentUploadStartImgSize = [540,960];currentUploadStartImgIndex = 4;">修改
                </el-button>
              </el-upload>
              <div class="c-666">540*960px</div>
            </div>
            <div class="startImg-item">
              <img :src="UploadStartImgArr[5].value" alt="" class="startImg" v-if="UploadStartImgArr[5]">
              <el-upload
                action=""
                :http-request="uploadStartImg"
                :show-file-list="false"
                style="display: inline-block">
                <el-button size="small" type="primary" style="margin: 15px 0px;width: 120px;"
                           @click="currentUploadStartImgSize = [720,1280];currentUploadStartImgIndex = 5;">修改
                </el-button>
              </el-upload>
              <div class="c-666">720*1280px</div>
            </div>
            <div class="startImg-item">
              <img :src="UploadStartImgArr[6].value" alt="" class="startImg" v-if="UploadStartImgArr[6]">
              <el-upload
                action=""
                :http-request="uploadStartImg"
                :show-file-list="false"
                style="display: inline-block">
                <el-button size="small" type="primary" style="margin: 15px 0px;width: 120px;"
                           @click="currentUploadStartImgSize = [1080,1920];currentUploadStartImgIndex = 6;">修改
                </el-button>
              </el-upload>
              <div class="c-666">1080*1920px</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p class="p-title">主题包</p>

          <div style="padding-left: 100px">
            <div class="clearfix" style="display: flex;align-items: flex-end;margin-bottom: 15px;">
              <div class="fll" style="width: 25%">
                <div class="themePreview pos-r" style="margin: 0 auto;">
                  <span class="close" @click="themePreview = '';themeUrl = '';" v-if="themePreview">x</span>
                  <el-upload
                    action=""
                    :show-file-list="false"
                    :http-request="zipPackageUpload">
                    <div v-if="themePreview" style="height: 245px;width: 152px;position: relative;margin: 0 auto;" >
                      <iframe class="customerIframe" :src="themePreview"
                              width="303" height="490" frameborder="0" style="transform:  scale(0.5);transform-origin: 0 0;"></iframe>
                    </div>
                    <i v-else class="el-icon-plus" style="font-size: 28px;color: #8c939d;width: 152px;
                                            height: 245px;line-height: 178px!important;text-align: center;border: 1px solid #eee;"></i>
                  </el-upload>
                </div>
              </div>
              <span>上传zip包或选用下方主题包{{selectThemeId}}</span>
            </div>
            <div class="themePreview-container">
              <div v-for="(item ,index) in themeList" class="themePreview-item">
                <div class="pos-r downloadThemeContainer">
                  <!--<img :src="item.preview?JSON.parse(item.preview)[0]:''" alt="" class="themePreviewIcon">-->
                  <iframe class="customerIframe" :src="item.preview?JSON.parse(item.preview)[0].url:''"
                          width="300" height="490" frameborder="0" style="transform:  scale(0.5);
                                            transform-origin: 0 0;"></iframe>
                  <div class="downloadTheme pos-a" style="top: 0;left: 0;width: 100%;height: 100%;display: none;
              background: #f6f7fb;">
                    <a :href="item.url" style="display: inline-block;margin-top: 50%;color: #169fe6;">下载主题</a>
                  </div>
                </div>
                <div class="mart-10"><el-radio v-model="selectThemeId" :label="item.id">{{item.name}}</el-radio></div>
              </div>
            </div>
            <el-pagination
              layout="prev, pager, next"
              :total="themePageObj.total"
              :page-size="themePageObj.size"
              @current-change="handleThemePageChange"
              v-show="themePageObj.total!=0"
              style="text-align: center">
            </el-pagination>
          </div>
      </div>

      <div class="tac">
        <el-button size="small" style="margin: 15px 0px; width: 120px;margin-right: 20px" @click="cancelPackage">取消
        </el-button>
        <el-button size="small" type="primary" style="margin: 15px 0px; width: 120px;"
                   @click="saveIndustryDefaultConfig">确定
        </el-button>
      </div>

    </div>
  </section>

</template>

<script>
  import NavBar from '@/components/navBar'
  import {
    getInitDataBuildConfig, getInitDataIndustry, uploadIcon, getThemeListData, appBuild,
    getInitIndustrySource, saveIndustryConfig, uploadTheme, uploadCropImg
  } from '@/api/api'
  export default {
    data: function () {
      return {
        loading: false,
        currentUploadStartImgSize: [],
        currentUploadStartImgIndex: -1,
        UploadStartImgArr: [{},{},{},{},{},{},{}],
        baseInfo: {
          iconArr: []
        },
        industryObj: {
            name : "",
            category : "",
            categoryId : "",
            androidPackageName : "",
            iosPackageName : ""
        },
        themeList:[],
        themePageObj:{
          total:0,
          size:10,
        },
        selectThemeId:'',
        themeUrl:'',
        themePreview:'',
        startImgConfig:[{"key":"640_960","size":"640_960"},{"key":"640_1136","size":"640_1136"},
          {"key":"750_1334","size":"750_1334"},{"key":"1242_2208","size":"1242_2208"},
          {"key":"540_960","size":"540_960"},{"key":"720_1280","size":"720_1280"},
          {"key":"1080_1920","size":"1080_1920"}],
        imageUrlCop:''
      }
    },
    mounted(){
      var _this = this;
      if (_this.$route.query.id) {
          _this.getInitIndustrySource({id: _this.$route.query.id});
      }
        _this.initThemeListData({
        "page": "1",
        "pageSize": "10"
      });
//            _this.splashIconSort(_this.industryObj.defaultConfig.splashIcons);
    },
    methods: {
        changeCategoryId(categoryId){
            if( null == categoryId || "" === categoryId ){
                this.industryObj.androidPackageName = "";
                this.industryObj.iosPackageName = "";
            }else{
                this.industryObj.androidPackageName = "com.flaginfo.umsapp.aphone.appid" + categoryId;
                this.industryObj.iosPackageName = "com.flaginfo.umsapp.iphone.appid" + categoryId;
            }

        },
      /**
       * 根据企业id和行业id查询基础配置
       * @param
       * spId 企业Id  String
       * categoryId 行业Id  String
       * */
      getInitIndustrySource: function (param) {
        var _this = this;
        _this.loading = true;
        getInitIndustrySource(param).then(function (res) {
            console.log(res)
          _this.loading = false;
//          _this.industryObj = res;
          _this.industryObj.name = res.name,
          _this.industryObj.category = res.category,
          _this.industryObj.categoryId = res.categoryId;
          _this.industryObj.androidPackageName = res.androidPackageName;
          _this.industryObj.iosPackageName = res.iosPackageName;
//          _this.iconArrSort(_this.industryObj.defaultConfig.installIcons);
          if( res.defaultConfig ){
              _this.splashIconSort(res.defaultConfig.splashIcons);
              if(res.defaultConfig.themeId!=''&&res.defaultConfig.themeId!=null){
                  _this.selectThemeId = res.defaultConfig.themeId;
              }else{
                  _this.themePreview = res.defaultConfig.theme.previews[0].url;
                  _this.themeUrl = res.defaultConfig.theme.url;
              }
          }
        }).catch(function (err) {
            console.error(err);
          _this.loading = false;

        })
      },

      /**
       * app icon上传处理*/
      uploadIcon: function (data) {
        var _this = this;
        if (data.file.size > 2 * 1024 * 1024) {
          _this.$alert('上传图片不能大于2M！', '提示');
          return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            if (img.width != img.height) {
              _this.$alert('请上传正方形的图片！', '提示');
            } else if (img.width < 180) {
              _this.$alert('请上传大于180px的图片！', '提示');
            } else {
              var fileData = new FormData();
              fileData.append('file', data.file);
              fileData.append('type', '1');
              fileData.append('config', JSON.stringify([{"key": "144", "size": "144"}, {
                "key": "96",
                "size": "96"
              }, {"key": "72", "size": "72"},
                {"key": "180", "size": "180"}, {"key": "120", "size": "120"}, {
                  "key": "114",
                  "size": "114"
                }, {"key": "57", "size": "57"}]));
              _this.loading = true;
              uploadIcon(fileData).then(function (res) {
                _this.loading = false;
                _this.iconArrSort(res);
              }).catch(function (err) {
                _this.loading = false;
                _this.$alert(err.message, '提示')
              })
            }
          }
        }
        reader.readAsDataURL(data.file)
      },

      /**
       * app启动图上传处理
       * @param
       * data:上传的文件对象
       * */
      uploadStartImgCrop:function (data) {
        var _this =  this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            if(img.width<1242||img.height<2208){
              _this.$alert('请上传大于等于1242*2208px的图片！','提示');
              return;
            }
            if(data.file.size>2*1024*1024){
              _this.$alert('上传图片大小不能超过2M！','提示');
              return;
            }
            var fileData = new FormData();
            fileData.append('file',data.file);
            fileData.append('type','1');
            fileData.append('config',JSON.stringify(_this.startImgConfig));
            _this.loading = true;
            uploadCropImg(fileData).then(function (res) {
              _this.loading = false;
              _this.imageUrlCop = e.target.result
              res.forEach(function (e,i) {
                e.url=e.value;
                switch (e.key){
                  case '640_960':
                    _this.UploadStartImgArr[0] = e;
                    break;
                  case '640_1136':
                    _this.UploadStartImgArr[1] = e;
                    break;
                  case '750_1334':
                    _this.UploadStartImgArr[2] = e;
                    break;
                  case '1242_2208':
                    _this.UploadStartImgArr[3] = e;
                    break;
                  case '540_960':
                    _this.UploadStartImgArr[4] = e;
                    break;
                  case '720_1280':
                    _this.UploadStartImgArr[5] = e;
                    break;
                  case '1080_1920':
                    _this.UploadStartImgArr[6] = e;
                    break;
                }
              })
            }).catch(function (err) {
              _this.loading = false;
              _this.$alert(err.message,'提示');
            })
          }
        }
        reader.readAsDataURL(data.file)
      },

      /**
       * app启动图上传处理
       * @param
       * data:上传的文件对象
       * */
      uploadStartImg: function (data) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            if (img.width != _this.currentUploadStartImgSize[0] || img.height != _this.currentUploadStartImgSize[1]) {
              _this.$alert('请上传' + _this.currentUploadStartImgSize[0] + '*' + _this.currentUploadStartImgSize[1] + 'px的图片！', '提示');
            } else {
              var fileData = new FormData();
              fileData.append('file', data.file);
              fileData.append('type', '1');
              fileData.append('config', '[{"key":"' + _this.currentUploadStartImgSize.join('_') + '"}]');
              _this.loading = true;
              uploadIcon(fileData).then(function (res) {
                _this.loading = false;
                _this.UploadStartImgArr[_this.currentUploadStartImgIndex] = res[0];
              }).catch(function (err) {
                _this.loading = false;
                _this.$alert(err.message, '提示');
              })
            }
          }
        }
        reader.readAsDataURL(data.file)
      },
      /**
       * 主题包上传*/
      zipPackageUpload: function (data) {
        var _this = this;
        var file = data.file;
        var formData = new FormData();
        formData.append("file", file);
        _this.loading = true;
        uploadTheme(formData).then(function (res) {
          _this.loading = false;
          _this.themeUrl = res.url;
          _this.themePreview = res.previews[0];

        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, "提示");
        })
      },

      /**
       * cancelPackage
       * 返回行业列表页
       * */
      cancelPackage: function () {
        this.$router.push('/base/industryList')
      },


      /**
       * 初始化主题列表function
       * */
      initThemeListData:function (param) {
        var _this = this;
        _this.loading = true;
        getThemeListData(param).then(function (res) {
          _this.loading = false;
          _this.themePageObj.total = res.tatalRows;
          _this.themeList = res.data;
          console.log(res);
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message,'提示');
        })
      },
      /**
       * theme page change
       * @param
       * val: current page*/
      handleThemePageChange:function (val) {
        this.initThemeListData({
          "page": val.toString(),
          "pageSize": "10"
        });
      },
      /**
       * handleCurrentChange*/
      handleCurrentChange:function () {
        this.getData();
      },


      /**
       * 保存行业配置信息*/
      saveIndustryDefaultConfig: function () {
        var _this = this;
        if (!this.industryObj.name) {
          this.$message({message: '请输入名称！', type: 'error'});
          return;
        }
        if (!this.industryObj.category) {
          this.$message({message: '请输入行业！', type: 'error'});
          return;
        }
        if (!this.industryObj.categoryId) {
          this.$message({message: '请输行业ID！', type: 'error'});
          return;
        }
        if (!this.themeUrl&&!this.selectThemeId) {
          this.$message({message: '请上传或选择主题包！', type: 'error'});
          return;
        }
        var data = {
          "id": this.$route.query && this.$route.query.id ? this.$route.query.id : '',
          "name": this.industryObj.name,
          "category": this.industryObj.category,
          "categoryId": this.industryObj.categoryId,
          "androidPackageName": this.industryObj.androidPackageName,
          "iosPackageName": this.industryObj.iosPackageName,
          "defaultConfig": {
            "themeId": this.selectThemeId,
            "theme":{
              "url": this.themeUrl,
              "previews": [
                {
                  "url": _this.themePreview
                }
              ]
            },
            "splashIcons": this.UploadStartImgArr.map(function (e, i) {
              return {
                "key": e.key,
                "url": e.value
              }
            })
          }
        }
//        console.log(data);
        _this.loading = true;
        saveIndustryConfig(data).then(function (res) {
          _this.loading = false;
          _this.$router.push('/base/industryList');
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示');
        })
      },

      /**
       * iconArr 排序*/
      iconArrSort: function (data) {
        var _this = this;
        data.forEach(function (e, i) {
          switch (e.key) {
            case '144':
              _this.baseInfo.iconArr[0] = e;
              break;
            case '96':
              _this.baseInfo.iconArr[1] = e;
              break;
            case '72':
              _this.baseInfo.iconArr[2] = e;
              break;
            case '180':
              _this.baseInfo.iconArr[3] = e;
              break;
            case '120':
              _this.baseInfo.iconArr[4] = e;
              break;
            case '114':
              _this.baseInfo.iconArr[5] = e;
              break;
            case '57':
              _this.baseInfo.iconArr[6] = e;
              break;
          }
        });
      },

      /**
       * 启动图排序*/
      splashIconSort: function (data) {
        var _this = this;
        data.forEach(function (e, i) {
          e.value = e.url;
          switch (e.key) {
            case '640_960':
              _this.UploadStartImgArr[0] = e;
              break;
            case '640_1136':
              _this.UploadStartImgArr[1] = e;
              break;
            case '750_1334':
              _this.UploadStartImgArr[2] = e;
              break;
            case '1242_2208':
              _this.UploadStartImgArr[3] = e;
              break;
            case '540_960':
              _this.UploadStartImgArr[4] = e;
              break;
            case '720_1280':
              _this.UploadStartImgArr[5] = e;
              break;
            case '1080_1920':
              _this.UploadStartImgArr[6] = e;
              break;
          }
        })
        _this.UploadStartImgArr = [].concat(_this.UploadStartImgArr);
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>

  #iconImg{
    height: 72px;
    width:72px;
    display: inline-block;
    border: 1px solid #eee;
  }
  #iconImg .el-icon-plus.avatar-uploader-icon,.avatar{
    height: 72px;
    width:72px;
    display: inline-block;
  }
  .avatar-uploader-icon{
    line-height: 72px!important;
  }
  .el-upload iframe{
    z-index: 10!important;
    opacity: 1!important;
  }
  .hasIcon{
    border:none!important;
    overflow: hidden;
  }
  .p-title{
    font-size: 16px;
    color: #169fe6;
    border-bottom: 1px solid #eeeeee;
    line-height: 34px;
    margin-bottom: 15px;
  }
  .p-title:before{
    content: '';
    display: inline-block;
    width: 0;
    height: 15px;
    border-left: 2px solid #169fe6;
    position: relative;
    top:3px;
    margin-right: 6px;
  }
  .startImg-container,.themePreview-container{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .startImg-item>img{
    margin-bottom: 15px;
  }
  .startImg-item,.themePreview-item{
    text-align: center;
    margin-bottom: 15px;
    width: 25%;
  }
  .startImg,.themePreviewIcon,.downloadThemeContainer{
    display: block;
    width: 150px;
    height: 225px;
    margin: 0 auto;
  }
  .el-upload iframe{
    z-index: 10!important;
    opacity: 1!important;
  }
  .themePreviewIcon:hover,.themePreview .close:hover{
    cursor: pointer;
  }
  .themePreview .close{
    position: absolute;
    display: inline-block;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    top:0px;
    left:30px;
    z-index: 99;
  }

  #startImg-uploader-container{
    width: 25%;
    text-align: center;
  }
  #startImg-uploader{
    margin: 0 auto;
    width: 150px;
    height: 225px;
  }
  #startImg-uploader .avatar-uploader-icon,#startImg-uploader img{
    width: 150px;
    height: 225px;
    line-height: 225px!important;
    border:1px dashed;
    border-radius: 4px;
  }
</style>
