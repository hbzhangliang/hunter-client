<template>
    <section class="end-container clearfix" v-loading.fullscreen="loading">
        <div class="clearfix" style="display: flex;justify-content: space-between">
            <div id="module-container" class="">
                <div class="border-b tac fw-blod padd-10">模版库</div>
                <div class="cur-p" v-for="item in templateList" @click="addModule(item)">
                    <img :src="item.url" alt="">
                </div>
            </div>

            <div id="mobile-container">
                <div class="border-b tac fw-blod padd-10">工作台</div>
                <div class="cur-p" v-for="(item,index) in show" :key="index">
                    <img :src="item.url" alt="" @click="moduleEdit(index,item)">

                    <span class="flr">
                      <el-button type="text" @click="moduleEdit(index,item)">编辑</el-button>
                      <el-button type="text" @click="moduleDel(index,item)">删除</el-button>
                      <el-button type="text" @click="moduleUp(index,item)" v-show="index!=0">上移</el-button>
                      <el-button type="text" @click="moduleDown(index,item)" v-show="index!=show.length-1">下移</el-button>
                    </span>
                </div>

                <div class="tac" style="margin-top: 45px;padding: 15px;border: 1px solid lightgrey">
                    <el-button size="small" @click="cancel">返回</el-button>
                    <el-button size="small" type="primary" @click="save">保存</el-button>
                </div>
            </div>

            <div id="edit-container">
                <div class="border-b tac fw-blod padd-10">编辑区</div>

                <el-form v-show="showModule1" label-width="70px">
                    <el-form-item label="组名">
                        <el-input v-model="editModule.groupName" placeholder="请输入组名" size="small"/>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="editModule.name" placeholder="请输入名称" size="small"/>
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input v-model="editModule.url" placeholder="请输入URL" size="small"/>
                    </el-form-item>
                    <el-form-item label="显示">
                        <el-radio v-model="editModule.status" label="hide">隐藏</el-radio>
                        <el-radio v-model="editModule.status" label="show">显示</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" @click="tempCancel">取消</el-button>
                        <el-button type="primary" size="small" @click="tempSave">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
    import NavBar from '@/components/navBar'
    import {bizTemplateListAll,saveModule,fileUpload,saveBizModule,getAppList,saveModuleSeq,getAllModule,getImgTextList} from '@/api/api';
    import $ from 'jquery'
    export default {
        data: function () {
            return {
                loading: false,
                defaultWorkBenchId:1, //后面动态获取
                templateList:[],
                show:[],
                editModule:{
                    id:null,
                    groupName:null,
                    name:null,
                    url:null,
                    seq:null,
                    status:null,
                    flag:null
                },
                editModuleIndex:0,
                showModule1:false
            }
        },
        mounted(){
            this.initTemplage()

        },
        methods:{
            //初始化模板数据
            initTemplage(){
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
            addModule(item){
                this.show.push(item)
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
                let _this=this
                _this.showModule1=true
                _this.editModuleIndex=index
                if(item.module==null){
                    _this.editModule={
                        id:null,
                            groupName:null,
                            name:null,
                            url:null,
                            seq:null,
                            status:null,
                            flag:null
                    }
                }
                else {
                    _this.editModule={
                        id:item.module.id,
                        groupName:item.module.groupName,
                        name:item.module.name,
                        url:item.module.url,
                        seq:item.module.seq,
                        status:item.module.status,
                        flag:item.module.flag,
                    }
                }
            },
            tempCancel(){
                this.showModule1=false
            },
            tempSave(){
                let _this=this
                _this.show[_this.editModuleIndex].module=_this.editModule
            },
            cancel(){
                this.showModule1=false
                this.show=[]
            },
            save(){
                console.log(this.show)
            }
        },
        components:{
            NavBar
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
        width: 240px;
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
        width: 300px;
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