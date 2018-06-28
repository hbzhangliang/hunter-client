<!-- Created by chunmingdeng on 2017/12/5 -->
<template>
  <section class="end-container clearfix" v-loading.fullscreen="loading">
    <!--<NavBar></NavBar>-->
    <div class="clearfix" style="display: flex;justify-content: space-between">
      <div id="module-container" class="">
        <div class="border-b tac fw-blod padd-10">模版库</div>
        <!--<div class="over-f-s" style="overflow-y: scroll">-->
          <!--<div @click="addModule(1)" class="cur-p border-b">-->
            <!--<img src="static/img/lunbo.png" alt="">-->
          <!--</div>-->

          <!--<div class="cur-p border-b" @click="addModule(2)">-->
            <!--<img src="static/img/appIcon.png" alt="">-->
          <!--</div>-->

          <!--<div @click="addModule(3)" class="cur-p border-b">-->
            <!--<img src="static/img/textImg.png" alt="">-->
          <!--</div>-->
          <!--<div @click="addModule(4)" class="cur-p border-b">-->
            <!--<img src="static/img/textList.png" alt="">-->
          <!--</div>-->
          <!--<div @click="addModule(5)" class="cur-p">-->
            <!--<img src="static/img/url.png" alt="">-->
          <!--</div>-->

          <div class="cur-p" v-for="item in templateList" @click="addModule(item.code)">
            <img :src="item.url" alt="">
          </div>

        <!--</div>-->
      </div>

      <div class="over-f-s" style="margin-top: 40px;">
        <div id="mobile-container">
          <img src="static/img/phoneHeader.png" alt="">
          <div v-for="(item ,index) in show" :key="index">
            <el-carousel height="178px" arrow="always" :autoplay="false" v-if="item.type=='Slide'">
              <el-carousel-item v-for="(it,indexs) in item.carouselImg" :key="index">
                <div style="position: absolute;z-index: 4;top:0px;right: 15px">
                  <el-button type="text" @click="edit(0,item)">编辑</el-button>
                  <el-button type="text" @click="moduleDel(index,item)">删除</el-button>
                  <el-button type="text" @click="moduleUp(index,item)" v-show="index!=0">上移</el-button>
                  <el-button type="text" @click="moduleDown(index,item)" v-show="index!=show.length-1">下移</el-button>
                </div>
                <img :src="it.imageUrl" />
                <div class="el-carousel-tips" style="position: absolute;bottom: 0px;width: 100%">
                  <!--<span>this is pis</span>-->
                </div>
              </el-carousel-item>
            </el-carousel>

            <div v-if="item.type=='BizGroup'">
              <div class="padd-0-15 lh-34 bgc-f6f7fb clearfix">
                <span v-show="item.columnShow==1">{{item.columnName}}</span>
                <span v-show="item.moreShow==1">更多</span>
                <span class="flr">
                  <el-button type="text" @click="edit(1,item)">编辑</el-button>
                  <el-button type="text" @click="moduleDel(index,item)">删除</el-button>
                  <el-button type="text" @click="moduleUp(index,item)" v-show="index!=0">上移</el-button>
                  <el-button type="text" @click="moduleDown(index,item)" v-show="index!=show.length-1">下移</el-button>
                </span>
              </div>
              <div style="display: flex;justify-content: flex-start;flex-wrap: wrap;padding: 10px 15px;text-align: center;">
                <div v-for="it in item.dataAppArr" style="margin-bottom: 10px;width: 25%;">
                  <div style="width: 60px;height: 60px;margin: 0 auto;margin-bottom: 10px"><img :src="it.icon" alt=""></div>
                  <span>{{it.bizName}}</span>
                </div>
              </div>
            </div>

            <div id="text-img-list" v-if="item.type!='Slide'&&item.type!='BizGroup'">
              <ul>
                <li>
                  <div class="padd-0-15 lh-34 bgc-f6f7fb clearfix">
                    <span v-show="item.columnShow==1">{{item.columnName}}</span>
                    <span v-show="item.moreShow==1">更多</span>
                    <span class="flr">
                      <el-button type="text" @click="edit(item.type,item)">编辑</el-button>
                      <el-button type="text" @click="moduleDel(index,item)">删除</el-button>
                      <el-button type="text" @click="moduleUp(index,item)" v-show="index!=0">上移</el-button>
                      <el-button type="text" @click="moduleDown(index,item)" v-show="index!=show.length-1">下移</el-button>
                    </span>
                  </div>
                  <div class="padd-15">
                    <div class="text-img-container" v-for="it in item.list">
                      <img src="static/img/banner.14ad089.png" alt="">
                      <div>{{it.subject}}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!--<div id="text-list" v-if="item.type==4">-->
              <!--<ul>-->
                <!--<li>-->
                  <!--<div class="padd-0-15 lh-34 bgc-f6f7fb clearfix">-->
                    <!--<span v-show="item.columnShow==1">{{item.columnName}}</span>-->
                    <!--<span v-show="item.moreShow==1">更多</span>-->
                    <!--<span class="flr">-->
                      <!--<el-button type="text" @click="edit(2,item)">编辑</el-button>-->
                      <!--<el-button type="text" @click="moduleDel(index,item)">删除</el-button>-->
                      <!--<el-button type="text" @click="moduleUp(index,item)" v-show="index!=0">上移</el-button>-->
                      <!--<el-button type="text" @click="moduleDown(index,item)" v-show="index!=show.length-1">下移</el-button>-->
                    <!--</span>-->
                  <!--</div>-->
                  <!--<div class="padd-15">-->
                    <!--<div class="text-container">-->
                      <!--<div class="text-container" v-for="it in item.list">-->
                        <!--<div>{{it.subject}}</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->

          </div>
        </div>
        <div class="tac" style="margin-top: 15px">
          <el-button size="small">返回</el-button>
          <el-button size="small" type="primary" @click="public">发布</el-button>
          <el-button size="small" type="primary" @click="save">保存</el-button>
        </div>
      </div>

      <div style="background: #fff" id="edit-container">
        <div id="edit-carousel-container" class="flr " v-show="editStatus==0">
          <div class="padd-0-15 lh-34  tac border-b fw-blod">
            <span>编辑-滚动图</span>
          </div>
          <div class="padd-15">
            <ul>
              <li class="pic-item" v-for="(item,index) in carouselList" :key="index">
                <div class="bgc-f6f7fb padd-5 clearfix">
                  <span>图{{index+1}} {{item.name}}</span>
                  <span class="flr">
                <el-button type="text" size="small" @click="delItem(index)">
                  <!--<i class="el-icon-close fs12"></i>-->
                  <i class="iconfont-t icon-del fs12"></i>
                  删除</el-button>
                <span>|</span>
                <el-button type="text" size="small" v-show="index!=0" @click="up(index)">
                  <i class="iconfont-t icon-sort-up fs12"></i>上移</el-button>
                <el-button type="text" size="small" v-show="index!=carouselList.length-1" @click="down(index)">
                  <i class="iconfont-t icon-sort-down fs12"></i></i>下移</el-button>
              </span>
                </div>
                <div style="padding: 5px" @click="uploadImgIndex(index)">
                  <!--<img src="static/img/banner.14ad089.png" alt="" class="w-p-100 dis-b">-->
                  <el-upload
                          class="avatar-uploader"
                          action=""
                          :http-request="upload"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                    <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
                <div class="c-8d8d8d fs12 padd-0-5">
                  png格式，尺寸：640x450px 文件大小小于200k
                </div>
                <div class="padd-5">
                  <el-form label-width="80px">
                    <el-form-item label="标题：">
                      <el-input v-model="item.title" placeholder="请输入文字标题" size="small"/>
                    </el-form-item>
                    <el-form-item label="链接：">
                      <el-input v-model="item.url" placeholder="请输入URL" size="small"/>
                    </el-form-item>
                  </el-form>
                </div>
              </li>

              <li class="clearfix">
                <el-button type="primary" class="flr" @click="add" size="small">添加</el-button>
              </li>
              <li class="tac">
                <el-button type="primary" @click="carouselEditSure">确定</el-button>
              </li>
            </ul>
          </div>
        </div>

        <div id="edit-app-icon-container" class="flr" v-show="editStatus==1">
          <div class="padd-0-15 lh-34  tac border-b fw-blod">
            <span>编辑-应用图标列表</span>
          </div>
          <div class="padd-15">
            <el-form label-width="90px">
              <el-form-item label="栏目条：">
                <el-radio v-model="editData.columnShow" label="0">隐藏</el-radio>
                <el-radio v-model="editData.columnShow" label="1">显示</el-radio>
                <el-input v-model="editData.columnName" placeholder="请输入栏目名称" size="small" class="w-130 marl-10"></el-input>
              </el-form-item>
              <!--<el-form-item label="更多：">-->
              <!--<el-radio v-model="editData.moreShow" label="0">隐藏</el-radio>-->
              <!--<el-radio v-model="editData.moreShow" label="1">显示</el-radio>-->
              <!--<el-input v-model="editData.moreUrl" placeholder="URL" size="small" class="w-130 marl-10"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="数据源：">
                <el-popover
                        ref="popover"
                        placement="bottom"
                        width="200"
                        trigger="click"
                        v-model="popVis">
                  <el-checkbox-group v-model="editData.dataAppArr" @change="selChange">
                    <ul>
                      <li v-for="(item,index) in appDataSourceList" :key="index" style="display: flex;align-items: center;padding: 5px 0px;">
                        <el-checkbox :label="item.bizId">{{item.bizName}}</el-checkbox>
                        <img :src="item.icon" alt="" style="height: 40px;width: 40px!important;margin-left: 15px;"></li>
                    </ul>
                  </el-checkbox-group>
                </el-popover>
                <div><el-radio v-model="editData.dataSource" label="0" @change="chooseAll">拉取全部</el-radio></div>
                <div class="pos-r"><span @click="selShow"><el-radio v-model="editData.dataSource" label="1">选择展示</el-radio></span>
                  <el-button id="pop" ref="pop" type="text" v-popover:popover style="position: absolute;z-index:-10;"></el-button></div>
              </el-form-item>
              <!--:data="dataSourceList"-->
              <!--:data="editData.dataAppArr"-->
              <el-table
                      :data="selAppTable"
                      border
                      style="width: 100%">
                <el-table-column
                        label="应用名称"
                        width="80">
                  <template slot-scope="scope">
                    {{scope.row.bizName}}
                  </template>
                </el-table-column>
                <el-table-column
                        label="图标"
                        width="60">
                  <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="">
                  </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="scope.row.bizId==''||scope.row.bizId==undefined"
                               @click="appEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="appDel(scope.$index)">删除</el-button>
                    <el-button type="text" size="small" v-show="scope.$index!=0" @click="appUp(scope.$index)">上移</el-button>
                    <el-button type="text" size="small" v-show="scope.$index!=selAppTable.length-1" @click="appDown(scope.$index)">下移</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="clearfix" style="margin-top: 10px;">
                <el-button @click="dialogVisible = true" class="flr" size="small">新增自定义应用</el-button>
              </div>
              <el-form-item>
                <el-button size="small">返回</el-button>
                <el-button type="primary" size="small" @click="appIconEditSure">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div id="edit-img-text-container" class="flr" v-show="editStatus==2">
          <div class="padd-0-15 lh-34 tac border-b fw-blod">
            <span>编辑-图文</span>
          </div>
          <div class="padd-15">
            <el-form label-width="80px">
              <el-form-item label="栏目条：">
                <el-radio v-model="editData.columnShow" label="0">隐藏</el-radio>
                <el-radio v-model="editData.columnShow" label="1">显示</el-radio>
                <el-input v-model="editData.columnName" placeholder="请输入栏目名称" size="small"></el-input>
              </el-form-item>
              <el-form-item label="更多：">
                <el-radio v-model="editData.moreShow" label="0">隐藏</el-radio>
                <el-radio v-model="editData.moreShow" label="1">显示</el-radio>
                <el-input v-model="editData.moreUrl" placeholder="URL" size="small"></el-input>
              </el-form-item>
              <el-form-item label="行数：">
                <el-input v-model="editData.line" placeholder="行数" size="small"></el-input>
              </el-form-item>
              <el-form-item label="数据源：">
                <el-popover
                        ref="pop"
                        placement="right"
                        width="200"
                        trigger="click">
                  <div style="padding: 10px 15px;">应用列表</div>
                  <el-radio-group v-model="editData.dataSourceUrl" @change="listUrlChange">
                    <ul>
                      <li v-for="(item,index) in appDataSourceList" :key="index" style="display: flex;align-items: center;padding: 10px 15px;">
                        <el-radio :label="item.url">{{item.bizName}}</el-radio></li>
                    </ul>
                  </el-radio-group>
                </el-popover>
                <el-input v-model="editData.dataSourceUrl" placeholder="URL" size="small" readonly>
                  <el-button slot="append" type="primary" v-popover:pop>匹配</el-button></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small">返回</el-button>
                <el-button type="primary" size="small" @click="textImgEditSure(textImg)">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <el-dialog
              title="新增自定义应用"
              :visible.sync="dialogVisible"
              :show-close=false
              width="30%">
        <el-form label-width="120px">
          <el-form-item label="应用名称：">
            <el-input placeholder="请输入应用名称" size="small" v-model="temporaryApp.bizName"></el-input>
          </el-form-item>
          <el-form-item label="应用icon：">
            <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="appIconUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
              <img v-if="temporaryApp.icon" :src="temporaryApp.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;appAddLocal()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </section>
</template>

<script>
  import NavBar from '@/components/navBar'
  import {bizTemplateListAll,saveModule,fileUpload,saveBizModule,getAppList,saveModuleSeq,getAllModule,getImgTextList} from '@/api/api';
  export default {
    data: function () {
      return {
        loading:false,
        dialogVisible:false,
        module:{
          carouselImg:[{
            name:'pic01',
            imageUrl:'static/img/banner.14ad089.png'
          }],
        },
        show:[//每个对象的type为模块的类型
        ],
        carouselList:[],//当前编辑中的轮播图数组
        curEditModuleAddress:[],//当前编辑的module引用暂时保存
        editData:'',//编辑数据数组暂存对像
        editStatus:-1,
        currentUploadIndex:-1,
        column:'0',
        more:'0',
        dataType:'0',
        dataSource:'0',
        dataSourceUrl:'',
        appDataSourceList:[],
        popVis:false,
        textImg:{
          columnTi:'0',//图文部分
          moreTi:'0',
          columnNameTi:'',
          moreUrlTi:'',
        },
        textImgList:[],
        temporaryApp:{
          bizId:'',
          bizName:'',
          icon:'',
        },
        selAppTable:[],
        list:[],
        templateList:[]
      }
    },
    mounted(){
      this.initTemplate();
      this.getAppList();
      this.initModuleData();
    },
    methods:{
      //模板数据根据后台配置展示
      initTemplate(){
          let _this=this
          _this.templateList=[]
          bizTemplateListAll().then(res=>{
              res.forEach(p=>{
                  if(p.status=='publish'){
                      _this.templateList.push(p);
                  }
              })
          })
      },
      tes:function (res) {
        var _this =this;
        res.forEach(function (e,i) {
          switch (e.type){
            case "Slide":
              _this.show.push({
                type:"Slide",
                id:e.id,
                carouselImg:e.scrollList.map(function(e,i){
                  return {
                    name:'',
                    imageUrl:e.url,
                    title:e.showText,
                    url:e.link
                  }
                })
              });
              break;
            case "BizGroup":
              _this.show.push({
                type:"BizGroup",
                id:e.id,
                columnShow:e.status=='show'?'1':'0',
                columnName:e.groupName,
                dataSource:e.bizAll.toString()=='true'?'0':'1',
                dataAppArr:e.appConfigList.map(function (e,i) {
                  return {
                    'bizId': e.bizId,
                    'bizName': e.bizName,
                    'url': e.url,
                    'icon': e.icon,
                  };
                })
              });
              break;
              default:
              _this.show.push({
                type:e.type,
                id:e.id,
                columnShow:e.status=='show'?'1':'0',
                columnName:e.groupName,
                moreShow:e.flag.toString()=='true'?'1':'0',
                moreUrl:e.optElementList[0].detailUrl,
                line:e.optElementList[0].rows,
                dataSourceUrl:e.optElementList[0].url,
                list:[]
              })
              break;
          }
        })
      },
      /**
       * moduleType:1 轮播；2 九宫格；3 图文*/
      initModuleData:function () {
        var _this = this;
        getAllModule({id:'1'}).then(res=>{
          if(!res){
            console.log('没有模版历史数据');
          }else{
            res.moduleVoList.forEach(function (e,i) {
              switch (e.type){
                case "Slide":
                  _this.show.push({
                    type:"Slide",
                    id:e.id,
                    carouselImg:e.scrollList.map(function(e,i){
                      return {
                        name:'',
                        imageUrl:e.url,
                        title:e.showText,
                        url:e.link
                      }
                    })
                  });
                  break;
                case "BizGroup":
                  _this.show.push({
                    type:"BizGroup",
                    id:e.id,
                    columnShow:e.status=='show'?'1':'0',
                    columnName:e.groupName,
                    dataSource:e.bizAll.toString()=='true'?'0':'1',
                    dataAppArr:e.appConfigList.map(function (e,i) {
                      return {
                        "bizId": e.bizId,
                        "bizName": e.bizName,
                        "icon": e.icon,
                        "url": e.url
                      };
                    })
                  });
                  break;
                default:
                  // if(e.optElementList[0].tempType=='imgtext'){
                  //   _this.show.push({
                  //     type:3,
                  //     id:e.id,
                  //     columnShow:e.status=='show'?'1':'0',
                  //     columnName:e.groupName,
                  //     moreShow:e.flag.toString()=='true'?'1':'0',
                  //     moreUrl:e.optElementList[0].detailUrl,
                  //     line:e.optElementList[0].rows,
                  //     dataSourceUrl:e.optElementList[0].url,
                  //     list:[]
                  //   });
                  // }else if(e.optElementList[0].tempType=='text'){
                  //   _this.show.push({
                  //     type:4,
                  //     id:e.id,
                  //     columnShow:e.status=='show'?'1':'0',
                  //     columnName:e.groupName,
                  //     moreShow:e.flag.toString()=='true'?'1':'0',
                  //     moreUrl:e.optElementList[0].detailUrl,
                  //     line:e.optElementList[0].rows,
                  //     dataSourceUrl:e.optElementList[0].url,
                  //     list:[]
                  //   });
                  // }
                  //
                  // var params = {url:'',type:e.optElementList[0].tempType};
                  // getImgTextList(params).then(res=>{
                  //   console.log('第'+i+'个图文模块获得的图文数据');
                  //   console.log(res);
                  //   _this.show[i].list = res.slice(0,e.optElementList[0].rows);
                  // })

                  break;
              }
            })
          }
        })
      },
      addModule:function(moduleType){
          console.log(moduleType)
        var _this = this;
        var canAdd = true;
        if(_this.show.length!=0){
          _this.show.forEach(function (e,i) {
            if(!e.id){
              canAdd = false;
            }
          })
        }
        if(!canAdd){
          _this.$alert('请先编辑添加的模块！','提示');
          return;
        }
        switch (moduleType){
          case "Slide":
              console.log("slide")
            _this.show.push({
              type:moduleType,
              carouselImg:[{
                name:'add1',
                imageUrl:'static/img/banner.14ad089.png',
                title:'',
                url:'http://www.baidu.com'
              }]
            });
            break;
          case "BizGroup":
              console.log("BizGroup")
            _this.show.push({
              type:moduleType,
              columnShow:'1',
              columnName:'栏目标题',
//              moreShow:'1',
//              moreUrl:'',
              dataSource:'0',
              dataAppArr:[]
            });
            break;
            default:
                console.log("Other")
                _this.show.push({
                    type:moduleType,
                    columnName:'栏目标题',
                    columnShow:'1',
                    moreShow:'1',
                    moreUrl:'',
                    line:'10',
                    dataSourceUrl:'',
                    list:[]
                });
                break;
        }
      },
      moduleDel:function (index,item) {
        this.show.splice(index,1);
      },
      moduleUp:function (index,item) {
        var cur = this.show[index];
        this.show[index] = this.show[index-1];
        this.show[index-1] = cur;
        this.show = [].concat(this.show);
      },
      moduleDown:function (index,item) {
        var cur = this.show[index];
        this.show[index] = this.show[index+1];
        this.show[index+1] = cur;
        this.show = [].concat(this.show);
      },

      edit:function (arg,item) {
        var _this = this;
        _this.editStatus = arg;
        console.log('module');
        console.log(item);
        _this.curEditModuleAddress = item;
        if(item.type=='Slide'){
          _this.carouselList = JSON.parse(JSON.stringify(item.carouselImg));
        }else if(item.type=='BizGroup'){
          _this.editData = Object.assign({},item);
          _this.editData.dataAppArr = [].concat(item.dataAppArr.map(function (e,i) {
            return e.bizId;
          }));
          if(item.dataSource=='0'){
            this.chooseAll();
            this.selAppTable = item.dataAppArr.map(function (e,i) {
              return {
                bizId:e.bizId,
                bizName:e.bizName,
                icon:e.icon,
              }
            });
          }else{
            this.selShow();
            _this.selAppTable = [].concat(item.dataAppArr.map(function (e,i) {
              return {
                bizId:e.bizId,
                bizName:e.bizName,
                icon:e.icon,
              }
            }))
            console.log(_this.selAppTable);
          }
        }else{
          _this.editData = Object.assign({},item);
//          console.log(_this.editData);
        }
      },
      /**
       * 轮播图编辑操作*/
      upload:function (res) {
        var _this = this;
        let fd = new FormData()
        fd.append('file', res.file)
        _this.loading = true;
        fileUpload(fd).then(res => {
          this.carouselList[this.currentUploadIndex].imageUrl = res;
          this.carouselList = [].concat(this.carouselList);
          _this.loading = false;
        });
      },
      up:function (index) {
        var up = this.carouselList[index-1];
        var current = this.carouselList[index];
        this.carouselList[index-1] = current;
        this.carouselList[index] = up;
        this.carouselList = [].concat(this.carouselList)
      },
      down:function (index) {
        var down = this.carouselList[index+1];
        var current = this.carouselList[index];
        this.carouselList[index+1] = current;
        this.carouselList[index] = down;
        this.carouselList = [].concat(this.carouselList)
      },
      delItem:function (index) {
        console.log(index);
        console.log(this.carouselList.splice(index,1));
      },
      add:function () {
        var index = this.carouselList.length;
        this.carouselList.push({name:'addpic'+index})
      },
      carouselEditSure:function () {
        var _this = this;
        let scrollList = [];
        this.curEditModuleAddress.carouselImg = [].concat(this.carouselList);
        this.curEditModuleAddress.carouselImg.forEach(function (e,i) {
          scrollList.push({
            "moduleId": null,
            "url": e.imageUrl?e.imageUrl:'',
            "showText": e.title?e.title:'',
            "link": e.url?e.url:'',
            "seq": 1
          })
        })
        let data={
          "id": _this.curEditModuleAddress.id?_this.curEditModuleAddress.id:null,
          "workbenchId": 1,
          "name": '',
          "groupName": null,
          "type": "Slide",
          "seq": 1,
          "remark": '',
          "status":'show',
          "flag":0,
          "scrollList":scrollList,
          "appConfigList": [],
          "optElementList": []
        }
        _this.loading = true;
        saveModule(data).then(res => {
          _this.loading = false;
          this.editStatus = -1;
          this.curEditModuleAddress.id = res.id;
//          console.log('轮播图保存成功！');
//          console.log(_this.show);
        })
      },


      /**
       * 轮播图图片上传*/
      uploadImgIndex:function (i) {
        this.currentUploadIndex = i;
      },
      handleAvatarSuccess(res, file) {
        this.carouselList[this.currentUploadIndex].imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type.indexOf('image')!=-1;
        const isLt2M = file.size / 1024  < 200;

        if (!isJPG) {
          this.$message.error('上传正确格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 200k!');
        }
        return isJPG && isLt2M;
      },

      /**
       * app图标icon
       * getAppList  fixedSpId:17112815160820008975*/
      getAppList(){
        var _this = this;
        _this.loading = true;
        getAppList({"spId": "17112815160820008975"}).then(res=>{
          _this.loading = false;
          _this.appDataSourceList = res.map(function (e,i) {
            return {bizId:e.bizId,bizName:e.bizName,icon:e.icon,url:e.url}
          });
        })

      },
      chooseAll:function(){
        this.selAppTable = [].concat(this.appDataSourceList);
      },
      selChange:function () {
        var _this = this;
        var arrObj = [];
        var listShowApp = [];
        var arr = [].concat(_this.editData.dataAppArr);
        //已订购业务选中的
        arr.forEach(function (e,i) {
          _this.appDataSourceList.forEach(function (ec,ic) {
            if(ec.bizId==e){
              arrObj.push({
                bizId:ec.bizId,
                bizName:ec.bizName,
                icon:ec.icon
              })
            }
          })
        })

        if(_this.selAppTable.length==0){
          listShowApp = [].concat(arrObj);
        }else{
          var temporary = [].concat(_this.selAppTable);
          listShowApp = [].concat(_this.selAppTable);
          //选中之后添加
          arrObj.forEach(function (e,i) {
            var count = 0;
            temporary.forEach(function (ec,ic) {
              if(ec.bizId==e.bizId){
                count++;
              }
            })
            if(count==0){
              listShowApp.push({
                bizId:e.bizId,
                bizName:e.bizName,
                icon:e.icon
              })
            }
          })
          //取消选中删除
          var notExist = [];
          temporary.forEach(function (e,i) {
            var count = 0;
            if(e.bizId!=''&&e.bizId!=undefined){
              arr.forEach(function (ec,ic) {
                if(ec==e.bizId){
                  count++;
                }
              })
            }else{
              console.log('第' + i + '个是自定义的app');
            }
            if(count==0){
              if(e.bizId!=''){
                notExist.push(e.bizId);
              }
            }
          })
//          console.log("notExist:"+notExist);
          notExist.forEach(function (e,i) {
            listShowApp.forEach(function (ec,ic) {
              if(e==ec.bizId){
                listShowApp.splice(ic,1)
              }
            })
          })
        }
        _this.selAppTable = [].concat(listShowApp);
      },
      selShow:function () {
        console.log(this.selAppTable.length);
        if(this.selAppTable.length!=0){
          this.selChange();
        }
        this.popVis = true;
      },
      appEdit:function (index,data) {
        this.dialogVisible = true;
        this.temporaryApp = Object.assign({},data);
        this.temporaryApp.type = 'edit';
        this.temporaryApp.editIndex = index;
      },
      appDel:function (index) {
        this.selAppTable.splice(index,1);
        this.editData.dataAppArr = this.selAppTable.map(function (e,i) {
          return e.bizId;
        })
      },
      appUp:function (index) {
        var cur = this.selAppTable[index];
        this.selAppTable[index] = this.selAppTable[index-1];
        this.selAppTable[index-1] = cur;
        this.selAppTable = [].concat(this.selAppTable);
      },
      appDown:function (index) {
        var cur = this.selAppTable[index];
        this.selAppTable[index] = this.selAppTable[index+1];
        this.selAppTable[index+1] = cur;
        this.selAppTable = [].concat(this.selAppTable);
      },
      appIconUpload:function (res) {
        var _this = this;
        let fd = new FormData()
        fd.append('file', res.file)
        _this.loading = true;
        fileUpload(fd).then(res => {
          _this.temporaryApp.icon = res;
          _this.loading = false;
        });
      },
      appAddLocal:function () {
        if(this.temporaryApp.type=='edit'){
          this.selAppTable[this.temporaryApp.editIndex] = this.temporaryApp;
          this.selAppTable = [].concat(this.selAppTable);
        }else{
          this.selAppTable.push(this.temporaryApp);
        }
        this.temporaryApp={};
      },
      appIconEditSure:function () {
        this.editStatus = -1;
        var _this = this;
        var appConfigList = [];
        this.selAppTable.forEach(function (e,i) {
          appConfigList.push({
            "moduleId": null,
            "bizId": e.bizId,
            "bizName": e.bizName,
            "icon": e.icon,
            "url": e.url
          });
        })
        _this.editData.dataAppArr = [].concat(appConfigList)
        Object.assign(_this.curEditModuleAddress,_this.editData);
        let data={
          "id": _this.curEditModuleAddress.id?_this.curEditModuleAddress.id:null,
          "workbenchId": 1,
          "name": '',
          "groupName": this.curEditModuleAddress.columnName,
          "type": "BizGroup",
          "seq": 1,
          "remark": '',
          "flag":0,
          "bizAll":this.curEditModuleAddress.dataSource=='0'?1:0,
          "scrollList":[],
          "status":this.curEditModuleAddress.columnShow==1?'show':'hidden',
          "appConfigList": appConfigList,
          "optElementList": []
        }
        console.log(_this.curEditModuleAddress);
        console.log(data);
        _this.loading = true;
        saveModule(data).then(res => {
          _this.loading = false;
          this.editStatus = -1;
          this.curEditModuleAddress.id = res.id;
          _this.curEditModuleAddress = Object.assign({},_this.curEditModuleAddress);
//          console.log('app保存成功！');
//          console.log(_this.show);
        })

      },

      /**
       * 图文*/
      listUrlChange:function (val) {
        var params = {};
        if(this.editData.type==3){//text-img
          params = {url:'',type:'imgtext'};
        }else if(this.editData.type==4){//text
          params = {url:'',type:'text'};
        }
        _this.loading = true;
        getImgTextList(params).then(res=>{
          _this.loading = false;
          this.editData.list = res.slice(0,this.editData.line);;
        })
      },
      textImgEditSure:function (e) {
        this.editStatus = -1;
        var _this = this;
        Object.assign(_this.curEditModuleAddress,_this.editData);
        let data={
          "id": _this.curEditModuleAddress.id?_this.curEditModuleAddress.id:null,
          "workbenchId": 1,
          "name": '',
          "groupName": this.curEditModuleAddress.columnName,
          "type": "optModule",
          "seq": 1,
          "remark": '',
          "flag":0,
          "scrollList":[],
          "status":this.curEditModuleAddress.columnShow==1?'show':'hidden',
          "appConfigList": [],
          "optElementList": [{
            "moduleId": null,
            "name": "",
            "url": this.curEditModuleAddress.dataSourceUrl,
            "seq": 2,
            "tempType": this.curEditModuleAddress.type==3?'imgtext':'text',
            "detailUrl":this.curEditModuleAddress.moreUrl,
            "status": this.curEditModuleAddress.moreShow==1?'show':'hidden',
            "rows":parseInt(this.curEditModuleAddress.line)
          }],
        }
//        console.log(data);
        _this.loading = true;
        saveModule(data).then(res => {
          _this.loading = false;
          this.editStatus = -1;
          this.curEditModuleAddress.id = res.id;
//          console.log('app保存成功！');
//          console.log(_this.show);
        })

      },

      /**
       * 发布*/
      public:function () {
        var seq = [];
        var _this = this;
        _this.show.forEach(function (e ,i) {
          if(e.id){
            seq.push(e.id);
          }
        })
        if(seq.length==0){
          _this.$alert('请先编辑并保存模块！','提示');
          return;
        }
        _this.loading = true;
        saveModuleSeq({ids:seq,type:'publish'}).then(res=>{
          _this.loading = false;
        })
      },

      /**
       * 保存*/
      save:function () {
        var seq = [];
        var _this = this;
        _this.show.forEach(function (e ,i) {
          if(e.id){
            seq.push(e.id);
          }
        })
        if(seq.length==0){
          _this.$alert('请先编辑并保存模块！','提示');
          return;
        }
        _this.loading = true;
        saveModuleSeq({ids:seq,type:'save'}).then(res=>{
          _this.loading = false;
        })
      }
    },
    components:{
      NavBar
    },
    watch:{
//      selAppTable:function () {
//        this.editData.dataAppArr = this.selAppTable.map(function (e,i) {
//          return e.bizId;
//        })
//      }
    }
  }
</script>

<style scoped>
  img{
    width: 100%!important;
    height: 100%!important;
    display: block;
  }
  /*#mobile-container{*/
  /*width: 375px;*/
  /*height: 667px;*/
  /*border: 1px solid #d9d9d9;*/
  /*}*/
  #module-container{
    width: 240px;
    min-height: 560px;
    border: 1px solid #d9d9d9;
    background: #fff;
    height: 560px;
    /*overflow-x: hidden;*/
    overflow-y: scroll;
  }
  #mobile-container{
    width: 300px;
    min-height: 480px;
    border: 1px solid #d9d9d9;
    background: #fff;
  }
  #edit-container{
    border: 1px solid #d9d9d9;
    width: 300px;
  }
  #edit-carousel-container,#edit-img-text-container,#edit-app-icon-container{
    width: 100%;
    background: #fff;
    font-size: 12px;
  }
  .el-carousel__item{
    background: #d9d9d9;
  }
  .el-carousel-tips:after{
    content:'';
    display: block;
    position: absolute;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: .4;
    z-index: 3;
  }
  .el-carousel-tips{
    color: #fff;
    line-height: 34px;
    padding: 0px 15px;
  }
  /*@media(max-width: 1280px) {*/
    /*#edit-container,#edit-carousel-container,#edit-img-text-container,#edit-app-icon-container{*/
      /*!*width: 375px;*!*/
      /*width: 320px;*/
      /*!*border: 1px solid #d9d9d9;*!*/
      /*background: #fff;*/
    /*}*/
  /*}*/
  /*@media(min-width: 1335px) {*/
    /*#edit-container,#edit-carousel-container,#edit-img-text-container,#edit-app-icon-container{*/
      /*width: 300px;*/
      /*!*border: 1px solid #d9d9d9;*!*/
      /*background: #fff;*/
    /*}*/
  /*}*/


  .pic-item{
    border:1px solid #d9d9d9;
  }
  .pic-item:not(last-child){
    margin-bottom: 15px;
  }
  .el-form-item{
    margin-bottom: 0px;
  }
  embed:hover{
    color:#20a0ff;
  }
  .el-radio+.el-radio{
    margin-left: 0px;
  }
  /*#text-img-list li{*/
  /*border:1px dashed transparent;*/
  /*border-radius: 4px;*/
  /*}*/
  /*#text-img-list li:hover{*/
  /*border:1px dashed #409EFF;*/
  /*cursor: pointer;*/
  /*}*/

  .text-img-container{
    padding-left: 75px;
    min-height: 60px;
    position: relative;
  }
  .text-img-container img{
    position: absolute;
    top:0;
    left:0;
    width: 60px!important;
    height: 60px!important;
  }
  .text-img-container,.text-container{
    margin-bottom: 10px;
  }
  /*.el-table, .el-table--fit, .el-table--enable-row-transition{*/
  /*border-right:none!important;*/
  /*}*/


</style>
