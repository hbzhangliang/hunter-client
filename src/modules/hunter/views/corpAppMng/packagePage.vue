<!-- Created by chunmingdeng on 2017/12/25 -->
<template>
  <section class="end-container" v-loading.fullscreen="loading">
    <!--<div style="padding: 10px 0;"><NavBar></NavBar></div>-->
    <div class="bgc-fff">
      <div style="padding: 10px 0px;margin-bottom: 10px;">
        <span class="fs-18">有界面自动打包</span>
      </div>

      <el-form label-width="150px" size="small">
        <el-form-item label="构建类型：" class="w-400">
          <el-select size="small" v-model="packageInfo.packageWay" style="width: 100%">
            <el-option label="有界面自动打包" value="0"></el-option>
            <el-option label="手动打包" value="1" :disabled="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业编号：" class="w-400">
          <span>{{packageInfo.spId}}</span>
        </el-form-item>
        <el-form-item label="企业名称：" class="w-400">
          <span>{{packageInfo.companyName}}</span>
        </el-form-item>
        <el-form-item label="所属行业：" class="w-400">
          <el-select size="small" v-model="packageInfo.industry" @change="handleIndustryChange" style="width: 100%">
            <el-option :label="item.name" :value="item.id" v-for="item in packageInfo.industryArr" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打包范围" class="w-400">
          <el-checkbox-group v-model="packageInfo.packageDevice" @change="packageDeviceChange">
            <el-checkbox label="iOS">iOS</el-checkbox>
            <el-checkbox label="Android">Android</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="iOS版本号：" v-show="iosShow">
          <el-input size="small" v-model="packageInfo.iosVersion" class="w-250"></el-input>
          <el-checkbox label="覆盖版本" v-model="androidCover" true-label="true" false-label="false"></el-checkbox>
        </el-form-item>
        <el-form-item label="Android版本号：" v-show="androidShow">
          <el-input size="small" v-model="packageInfo.androidVersion" class="w-250"></el-input>
          <el-checkbox label="覆盖版本" v-model="iosCover" true-label="true" false-label="false"></el-checkbox>
        </el-form-item>
      </el-form>

      <div>
        <p class="p-title">基本信息</p>
        <el-form label-width="150px">
          <el-form-item label="app名称">
            <el-input size="small" style="width: 400px" :maxlength="10" v-model="packageInfo.appName"></el-input>
            <span class="c-999">建议5字以内，限制输入10字</span>
          </el-form-item>
          <el-form-item label="桌面图标">
            <!--<el-input size="small" style="width: 400px" :maxlength="10"></el-input>-->
            <el-upload
                    action=""
                    :http-request="uploadIcon"
              :show-file-list="false"
              style="display: inline-block">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <span class="c-999">上传图片建议为512*512，png格式，不超过2M</span>
          </el-form-item>
          <el-form-item label="">
            <div>Android图标</div>
            <div style="display: flex;align-items: flex-end;">
              <div class="dis-i-b marr-15 bgc-f8f8f8" style="height:144px;width: 144px;border: 1px solid #d6d6d6;border-radius: 8px;
                text-align: center;line-height: 144px;" :class="{hasIcon:baseInfo.iconArr[0]}">
                <img :src="baseInfo.iconArr[0].value" alt="" v-if="baseInfo.iconArr[0]">
                <span v-show="!baseInfo.iconArr[0]">144*144</span></div>
              <div class="dis-i-b marr-15 bgc-f8f8f8" style="height:96px;width: 96px;border: 1px solid #d6d6d6;border-radius: 8px;
                text-align: center;line-height: 96px;" :class="{hasIcon:baseInfo.iconArr[1]}">
                <img :src="baseInfo.iconArr[1].value" alt="" v-if="baseInfo.iconArr[1]">
                <span v-show="!baseInfo.iconArr[1]">96*96</span></div>
              <div class="dis-i-b marr-15 bgc-f8f8f8" style="height:72px;width: 72px;border: 1px solid #d6d6d6;border-radius: 8px;
                text-align: center;line-height: 72px;" :class="{hasIcon:baseInfo.iconArr[2]}">
                <img :src="baseInfo.iconArr[2].value" alt="" v-if="baseInfo.iconArr[2]">
                <span v-show="!baseInfo.iconArr[2]">72*72</span></div>
            </div>
          </el-form-item>
          <el-form-item label="">
            <div>iOS</div>
            <div style="display: flex;align-items: flex-end;">
              <div class="dis-i-b marr-15 bgc-f8f8f8" style="height:180px;width: 180px;border: 1px solid #d6d6d6;border-radius: 8px;
                text-align: center;line-height: 180px;" :class="{hasIcon:baseInfo.iconArr[3]}">
                <img :src="baseInfo.iconArr[3].value" alt="" v-if="baseInfo.iconArr[3]">
                <span v-show="!baseInfo.iconArr[3]">180*180</span></div>
              <div class="dis-i-b marr-15 bgc-f8f8f8" style="height:120px;width: 120px;border: 1px solid #d6d6d6;border-radius: 8px;
                text-align: center;line-height: 120px;" :class="{hasIcon:baseInfo.iconArr[4]}">
                <img :src="baseInfo.iconArr[4].value" alt="" v-if="baseInfo.iconArr[4]">
                <span v-show="!baseInfo.iconArr[4]">120*120</span></div>
              <div class="dis-i-b marr-15 bgc-f8f8f8" style="height:114px;width: 114px;border: 1px solid #d6d6d6;border-radius: 8px;
                text-align: center;line-height: 114px;" :class="{hasIcon:baseInfo.iconArr[5]}">
                <img :src="baseInfo.iconArr[5].value" alt="" v-if="baseInfo.iconArr[5]">
                <span v-show="!baseInfo.iconArr[5]">114*114</span></div>
              <div class="dis-i-b marr-15 bgc-f8f8f8" style="height:57px;width: 57px;border: 1px solid #d6d6d6;border-radius: 8px;
                text-align: center;line-height: 57px;" :class="{hasIcon:baseInfo.iconArr[6]}">
                <img :src="baseInfo.iconArr[6].value" alt="" v-if="baseInfo.iconArr[6]">
                <span v-show="!baseInfo.iconArr[6]">57*57</span></div>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <p class="p-title">启动图</p>
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
                  @click="currentUploadStartImgSize = [640,960];currentUploadStartImgIndex = 0;">修改</el-button>
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
                           @click="currentUploadStartImgSize = [640,1136];currentUploadStartImgIndex = 1;">修改</el-button>
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
                           @click="currentUploadStartImgSize = [750,1334];currentUploadStartImgIndex = 2;">修改</el-button>
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
                           @click="currentUploadStartImgSize = [1242,2208];currentUploadStartImgIndex = 3;">修改</el-button>
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
                           @click="currentUploadStartImgSize = [540,960];currentUploadStartImgIndex = 4;">修改</el-button>
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
                           @click="currentUploadStartImgSize = [720,1280];currentUploadStartImgIndex = 5;">修改</el-button>
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
                           @click="currentUploadStartImgSize = [1080,1920];currentUploadStartImgIndex = 6;">修改</el-button>
              </el-upload>
              <div class="c-666">1080*1920px</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p class="p-title">主题模版选择</p>
        <div style="padding-left: 100px">
          <div class="clearfix" style="display: flex;align-items: flex-end;margin-bottom: 15px;">
            <div style="width: 25%;" class="fll">
              <div class="themePreview pos-r" style="margin: 0 auto;">
                <span class="close" @click="themePreview = '';themeUrl = '';" v-if="themePreview">x</span>
                <el-upload
                        action=""
                        :show-file-list="false"
                        :http-request="zipPackageUpload">
                  <div v-if="themePreview" style="height: 245px;width: 152px">
                    <iframe class="customerIframe" :src="themePreview"
                            width="303" height="490" frameborder="0" style="position: absolute;
                                top: 0;left: 0;transform:  scale(0.5);left: -76px;top:-123px;"></iframe>
                  </div>
                  <i v-else class="el-icon-plus" style="font-size: 28px;color: #8c939d;width: 152px;height: 245px;
                            line-height: 178px!important;text-align: center;"></i>
                </el-upload>
              </div>
            </div>
            <span>上传zip包或选用下方主题包</span>
          </div>
          <div class="themePreview-container">
            <div v-for="(item ,index) in themeList" class="themePreview-item">
              <div class="pos-r downloadThemeContainer">
                <img :src="item.preview?JSON.parse(item.preview)[0]:''" alt="" class="themePreviewIcon">
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
        <el-button size="small" style="margin: 15px 0px; width: 120px;margin-right: 20px" @click="cancelPackage">取消</el-button>
        <el-button size="small" type="primary" style="margin: 15px 0px; width: 120px;" @click="package">确定</el-button>
      </div>

    </div>
  </section>

</template>

<script>
  import NavBar from '@/components/navBar'
  import {getInitDataBuildConfig,getInitDataIndustry,uploadIcon,getThemeListData,appBuild,uploadTheme} from '@/api/api'
  export default {
    data: function () {
      return {
        loading:false,
        iosShow:true,
        androidShow:true,
        currentUploadStartImgSize:[],
        currentUploadStartImgIndex:-1,
        UploadStartImgArr:[],
        packageInfo:{
          packageWay:'0',
          industry:'',
          spId:'',
          companyName:'',
          androidVersion:'',
          iosVersion:'',
          appName:'',
          packageDevice:['ios','android'],
          androidShow:true,
          defaultThemeId:'',
          industyArr:[]
        },
        androidCover:'false',
        iosCover:'false',
        baseInfo:{
          iconArr:[]
        },
        themeList:[],
        themePageObj:{
          total:0,
          size:10,
        },
        selectThemeId:'',
        themeUrl:'',
        themePreview:''
      }
    },
    mounted(){
      this.getInitDataIndustry();
    },
    created(){
      $('body').on("mouseenter",'.downloadThemeContainer',function () {
        $(this).find('.downloadTheme').slideToggle();
      })
      $('body').on("mouseleave",'.downloadThemeContainer',function () {
        $(this).find('.downloadTheme').slideToggle();
      })
    },
    methods:{
      /**
       * 所属行业发生改变
       * 这时候根据行业id和企业编号去查模版*/
      handleIndustryChange:function (val) {
        this.getInitDataBuildConfig({
          "spId": "17101413335140026521",
          "categoryId": val
        });
      },

      /**
       * 打包范围发生改变*/
      packageDeviceChange:function (val) {
        var _this = this;
        var iosShow = 0;
        var androidShow = 0;
        val.forEach(function (e,i) {
          if(e=='ios'){
            iosShow ++;
          }else if(e=='android'){
            androidShow ++;
          }
        })
        if(iosShow==0){
          _this.iosShow = false;
        }else{
          _this.iosShow = true;
        }
        if(androidShow==0){
          _this.androidShow = false;
        }else{
          _this.androidShow = true;
        }
      },

      /**
       * 初始化行业选项信息
       * 接口自带分页
       * @param
       * page
       * pageSize（确保数据查出，写大一点）*/
      getInitDataIndustry:function () {
        var _this = this;
        _this.loading = true;
        getInitDataIndustry({
          "page": "1",
          "pageSize": "1000"
        }).then(function (res) {
          _this.loading = false;
          _this.packageInfo.industryArr = res.data;
          _this.packageInfo.industry = res.data[0].id;
          _this.getInitDataBuildConfig({
            "spId": "17101413335140026521",
            "categoryId": res.data[0].id
          });
          _this.initThemeListData({
            "page": "1",
            "pageSize": "10"
          });
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message,'提示');
        })
      },

      /**
       * 根据企业id和行业id查询基础配置
       * @param
       * spId 企业Id  String
       * categoryId 行业Id  String
       * */
      getInitDataBuildConfig:function (param) {
        var _this = this;
        _this.loading = true;
        getInitDataBuildConfig(param).then(function (res) {
          _this.loading = false;
          _this.packageInfo.spId = res.spId;
          _this.packageInfo.companyName = res.spName;
          _this.packageInfo.appName = res.appName;
          _this.packageInfo.defaultThemeId = res.themeId;
          _this.packageInfo.androidVersion = res.androidVersion;
          _this.packageInfo.iosVersion = res.iosVersion;
          _this.iconArrSort(res.installIcons);
          res.splashIcons.forEach(function (e,i) {
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
          _this.UploadStartImgArr = [].concat(_this.UploadStartImgArr);
          _this.themeUrl = res.themeUrl;
          _this.themePreview = res.themePreviews[0];
          _this.selectThemeId = res.themeId;
        }).catch(function (res) {
          _this.loading = false;
          _this.$alert(res.message,'提示');
        });
      },

      /**
       * app icon上传处理*/
      uploadIcon:function (data) {
        var _this =  this;
        if(data.file.size>2*1024*1024){
          _this.$alert('上传图片不能大于2M！','提示');
          return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            if(img.width!=img.height){
              _this.$alert('请上传正方形的图片！','提示');
            }else if(img.width<180){
              _this.$alert('请上传大于180px的图片！','提示');
            }else{
              var fileData = new FormData();
              fileData.append('file',data.file);
              fileData.append('type','1');
              fileData.append('config',JSON.stringify([{"key":"144","size":"144"},{"key":"96","size":"96"},{"key":"72","size":"72"},
                {"key":"180","size":"180"},{"key":"120","size":"120"},{"key":"114","size":"114"},{"key":"57","size":"57"}]));
              _this.loading = true;
              uploadIcon(fileData).then(function (res) {
                _this.loading = false;
                _this.iconArrSort(res);
              }).catch(function (err) {
                _this.loading = false;
                _this.$alert(err.message,'提示')
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
      uploadStartImg:function (data) {
        var _this =  this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            if(img.width!=_this.currentUploadStartImgSize[0]||img.height!=_this.currentUploadStartImgSize[1]){
              _this.$alert('请上传'+_this.currentUploadStartImgSize[0]+'*'+_this.currentUploadStartImgSize[1]+'px的图片！','提示');
            }else{
              var fileData = new FormData();
              fileData.append('file',data.file);
              fileData.append('type','1');
              fileData.append('config','[{"key":"'+_this.currentUploadStartImgSize.join('_')+'"}]');
              _this.loading = true;
              uploadIcon(fileData).then(function (res) {
                _this.loading = false;
                _this.UploadStartImgArr[_this.currentUploadStartImgIndex] = res[0];
              }).catch(function (err) {
                _this.loading = false;
                _this.$alert(err.message,'提示');
              })
            }
          }
        }
        reader.readAsDataURL(data.file)
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
       * cancelPackage
       * 返回企业APP管理列表页
       * */
      cancelPackage:function () {
        this.$router.push('/base/companyAppManage')
      },
      
      /**
       * package
       * */
      package:function () {
        console.log(this.UploadStartImgArr);
        var themePreviews = [];
        themePreviews.push(this.themePreview)
        var data = {
          "spId": this.packageInfo.spId.toString(), //企业编号
          "categoryId": this.packageInfo.industry.toString(), //行业编号
          "appName": this.packageInfo.appName, //App名称
          "androidVersion": this.packageInfo.androidVersion, //安卓的版本号
          "iosVersion": this.packageInfo.iosVersion, //ios的版本号
          "androidCover":this.androidCover,
          "iosCover":this.iosCover,
          "platform": this.packageInfo.packageDevice.join(','), //需要构建的平台，多个用逗号分隔，如:android,ios
          "installIcons": this.baseInfo.iconArr.map(function (e,i) {
            return {
              "key": e.key,
              "value": e.value
            }
          }),
          "splashIcons": this.UploadStartImgArr.map(function (e,i) {
            return {
              "key": e.key,
              "value": e.value
            }
          }),
          "themeId" : this.selectThemeId, //主题模板Id
          "themeUrl":this.themeUrl,
          "themePreviews":themePreviews
        }
        var _this = this;
        if(_this.selectThemeId==""){
          _this.$confirm('您尚未选择主题模版，确认将使用当前行业的默认模版！','提示').then(function () {
            data.themeId = _this.packageInfo.defaultThemeId;
            _this.savePackageConfig(data);
          }).catch(function () {

          })
        }else{
          data.themeId = _this.selectThemeId;
          _this.savePackageConfig(data);
        }
      },

      /**
       * */
      savePackageConfig:function (param) {
        console.log(param);
        console.log(JSON.stringify(param));
        var _this = this;
        _this.loading = true;
        appBuild(param).then(function (res) {
          _this.loading = false;
          _this.$alert('打包任务已提交!', '提示信息', {
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            confirmButtonText: '查看任务列表',
            cancelButtonText: '开始配置',
            type: 'success',
            showClose:false
          }).then(function () {
            _this.$router.push('/base/companyAppManage');
          }).catch(function () {
            _this.$router.push('/base/companyAppManage');
          });
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message,'提示');
        })
      },

      /**
       * iconArr 排序*/
      iconArrSort:function (data) {
        var _this = this;
        data.forEach(function (e,i) {
          switch (e.key){
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
       * 主题包上传*/
      zipPackageUpload:function (data) {
        var _this = this;
        var file = data.file;
        var formData = new FormData();
        formData.append("file",file);
        _this.loading = true;
        uploadTheme(formData).then(function (res) {
          _this.loading = false;
          _this.themeUrl = res.url;
          _this.themePreview = res.previews[0];

        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message,"提示");
        })
      },
    },
    components:{
      NavBar
    }
  }
</script>

<style scoped>
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
.startImg-item,.themePreview-item{
  text-align: center;
  /*margin-right: 15px;*/
  margin-bottom: 15px;
  /*width: 150px;*/
  width: 25%;
}
.startImg,.themePreviewIcon,.downloadThemeContainer{
  display: block;
  width: 150px;
  height: 225px;
  margin: 0 auto;
}
  .themePreviewIcon:hover{
    cursor: pointer;
  }
</style>
