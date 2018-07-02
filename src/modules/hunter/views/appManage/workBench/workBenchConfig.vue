<template>
    <section class="end-container clearfix" v-loading.fullscreen="loading">
        <div class="clearfix" style="display: flex;justify-content: space-between;">
            <div id="module-container" class="">
                <div class="border-b tac fw-blod padd-10">模版库</div>
                <div class="cur-p" v-for="item in blockList" @click="addModule(item)">
                    <img :src="item.img" alt="">
                </div>
            </div>

            <div id="mobile-container">
                <div class="border-b tac fw-blod padd-10">工作台</div>
                <div class="cur-p" v-for="(item,index) in show" :key="index">

                    <img :src="item.bizBlock==null?item.tempImg:item.bizBlock.img" alt="" @click="moduleEdit(index,item)">
                    <span class="flr">
                      <el-button type="text" :disabled="configEditStatus" @click="moduleEdit(index,item)">编辑</el-button>
                      <el-button type="text" :disabled="configEditStatus" @click="moduleDel(index,item)">删除</el-button>
                      <el-button type="text" :disabled="configEditStatus" @click="moduleUp(index,item)" v-show="index!=0">上移</el-button>
                      <el-button type="text" :disabled="configEditStatus" @click="moduleDown(index,item)" v-show="index!=show.length-1">下移</el-button>
                    </span>
                </div>

                <div class="tac" style="margin-top: 45px;padding: 15px;border: 1px solid lightgrey">
                    <!--<el-button size="small" @click="cancel">返回</el-button>-->
                    <el-button size="small" :disabled="configEditStatus" type="primary" @click="save">保存</el-button>
                    <el-button type="primary" :disabled="configEditStatus" size="small" @click="publish">发布</el-button>
                </div>
            </div>

            <div id="edit-container">
                <div class="border-b tac fw-blod padd-10" @click="showInfo">编辑区</div>

                <el-form v-show="showModule1" label-width="60px">

                    <div v-if="editModule.tempCode=='Slide'" >
                        <div v-for="index in [0,1,2]" style="margin:15px 20px 15px 0px">
                            <el-form-item label="图标">
                                <el-input :disabled="configEditStatus" v-model="slideTemp[index].url" placeholder="请输入名称" size="small"/>
                            </el-form-item>
                            <el-form-item label="文字">
                                <el-input :disabled="configEditStatus" v-model="slideTemp[index].showText" placeholder="请输入URL" size="small"/>
                            </el-form-item>
                            <el-form-item label="链接">
                                <el-input :disabled="configEditStatus"  v-model="slideTemp[index].link" placeholder="请输入URL" size="small"/>
                            </el-form-item>
                        </div>
                    </div>
                    <div v-else-if="editModule.tempCode=='BizGroup'">
                        <div>
                            <h2>当前企业订购的所有业务</h2>
                            <el-table :data="orderAppList" border width="100%">
                                <el-table-column prop="" label="选择" min-width="5%">
                                    <template slot-scope="scope">
                                        <input type="checkbox" :disabled="configEditStatus" name="chooseIds" @click="addOrderApp(scope.row)"/>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="编号" min-width="10%">
                                </el-table-column>
                                <el-table-column prop="appName" label="名称" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="appLogo" label="logo" min-width="20%">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.appLogo" style="width: 20px;height: 20px;"/>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="appUrl" label="链接" min-width="20%">
                                </el-table-column>
                            </el-table>
                            <h2>选择的业务</h2>
                            <el-button type="primary" size="small" @click="addOptApp">添加应用</el-button>
                            <el-table :data="chooseAppList" border width="100%">
                                <el-table-column prop="id" label="编号" min-width="10%">
                                </el-table-column>
                                <el-table-column prop="appId" label="业务编号" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="appName" label="名称" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="appLogo" label="logo" min-width="20%">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.appLogo" style="width: 20px;height: 20px;"/>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="appUrl" label="链接" min-width="20%">
                                </el-table-column>
                                <el-table-column  label="操作" min-width="12%">
                                    <template slot-scope="scope">
                                        <el-button type="text" :disabled="configEditStatus" @click="appEdit(scope.row)">编辑</el-button>
                                        <el-button type="text" :disabled="configEditStatus" @click="appDel(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div v-else>
                        <el-form-item label="名称">
                            <el-input v-model="editModule.name" :disabled="configEditStatus" placeholder="请输入名称" size="small"/>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model="editModule.remark" :disabled="configEditStatus" placeholder="请输入URL" size="small"/>
                        </el-form-item>
                        <el-form-item label="url">
                            <el-input v-model="editModule.url" :disabled="configEditStatus" placeholder="请输入URL" size="small"/>
                        </el-form-item>

                        <el-button size="small" :disabled="configEditStatus" @click="chooseColumn">{{columnTitle}}</el-button>


                        <div class="modalContent" v-show="columnShow" style="height: 260px;overflow-y: auto;">
                            <el-input v-model="columnIdChoose" :disabled="configEditStatus" placeholder="所选栏目编号" size="small"/>
                            <el-table :data="columnDataList" border width="100%">
                                <el-table-column prop="" label="选择" min-width="10%" align="center">
                                    <template slot-scope="scope">
                                        <input type="radio" :disabled="configEditStatus" name="chooseColumn" @click="chooseColumnId(scope.row)"/>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="编号" min-width="10%" align="center">
                                </el-table-column>
                                <el-table-column prop="columnCode" label="编码" min-width="15%" align="center">
                                </el-table-column>
                                <el-table-column prop="name" label="名称" min-width="15%" align="center">
                                </el-table-column>
                                <el-table-column prop="url" label="链接" min-width="15%" align="center">
                                </el-table-column>
                            </el-table>
                        </div>

                    </div>

                    <el-form-item>
                        <el-button size="small" :disabled="configEditStatus" @click="tempCancel">取消</el-button>
                        <el-button type="primary" size="small" :disabled="configEditStatus" @click="tempSave">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>


            <el-dialog title="添加应用" :visible.sync="optAppDialog" size="tiny"
                       @close="closeOptAppDiaOptlog">
                <div class="modalContent">
                    <div class="demo-input-suffix">
                        业务编号:<el-input v-model="optAppConfig.appId" :disabled="configEditStatus" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        名称:<el-input v-model="optAppConfig.appName" :disabled="configEditStatus" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        链接:<el-input v-model="optAppConfig.appUrl" :disabled="configEditStatus" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        图标:<el-input v-model="optAppConfig.appLogo" :disabled="configEditStatus" placeholder="请输入内容" size="medium" class="hidden"></el-input>
                    </div>
                </div>
                <div style="text-align: center;margin-top: 25px">
                    <el-button type="primary" :disabled="configEditStatus" @click="saveOptApp">保存</el-button>
                </div>
            </el-dialog>


        </div>
    </section>
</template>

<script>
    import {blockList,fileUpload,
        moduleSaveVo,moduleListVo,orderApps,
        corpAppGet,workbenchPublish,
        columnList
    } from '@/api/api';
    import {mapState} from 'vuex'
    import $ from 'jquery'
    export default {
        data: function () {
            return {
                loading: false,
                defaultWorkBenchId:1, //后面动态获取
                blockList:[],
                show:[],
                editModule:{tempCode:null},
                editModuleIndex:0,
                showModule1:false,
                workBenchId:null,

                slideTemp:[{url:null,showText:null,link:null},{url:null,showText:null,link:null},{url:null,showText:null,link:null}],
                orderAppList:[],
                chooseAppList:[],
                optAppConfig:{
                    appId:null,
                    appKey:null,
                    appName:null,
                    appUrl:null,
                    appLogo:null,
                    suiteappcode:null,
                    description:null
                },
                optAppDialog:false,

                columnShow:false,
                columnDataList:[],
                columnTitle:'显示栏目',
                columnIdChoose:null
            }
        },
        mounted(){
            this.initParams()
            this.initBlocks()
            // this.initModule()
            // this.initOrderAppList()  初始化参数后调用
        },
        inject: ['reload'],
        methods:{
            initOrderAppList(){
                orderApps({"spId":"18061416175120027300"}).then(res=>{
                    this.orderAppList=res
                    console.log(res)
                })
            },
            initParams(){
                let _this=this

                var params = {
                    appId:this.appId,
                    spId:this.spId
                }
                corpAppGet(params).then(res=>{
                    _this.workBenchId=res
                    _this.initModule()
                    _this.initOrderAppList()
                    console.log("workbenchId is "+res)
                })
            },
            emptySlideTemp(){
                this.slideTemp=[{url:null,showText:null,link:null},{url:null,showText:null,link:null},{url:null,showText:null,link:null}]
            },
            //初始化模板数据
            initBlocks(){
                let _this=this
                _this.blockList=[]
                _this.PageForm={
                    page:1,
                    pageSize:100
                }
                blockList(_this.PageForm).then(res=>{
                    res.data.forEach(p=>{
                        if(p.status=='publish'){
                            _this.blockList.push(p);
                        }
                    })
                })
            },
            initModule(){
                let _this=this
                _this.show=[]
                moduleListVo({workBenchId:_this.workBenchId}).then(p=>{
                    console.log(p)
                    p.forEach(res=>{
                        _this.show.push(res)
                    })
                })
            },
            showInfo(){
                // orderApps({"spId":"18060515364620022070"}).then(res=>{
                // })
                columnList({filter:{}}).then(p=>{
                    console.log(p)
                })
            },
            addModule(item){
                let _this=this
                let module={
                    id:_this.editModuleIndex++,
                    name:null,
                    workbenchId:parseInt(_this.workBenchId),
                    groupName:null,
                    tempId:item.id,
                    tempCode:item.code,
                    tempImg:item.img,
                    seq:null,
                    remark:null,
                    url:null,
                    scrollList:[],
                    appConfigList:[],
                    optElementList:[],
                    tColumn:null,
                    isNew:true
                }
                switch (item.code){
                    case "Slide":{

                    }break;
                    case "BizGroup":{

                    }break;
                    case "NewsSectionA":{

                    }break;
                    case "NewsSectionB":{

                    }break;
                    case "NewsSectionC":{

                    }break;
                    case "NewsSectionE":{

                    }break;
                }
                this.show.push(module)
            },
            moduleUp(index,item){
                this.moduleMove(index,"UP")
            },
            moduleDown(index,item){
                this.moduleMove(index,"DOWN")
            },
            moduleMove(index,direction){
                let i="UP"==direction?index-1:index+1
                let tmp=this.show[i]
                this.show[i]=this.show[index]
                this.show[index]=tmp
                //没变化
                let c=this.show
                this.show=[]
                this.show=c
            },
            moduleDel(index,item){
                let d=[]
                this.show.forEach(function (v,i) {
                    if(i!=index){
                        d.push(v)
                    }
                })
                this.show=d
            },
            moduleEdit(index,item){
                this.editModule=item
                this.getModuleData()
            },
            getModuleData(){
                let _this=this
                this.showModule1=true
                console.log(_this.editModule.tempCode)
                // _this.slideTemp=[]
                // console.log(this.editModule.scrollList)
                // if(this.editModule.scrollList==null||this.editModule.scrollList.length<1){
                //     _this.emptySlideTemp()
                // }
                // this.editModule.scrollList.forEach(p=>{
                //     _this.slideTemp.push(p)
                // })

                switch (_this.editModule.tempCode){
                    case "Slide":{
                        _this.slideTemp=[]
                        // _this.emptySlideTemp()
                        if(this.editModule.scrollList==null||this.editModule.scrollList.length<1){
                            _this.emptySlideTemp()
                        }
                        else {
                            _this.editModule.scrollList.forEach(p=>{
                                _this.slideTemp.push(p)
                            })
                        }
                    }break;
                    case "BizGroup":{
                        _this.chooseAppList=[]
                        this.editModule.appConfigList.forEach(p=>{
                            _this.chooseAppList.push(p)
                        })
                    }break;
                    default:{}break;
                }


            },
            tempCancel(){
                this.showModule1=false
            },
            tempSave(){
                let _this=this

                switch (this.editModule.tempCode){
                    case "Slide":{
                        _this.editModule.scrollList=[]
                        _this.slideTemp.forEach(p=>{
                            _this.editModule.scrollList.push(p)
                        })
                        console.log(_this.editModule.scrollList)
                    }break;
                    case "BizGroup":{
                        this.editModule.appConfigList=[]
                        _this.chooseAppList.forEach(p=>{
                            this.editModule.appConfigList.push(p)
                        })
                    }break;
                    default:{
                        // if(_this.editModule.tColumn!=null&&_this.)
                    }break;
                }

            },
            cancel(){
                this.showModule1=false
                this.show=[]
            },
            save(){
                let _this=this
                var seq=0;
                this.show.forEach(p=>{
                    if(p.isNew){
                        p.id=null
                    }
                    p.seq=seq++
                })
                moduleSaveVo(this.show).then(p=>{
                    if(p)
                    _this.$alert("保存数据成功", '提示', {
                        callback : (action) => {
                            _this.reload();
                        }
                    })
                })
            },
            addOrderApp(item){
                var appConfig={
                    appId:item.id,
                    appKey:item.appKey,
                    appName:item.appName,
                    appUrl:item.appUrl,
                    appLogo:item.appLogo,
                    suiteappcode:item.suiteAppCode,
                    description:item.description
                }
                this.chooseAppList.push(appConfig)
            },
            addOptApp(){
                this.optAppConfig={
                    appId:null,
                    appKey:null,
                    appName:null,
                    appUrl:null,
                    appLogo:null,
                    suiteappcode:null,
                    description:null
                }
                this.optAppDialog=true
            },
            saveOptApp(){
                // this.chooseAppList.push(this.optAppConfig)
                this.optAppDialog=false

                var cn=[]
                var _this=this
                this.chooseAppList.forEach(p=>{
                    if(!(p.id==_this.optAppConfig.id||p.appId==_this.optAppConfig.appId)){
                        cn.push(p)
                    }
                })
                cn.push(this.optAppConfig)
                this.chooseAppList=cn
            },
            appDel(item){
                var cn=[]
                this.chooseAppList.forEach(p=>{
                    if(!(p.id==item.id||p.appId==item.appId)){
                        cn.push(p)
                    }
                })
                this.chooseAppList=cn
            },
            appEdit(item){
                this.optAppConfig={
                    appId:item.id,
                    appKey:item.appKey,
                    appName:item.appName,
                    appUrl:item.appUrl,
                    appLogo:item.appLogo,
                    suiteappcode:item.suiteAppCode,
                    description:item.description
                }
                this.optAppDialog=true
            },
            closeOptAppDiaOptlog(){
                this.optAppDialog=false
            },
            publish(){
                let _this=this
                this.show.forEach(p=>{
                    if(p.isNew){
                        p.id=null
                    }
                })
                moduleSaveVo(this.show).then(p=>{
                    if(p){
                        var params=_this.spId==null?{
                            appId:parseInt(_this.appId),
                            workbenchId:parseInt(_this.workBenchId)
                        }:{
                            appId:parseInt(_this.appId),
                            workbenchId:parseInt(_this.workBenchId),
                            spId:_this.spId
                        }
                        workbenchPublish(params).then(res=>{
                            if(res){
                                _this.$alert("发布工作台成功", '提示')
                                return;
                            }
                            _this.$alert("发布工作台失败", '提示')
                        })
                    }
                })
            },
            chooseColumn(){
                columnList({filter:{}}).then(p=>{
                     this.columnDataList= p.data
                })
                if(this.columnShow){
                    this.columnShow=false
                    this.columnTitle='显示栏目'
                }
                else {
                    this.columnTitle='隐藏栏目'
                    this.columnShow=true
                }

            },
            chooseColumnId(item){
                this.columnIdChoose=item.id
                this.editModule.tColumn={
                    id:item.id
                }
            }
        },
        components:{

        },
        computed:{
            ...mapState(["spId","appId", "configEditStatus"])
        }
    }
</script>

<style scoped>
    img{
        width: 100%!important;
        height: 100%!important;
        display: block;
    }
    #module-container{
        width: 300px;
        min-height: 560px;
        border: 1px solid #d9d9d9;
        background: #fff;
        height: 560px;
        /*overflow-x: hidden;*/
        overflow-y: auto;
    }
    #mobile-container{
        width: 300px;
        min-height: 560px;
        border: 1px solid #d9d9d9;
        background: #fff;
        height: 560px;
        overflow-y: auto;
    }
    #edit-container{
        width: 320px;
        min-height: 560px;
        border: 1px solid #d9d9d9;
        background: #fff;
        height: 560px;
        overflow-y: auto;
    }
    .bkBlue{
        background: lightskyblue;
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
</style>