<template>
  <section class="end-container" v-loading.fullscreen="loading">
    <div class="p-t-20">
      <!--<NavBar></NavBar>-->
      <!--<div><div class="fs-14"><a href="/">首页</a> &nbsp>&nbsp <a href="#" @click="routerReplace('/base/appManageList')">App管理列表</a> &nbsp>&nbsp 重新打包 </div></div>-->
    </div>
    <div class="bgc-fff">
      <!--<el-steps :active="stepActive" finish-status="success" simple style="margin-bottom: 20px">-->
      <!--<el-step title="step1 App基本信息" ></el-step>-->
      <!--<el-step title="step2 打包项上传" ></el-step>-->
      <!--<el-step title="step3 打包完成" ></el-step>-->
      <!--</el-steps>-->

      <el-form label-width="150px" size="small">
        <el-form-item label="" v-if="showCompany" label="企业名称">
          <div class="fs-14">{{spName}}</div>
        </el-form-item>
        <el-form-item label="" v-if="showCompany" label="企业编号">
          <div class="fs-14">{{spId}}</div>
        </el-form-item>
        <el-form-item label="app名称">
          <el-input size="small" style="width: 400px" :maxlength="10" v-model="packageInfo.appName"
                    class="w-250"></el-input>
          <span class="c-999">建议5字以内，限制输入10字</span>
        </el-form-item>
        <el-form-item label="桌面图标">
          <el-upload
            action=""
            :http-request="uploadIcon"
            :show-file-list="false"
            id="iconImg">
            <img v-if="iconImg" :src="iconImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="c-999">上传图片建议为512*512，png格式，不超过2M</span>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="appType" class="w-250" @change="typeChange">
            <el-option label="通用（多企业使用）" value="1"></el-option>
            <el-option label="定制（单企业使用）" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择企业" class="w-400" v-if="!showCompany&&appType==2">
          <el-input @focus="changeCompanyVis" :value="choosedCompany?choosedCompany.spName:''"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" class="w-400">
          <el-select size="small" v-model="packageInfo.industry" style="width: 100%">
            <el-option :label="item.category" :value="item.categoryId" v-for="item in packageInfo.industryArr"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" class="w-400">
          <el-input type="textarea" v-model="note"></el-input>
        </el-form-item>
        <el-form-item label="元数据JSONObject" class="w-400">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <el-form label-width="150px">
        <el-form-item label="打包范围" class="w-400">
          <el-checkbox-group v-model="packageInfo.packageDevice" @change="packageDeviceChange">
            <el-checkbox label="iOS">iOS</el-checkbox>
            <el-checkbox label="Android">Android</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="iOS版本号" v-show="iosShow">
          <el-input size="small" v-model="packageInfo.iosVersion" class="w-250"></el-input>
          <el-checkbox label="覆盖版本" v-model="iosCover" true-label="true"
                       false-label="false"></el-checkbox>
        </el-form-item>
        <el-form-item label="Android版本号" v-show="androidShow">
          <el-input size="small" v-model="packageInfo.androidVersion" class="w-250"></el-input>
          <el-checkbox label="覆盖版本" v-model="androidCover" true-label="true"
                       false-label="false"></el-checkbox>
        </el-form-item>
        <el-form-item label="打包资源风格" class="w-400">
          <el-select size="small" v-model="packageSourceStyle" @change="handleIndustryChange" style="width: 100%">
            <el-option :label="item.category" :value="item.id" v-for="item in packageInfo.industryArr"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <p class="p-title">启动图</p>
        <div class="marb-15"
             style="display: flex;justify-content: flex-start;align-items: flex-end;padding-left: 100px;">
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
              <img :src="UploadStartImgArr[0].url" alt="" class="startImg" v-if="UploadStartImgArr[0]">
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
              <img :src="UploadStartImgArr[1].url" alt="" class="startImg" v-if="UploadStartImgArr[1]">
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
              <img :src="UploadStartImgArr[2].url" alt="" class="startImg" v-if="UploadStartImgArr[2]">
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
              <img :src="UploadStartImgArr[3].url" alt="" class="startImg" v-if="UploadStartImgArr[3]">
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
              <img :src="UploadStartImgArr[4].url" alt="" class="startImg" v-if="UploadStartImgArr[4]">
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
              <img :src="UploadStartImgArr[5].url" alt="" class="startImg" v-if="UploadStartImgArr[5]">
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
              <img :src="UploadStartImgArr[6].url" alt="" class="startImg" v-if="UploadStartImgArr[6]">
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
        <p class="p-title">主题模版选择</p>
        <div style="padding-left: 100px">
          <div class="clearfix" style="display: flex;align-items: flex-end;margin-bottom: 15px;">
            <div class="fll" style="width: 25%">
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
                                            height: 245px;line-height: 178px!important;text-align: center;border: 1px dashed;border-radius: 4px"></i>
                </el-upload>
              </div>
            </div>
            <span>上传zip包或选用下方主题包</span>
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
              <div class="mart-10">
                <el-radio v-model="selectThemeId" :label="item.id">{{item.name}}</el-radio>
              </div>
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
        <el-button size="small" type="primary" style="margin: 15px 0px; width: 120px;" @click="package">确定</el-button>
      </div>

    </div>
    <el-dialog
      title="选择企业"
      :visible.sync="chooseCompanyVis">
      <el-table
        :data="companyList"
        border
        id="table-data">
        <el-table-column
          width="50">
          <template slot-scope="scope">
            <el-radio v-model="bindCompany" :label="JSON.stringify(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="企业id" prop="spId" align="center"></el-table-column>
        <el-table-column label="企业编号" prop="spCode" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="spName" align="center"></el-table-column>
      </el-table>

      <div class="block mart-30" v-if="pageParams.totalRows>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageParams.currentPage"
          :page-size="pageParams.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageParams.totalRows">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="chooseCompanyVis = false" size="small">取 消</el-button>
                <el-button type="primary" @click="chooseCompnaySure" size="small">确 定</el-button>
              </span>
    </el-dialog>
  </section>

</template>

<script>
  import NavBar from '@/components/navBar'
  import {mapState,mapMutations} from 'vuex'
  import {
    getCompanyList, getCategoryStyle, updateApp, getInitDataBuildConfig, getInitDataIndustry,
    uploadIcon, getThemeListData, appBuild, uploadTheme, uploadCropImg
  } from '@/api/api'
  export default {
    data: function () {
      return {
        loading: false,
        showCompany: false,
        spName: null,//企业名称
        spId: null,//企业编号
        iconImg: '',//桌面图标
        appType: '1',//定制、通用类型
        chooseCompanyVis: false,
        companyList: [],
        selectCompany: '',//企业列表临时存储
        choosedCompany: null,//企业最终选择确定后存储
        pageParams: {
          currentPage: 1,
          pageSize: 10,
          totalRows: 108,
        },
        bindCompany: null,
        packageInfo: {
          packageWay: '0',
          industry: '',//行业
          spId: '',
          companyName: '',
          androidVersion: '',
          iosVersion: '',
          appName: '',//app名称
          packageDevice: ['ios', 'android'],
          androidShow: true,
          defaultThemeId: '',
          industryArr: []
        },
        note: '',//描述
        packageSourceStyle: '',//打包资源风格
        baseInfo: {
          iconArr: []
        },
        iosShow: true,
        androidShow: true,
        currentUploadStartImgSize: [],
        currentUploadStartImgIndex: -1,
        UploadStartImgArr: [{}, {}, {}, {}, {}, {}, {}],
        androidCover: 'false',
        iosCover: 'false',
        themeList: [],
        themePageObj: {
          total: 0,
          size: 10,
        },
        selectThemeId: '',
        themeUrl: '',
        themePreview: '',
        startImgConfig: [{"key": "640_960", "size": "640_960"}, {"key": "640_1136", "size": "640_1136"},
          {"key": "750_1334", "size": "750_1334"}, {"key": "1242_2208", "size": "1242_2208"},
          {"key": "540_960", "size": "540_960"}, {"key": "720_1280", "size": "720_1280"},
          {"key": "1080_1920", "size": "1080_1920"}],
        imageUrlCop: ''
      }
    },
    mounted(){
      this.getInitDataBuildConfig();
      if (this.companyInfo) {//绑定企业
        this.showCompany = true;
        this.spId = this.$route.query.spId;
        this.spName = this.$route.query.spName;
      }
      document.title = '企业列表'
      this.getInitDataIndustry();
      this.getCategoryStyle();
      this.initThemeListData({
        "page": "1",
        "pageSize": "10"
      });
    },
    created(){
      $('body').on("mouseenter", '.downloadThemeContainer', function () {
        $(this).find('.downloadTheme').slideToggle();
      })
      $('body').on("mouseleave", '.downloadThemeContainer', function () {
        $(this).find('.downloadTheme').slideToggle();
      })
    },
    methods: {
        ...mapMutations(['SET_APPID','SET_SPID','SET_COMPANY_INFO']),
      /**
       * 所属行业发生改变
       * 这时候根据行业id和企业编号去查模版*/
      handleIndustryChange: function (val) {
        this.getCategoryStyle(val);
      },

      /**
       * 新建app类型发生变化*/
      typeChange: function (e) {
        if (e == 2) {
          this.getData();
        }
      },
      changeCompanyVis: function () {
        this.bindCompany = JSON.stringify(this.choosedCompany)
        this.chooseCompanyVis = true;

        this.getData()
      },
      /**
       * 获取企业列表*/
      getData: function () {
        var _this = this;
        _this.loading = true;
        getCompanyList({
          "page": _this.pageParams.currentPage,
          "pageSize": 10,
          "filter": {
//                        "spName": _this.searchCondition
          }
        }).then(function (res) {
            console.log(res)
          _this.loading = false;
          if (res && res.data) {
            _this.companyList = res.data;
            _this.pageParams.totalRows = res.tatalRows
          }
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示')
        })
      },
      /**
       * handleCurrentChange*/
      handleCurrentChange: function () {
        this.getData();
      },
      chooseCompnaySure: function () {
        this.choosedCompany = JSON.parse(this.bindCompany)
        this.spName = this.choosedCompany.spName;
        this.spId = this.choosedCompany.spId;
        this.chooseCompanyVis = false;
      },
      /**
       * 打包范围发生改变*/
      packageDeviceChange: function (val) {
        var _this = this;
        var iosShow = 0;
        var androidShow = 0;
        if( val ){
            val.forEach(function (e, i) {
                if (e == 'ios') {
                    iosShow++;
                } else if (e == 'android') {
                    androidShow++;
                }
            })
        }
        if (iosShow == 0) {
          _this.iosShow = false;
        } else {
          _this.iosShow = true;
        }
        if (androidShow == 0) {
          _this.androidShow = false;
        } else {
          _this.androidShow = true;
        }
      },

      /**
       * 初始化行业选项信息
       * 接口自带分页
       * @param
       * page
       * pageSize（确保数据查出，写大一点）*/
      getInitDataIndustry: function () {
        var _this = this;
        _this.loading = true;
        getInitDataIndustry({
          "page": "1",
          "pageSize": "1000"
        }).then(function (res) {
          _this.loading = false;
          _this.packageInfo.industryArr = res.data;
          _this.packageInfo.industry = res.data[0].categoryId;
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示');
        })
      },

      /**
       * 根据appid查询基础配置
       * @param
       * */
      getInitDataBuildConfig: function () {
        var _this = this;
        _this.loading = true;
        getInitDataBuildConfig({
          appId: _this.appId
        }).then(function (res) {
            console.log(res)
          _this.loading = false;
          _this.spId = res.app.spId;
          _this.spName = res.app.spName;
          _this.packageInfo.appName = res.app.appName;
          _this.iconImg = res.app.icon;
          _this.packageInfo.industry = res.app.categoryId;
          _this.note = res.app.note;
          _this.androidCover = res.app.androidCover;
          _this.iosCover = res.app.iosCover;
          _this.packageInfo.androidVersion = res.app.iosCover;
          _this.packageInfo.iosVersion = res.app.iosCover;
          _this.appType=res.app.common?"1":"2"
          _this.choosedCompany={
            spId:res.app.spId,
            spName:res.app.spName
          }


          if(  res.splashIcons ){
              res.splashIcons.forEach(function (e, i) {
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
          }
          if ( null != res.themeId &&  '' != res.themeId ) {
            _this.selectThemeId = res.themeId;
          } else {
              if( res.theme ){
                  _this.themeUrl = res.theme.url;
                  if( res.theme.previews ){
                      _this.themePreview = res.theme.previews[0].url;
                  }
              }
          }
        }).catch(function (err) {
          _this.loading = false;
          // console.log(err)
          // _this.$alert(err.message, '提示');
        });
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
              _this.loading = true;
              uploadIcon(fileData).then(function (res) {
                _this.loading = false;
                _this.iconImg = res[0].value;
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
       * 上传启动图批量裁剪处理
       * */
      uploadStartImgCrop: function (data) {
        console.log(1);
        console.log(data.file.size / (1024 * 1024));
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            if (img.width < 1242 || img.height < 2208) {
              _this.$alert('请上传大于等于1242*2208px的图片！', '提示');
              return;
            }
            if (data.file.size > 2 * 1024 * 1024) {
              _this.$alert('上传图片大小不能超过2M！', '提示');
              return;
            }
            var fileData = new FormData();
            fileData.append('file', data.file);
            fileData.append('type', '1');
            fileData.append('config', JSON.stringify(_this.startImgConfig));
            _this.loading = true;
            uploadCropImg(fileData).then(function (res) {
              _this.loading = false;
              _this.imageUrlCop = e.target.result
              res.forEach(function (e, i) {
                e.url = e.value;
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
            }).catch(function (err) {
              _this.loading = false;
              _this.$alert(err.message, '提示');
            })
          }
        }
        reader.readAsDataURL(data.file)
      },

      /**
       * app启动图上传处理
       * @param
       * data:上传的文件对象
       * 单个上传启动图
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
                res[0].url = res[0].value;
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
       * 初始化主题列表function
       * */
      initThemeListData: function (param) {
        var _this = this;
        _this.loading = true;
        getThemeListData(param).then(function (res) {
          _this.loading = false;
          _this.themePageObj.total = res.tatalRows;
          _this.themeList = res.data;
          console.log(res);
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示');
        })
      },

      /**
       * theme page change
       * @param
       * val: current page*/
      handleThemePageChange: function (val) {
        this.initThemeListData({
          "page": val.toString(),
          "pageSize": "10"
        });
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
          _this.packageInfo.defaultThemeId = '';//清空选择的主题包

        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, "提示");
        })
      },

      /**
       *获取行业打包风格 */
      getCategoryStyle: function (categoryId) {
        if (!categoryId || categoryId == '') {
          return;
        }
        var _this = this;
        _this.loading = true;
        getCategoryStyle({id: categoryId}).then(function (res) {
          _this.loading = false;
          var data = res.defaultConfig;
          var arr = []
//                    console.log('!res.themeId || res.themeId == ');
//                    console.log(!res.themeId || res.themeId == '');
          if (!res) {
            _this.alert('该行业无打包资源风格！', '提示');
          } else if (!res.themeId || res.themeId == '') {//操作人员自己上传的主题，无id
            console.log('_this.themePreview_this.themePreview')
            console.log(data)
            console.log(data.theme.previews)
            _this.themeUrl = data.theme.url;
            _this.themePreview = data.theme.previews[0].url;
          } else {
            _this.selectThemeId = res.themeId;
          }
          data.splashIcons.forEach(function (e, i) {
            switch (e.key) {
              case '640_960':
                arr[0] = e;
                break;
              case '640_1136':
                arr[1] = e;
                break;
              case '750_1334':
                arr[2] = e;
                break;
              case '1242_2208':
                arr[3] = e;
                break;
              case '540_960':
                arr[4] = e;
                break;
              case '720_1280':
                arr[5] = e;
                break;
              case '1080_1920':
                arr[6] = e;
                break;
            }
          })
          _this.UploadStartImgArr = [].concat(arr);
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示');
        })
      },

      /**
       * first step:saveAppBaseInfo*/
      saveAppBaseInfo: function (callback) {
        if (!this.packageInfo.appName) {
          this.$alert('app名称必填！', '提示');
          return;
        } else if (!this.iconImg) {
          this.$alert('请上传桌面图标！', '提示');
          return;
        }
        var subData = {
          "id":this.appId,
          "spId": this.spId,
          "spName": this.spName,
          "appName": this.packageInfo.appName,
          "icon": this.iconImg,
          "categoryId": this.packageInfo.industry,
          "common": this.appType == '1' ? true : false,
          "note": this.note
        };
        var _this = this;
        _this.loading = true;
        updateApp(subData).then(function (res) {
            _this.packageReq()
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示');
        })
      },
      /**
       * second step:package request*/
      packageReq:function () {
        var subData = {
          "app": {
            "id": this.appId //AppId
          },
          "androidVersion": this.packageInfo.androidVersion, //安卓的版本号
          "iosVersion": this.packageInfo.iosVersion, //IOS的版本号
          "androidCover": this.androidCover,
          "iosCover": this.iosCover,
          "platform": this.packageInfo.packageDevice.join(','), //构建平台
          "themeId": this.selectThemeId,//该项不是必填，如果选择系统自带的需要传递id，本地上传时不需要
          "theme": { //主题资源
            "url": this.themeUrl, //手动上传的theme资源地址
            "previews": [
              {
                "url": this.themePreview //预览图地址
              }
            ]
          },
          "splashIcons": this.UploadStartImgArr.map(function (e, i) {
            return {
              "key": e.key,
              "url": e.url
            }
          }),//启动图配置
        }
        console.log(JSON.stringify(subData));
        var _this = this;
        _this.loading = true;
        appBuild(subData).then(function (res) {
          _this.loading = false;
          _this.stepActive = 3;

            _this.$confirm('打包任务已提交', '提示', {
                confirmButtonText: '查看任务列表',
                cancelButtonText: '开始配置',
                type: 'warning'
            }).then(() => {
                _this.$router.push('/base/taskManage');
            }).catch(() => {
                _this.SET_APPID({id:_this.appId});
                _this.SET_SPID(_this.spId);
                _this.SET_COMPANY_INFO(_this.companyInfo);
                // _this.SET_COMMONAPP_STATUS({status:params.common});
                _this.$router.push('/appManage/appManageSummary');
                _this.$alert('导航到配置页面','提示');
            });

          /*
          _this.$alert('打包任务已提交!', '提示信息', {
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            confirmButtonText: '查看任务列表',
            cancelButtonText: '开始配置',
            type: 'success',
            showClose: false
          }).then(function (res) {
            _this.$router.push('/base/taskManage');
          }).catch(function (err) {
            _this.$alert(err.message, '提示');
          });
          */
        }).catch(function (err) {
          _this.loading = false;
          console.log(err);
          _this.$alert(err.message, '提示');
        })
      },

      /**
       * package
       * */
      package: function () {
        var that = this;
        this.saveAppBaseInfo(that.packageReq);

      },
        routerReplace:function (e) {
            this.$router.replace(e)
        }

    },
    components: {
      NavBar
    },
    computed: {
      ...mapState(['appId','companyInfo'])
    }
  }
</script>

<style scoped>
  #iconImg {
    height: 72px;
    width: 72px;
    display: inline-block;
    border: 1px solid #eee;
  }

  #iconImg .el-icon-plus.avatar-uploader-icon, .avatar {
    height: 72px;
    width: 72px;
    display: inline-block;
  }

  .avatar-uploader-icon {
    line-height: 72px !important;
  }

  .el-upload iframe {
    z-index: 10 !important;
    opacity: 1 !important;
  }

  .hasIcon {
    border: none !important;
    overflow: hidden;
  }

  .p-title {
    font-size: 16px;
    color: #169fe6;
    border-bottom: 1px solid #eeeeee;
    line-height: 34px;
    margin-bottom: 15px;
  }

  .p-title:before {
    content: '';
    display: inline-block;
    width: 0;
    height: 15px;
    border-left: 2px solid #169fe6;
    position: relative;
    top: 3px;
    margin-right: 6px;
  }

  .startImg-container, .themePreview-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  #startImg-uploader-container {
    width: 25%;
    text-align: center;
  }

  #startImg-uploader {
    margin: 0 auto;
    width: 150px;
    height: 225px;
  }

  #startImg-uploader .avatar-uploader-icon, #startImg-uploader img {
    width: 150px;
    height: 225px;
    line-height: 225px !important;
    border: 1px dashed;
    border-radius: 4px;
  }

  .startImg-item, .themePreview-item {
    text-align: center;
    /*margin-right: 15px;*/
    margin-bottom: 15px;
    /*width: 150px;*/
    width: 25%;
  }

  .startImg-item > img {
    margin-bottom: 15px;
  }

  .startImg, .themePreviewIcon, .downloadThemeContainer {
    display: block;
    width: 150px;
    height: 225px;
    margin: 0 auto;
  }

  .themePreviewIcon:hover, .themePreview .close:hover {
    cursor: pointer;
  }

  .themePreview .close {
    position: absolute;
    display: inline-block;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    top: 0px;
    left: 30px;
    z-index: 99;
  }
  .fs-14{
    font-size: 14px;
    font-weight: 500;
  }
</style>
