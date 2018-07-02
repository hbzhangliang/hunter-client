<template>
    <div>

        <template>
            <div class="tableBox">
                <div class="pageTableContent">
                    <el-button type="primary" @click="addModule"><i class="el-icon-plus"></i>添加模块</el-button>
                    <el-table :data="tableData" border width="100%">
                        <el-table-column prop="seq" label="排序" width="80">
                        </el-table-column>
                        <el-table-column prop="templateCode" label="模板编号" width="160">
                        </el-table-column>
                        <el-table-column prop="name" label="模块名字" width="160">
                        </el-table-column>
                        <el-table-column prop="groupName" label="分组名称" width="140">
                        </el-table-column>
                        <el-table-column prop="url" label="链接" width="140">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" width="100">
                        </el-table-column>
                        <el-table-column  label="操作" width="380px">
                            <template slot-scope="scope">
                                <el-button size="mini" type="btnOpt" @click="edit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="btnOpt" @click="del(scope.row.id)">删除</el-button>
                                <el-button size="mini" type="btnOpt" @click="config(scope.row.id)">配置</el-button>
                                <el-button size="mini" type="btnOpt" @click="moveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                                <el-button size="mini" type="btnOpt" v-if="scope.$index < tableData.length -1"@click="moveDown(scope)">下移</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!--弹出框-->
                <el-dialog custom-class="info" title="模块配置" :visible.sync="moduleVisible" width="50%"
                           @close="closeDialog">
                    <div class="modalContent">
                        <el-form  :model="bean" :rules="rules" ref="ruleForm"   class="demo-ruleForm">
                            <div class="demo-input-suffix">
                                <el-form-item label="模板编号" prop="type">
                                    <div>
                                        <el-select style="float:left;" v-model="bean.templateId" v-on:change="showImg()" placeholder="请选择模板">
                                            <el-option
                                                    v-for="item in BizTemplateList"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                        <img v-bind:src="bean.other" width="280px" height="180px" style="float: left"/>
                                    </div>
                                </el-form-item>
                            </div>
                            <div class="demo-input-suffix">
                                <el-form-item label="排序号" prop="seq">
                                    <el-input v-model="bean.seq" placeholder="请输入内容" size="medium"></el-input>
                                </el-form-item>
                            </div>
                            <div class="demo-input-suffix">
                                <el-form-item label="名称" prop="name">
                                    <el-input  v-model="bean.name" placeholder="请输入内容" size="medium"></el-input>
                                </el-form-item>
                            </div>
                            <div class="demo-input-suffix">
                                <el-form-item label="分组名称" prop="name">
                                    <el-input  v-model="bean.groupName" placeholder="请输入内容" size="medium"></el-input>
                                </el-form-item>
                            </div>
                            <div class="demo-input-suffix">
                                <el-form-item label="备注" prop="name">
                                    <el-input  v-model="bean.remark" placeholder="请输入内容" size="medium"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                        <!--</div>-->
                        <div style="text-align: center;margin-top: 10px">
                            <el-button @click="closeDialog">取消</el-button>
                            <el-button type="primary" @click="saveModule">确定</el-button>
                        </div>
                    </div>
                </el-dialog>




                <!--biz scroll-->
                <el-dialog title="轮播图列表" :visible.sync="outerScrollVisible"
                           custom-class="scroll_dialog" width="70%">
                    <el-dialog
                            width="50%"
                            title="轮播图配置"
                            :visible.sync="innerScrollVisible"
                            append-to-body>
                        <div class="scrollContent">
                            <el-form  :model="scroll" class="demo-ruleForm">

                                <div class="demo-input-suffix">
                                    <el-form-item label="图片文字">
                                        <el-input v-model="scroll.showText" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>

                                <div class="demo-input-suffix">
                                    图片URL:<el-input v-model="scroll.url" placeholder="请输入内容" size="medium" class="hidden"></el-input>
                                    <el-upload
                                            action=""
                                            list-type="picture"
                                            :on-preview="handlePictureCardPreview"
                                            :before-upload="beforeUpload"
                                            :file-list="fileList"
                                            :on-remove="handleRemove">
                                        <el-button size="small" type="primary" style="float: left;" >点击上传</el-button>
                                    </el-upload>
                                </div>

                                <!--<div class="demo-input-suffix">-->
                                    <!--<el-form-item label="url">-->
                                        <!--<el-input  v-model="scroll.url" placeholder="请输入内容" size="medium"></el-input>-->
                                    <!--</el-form-item>-->
                                <!--</div>-->
                                <div class="demo-input-suffix">
                                    <el-form-item label="link">
                                        <el-input  v-model="scroll.link" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="显示时长">
                                        <el-input v-model="scroll.duration" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="排序号">
                                        <el-input v-model="scroll.seq" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form>
                            <!--</div>-->
                            <div style="text-align: center;margin-top: 10px">
                                <el-button @click="innerScrollVisible = false">取消</el-button>
                                <el-button type="primary" @click="saveScroll">确定</el-button>
                            </div>
                        </div>

                    </el-dialog>

                    <el-button type="primary" class="addScroll" @click="addScroll"><i class="el-icon-plus"></i>添加轮播图</el-button>
                    <el-table :data="scrollList">
                        <el-table-column property="showText" label="文字" width="160px"></el-table-column>
                        <el-table-column property="url" label="url" width="240px"></el-table-column>
                        <el-table-column property="link" label="link" width="240px"></el-table-column>
                        <el-table-column property="duration" label="时长" width="120px"></el-table-column>
                        <el-table-column property="seq" label="排序号" width="120px"></el-table-column>
                        <el-table-column  label="操作" width="320px">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="scrollEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="info" @click="scrollView(scope.row)">查看</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="scrollDel(scope.row.id)">删除</el-button>
                                <el-button size="mini" type="info" @click="scrollMoveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                                <el-button size="mini" type="info" v-if="scope.$index < scrollList.length -1"@click="scrollMoveDown(scope)">下移</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="outerScrollVisible = false">取 消</el-button>
                    </div>

                </el-dialog>




                <!--biz appConfig-->
                <el-dialog title="订购业务列表" :visible.sync="outerBizAppConfigVisible"
                           custom-class="bizAppConfig_dialog" width="70%">

                    <el-dialog
                            width="50%"
                            title="订购业务配置"
                            :visible.sync="innerBizAppConfigVisible"
                            append-to-body>
                        <div class="bizAppConfigContent">
                            <el-form  :model="bizAppConfig" class="demo-ruleForm">

                                <div class="demo-input-suffix">
                                    <el-form-item label="业务编号">
                                        <el-input v-model="bizAppConfig.bizId" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="业务名称">
                                        <el-input  v-model="bizAppConfig.bizName" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="url">
                                        <el-input v-model="bizAppConfig.url" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="icon">
                                        <el-input v-model="bizAppConfig.icon" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="备注">
                                        <el-input v-model="bizAppConfig.remark" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="排序号">
                                        <el-input v-model="bizAppConfig.seq" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form>
                            <!--</div>-->
                            <div style="text-align: center;margin-top: 10px">
                                <el-button @click="innerBizAppConfigVisible = false">取消</el-button>
                                <el-button type="primary" @click="saveBizAppConfig">确定</el-button>
                            </div>
                        </div>

                    </el-dialog>


                    <h2>企业{{fixedSpId}}订购的业务，从平台获取</h2>
                    <el-table :data="BizAppConfigListPlatForm" width="60%">
                        <el-table-column label="选择" width="80px">
                            <template slot-scope="scope">
                                <input type="checkbox" name="checkBizBox" @click="addOrderBiz(scope.row.bizId)"/>
                            </template>
                        </el-table-column>
                        <el-table-column property="bizId" label="业务编号" width="180px"></el-table-column>
                        <el-table-column property="bizName" label="业务名称" width="140px"></el-table-column>
                        <el-table-column property="url" label="url" width="200px"></el-table-column>
                        <el-table-column property="icon" label="icon" width="320px"></el-table-column>
                        <el-table-column property="seq" label="排序号" width="150px"></el-table-column>
                    </el-table>


                    <el-button type="primary" class="addBizAppConfig" @click="addBizAppConfig"><i class="el-icon-plus"></i>添加订购业务</el-button>
                    <el-table :data="BizAppConfigList" width="60%">
                        <el-table-column property="bizId" label="业务编号" width="140"></el-table-column>
                        <el-table-column property="bizName" label="业务名称" width="140"></el-table-column>
                        <el-table-column property="url" label="url" width="100"></el-table-column>
                        <el-table-column property="icon" label="icon" width="100"></el-table-column>
                        <el-table-column property="remark" label="备注" width="100"></el-table-column>
                        <el-table-column property="seq" label="排序号" width="100"></el-table-column>
                        <el-table-column  label="操作" width="320">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="bizAppConfigEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="info" @click="bizAppConfigView(scope.row)">查看</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="bizAppConfigDel(scope.row.id)">删除</el-button>
                                <el-button size="mini" type="info" @click="bizAppConfigMoveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                                <el-button size="mini" type="info" v-if="scope.$index < BizAppConfigList.length -1"@click="bizAppConfigMoveDown(scope)">下移</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="outerBizAppConfigVisible = false">取 消</el-button>
                    </div>

                </el-dialog>






                <!--opt biz element config-->
                <el-dialog title="自定义业务列表" :visible.sync="outerBizOptElementVisible"
                           custom-class="bizOptElement_dialog" width="60%">

                    <el-dialog
                            width="40%"
                            title="自定义业务数据配置"
                            :visible.sync="innerBizOptElementVisible"
                            append-to-body>
                        <div class="bizOptElementContent">
                            <el-form  :model="bizOptElement" class="demo-ruleForm">
                                <div class="demo-input-suffix">
                                    <el-form-item label="业务名称">
                                        <el-input  v-model="bizOptElement.name" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="url">
                                        <el-input v-model="bizOptElement.url" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="内容url">
                                        <el-input v-model="bizOptElement.detailUrl" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="demo-input-suffix">
                                    <el-form-item label="排序号">
                                        <el-input v-model="bizOptElement.seq" placeholder="请输入内容" size="medium"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form>
                            <!--</div>-->
                            <div style="text-align: center;margin-top: 10px">
                                <el-button @click="innerBizOptElementVisible = false">取消</el-button>
                                <el-button type="primary" @click="saveBizOptElement">确定</el-button>
                            </div>
                        </div>

                    </el-dialog>


                    <el-button type="primary" class="addBizOptElement" @click="addBizOptElement"><i class="el-icon-plus"></i>添加自定义业务数据</el-button>
                    <el-table :data="BizOptElementList" width="800px">
                        <el-table-column property="name" label="业务名称" width="200px"></el-table-column>
                        <el-table-column property="url" label="url" width="180px"></el-table-column>
                        <el-table-column property="detailUrl" label="内容链接" width="180px"></el-table-column>
                        <el-table-column property="seq" label="排序号" width="100px"></el-table-column>
                        <el-table-column  label="操作" width="400px">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="bizOptElementEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="info" @click="bizOptElementView(scope.row)">查看</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="bizOptElementDel(scope.row.id)">删除</el-button>
                                <el-button size="mini" type="info" @click="bizOptElementMoveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                                <el-button size="mini" type="info" v-if="scope.$index < BizOptElementList.length -1"@click="bizOptElementMoveDown(scope)">下移</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="outerBizOptElementVisible = false">取 消</el-button>
                    </div>

                </el-dialog>




            </div>


        </template>
    </div>
</template>

<script>
    import end from '@/common/js/utils.js'
    import {fileUpload,bizModuleList,getBizModule,saveBizModule,delBizModule,changeModuleSeq,
        bizScrollList,getBizScroll,saveBizScroll,delBizScroll,changeScrollSeq,
        bizAppConfigList,getBizAppConfig,saveBizAppConfig,delBizAppConfig,changeBizAppConfigSeq,
        bizAppConfigListPlatForm,
        bizTemplateListAll,getBizTemplate,
        bizOptElementList,getBizOptElement,saveBizOptElement,delBizOptElement,changeBizOptElementSeq
    } from '@/api/api'
    import $ from 'jquery'
    import {mapState} from 'vuex'
    export default {
        data: function () {
            return {
                fileList:[],
                currentWorkBenchId:null,
                tableData:[],
                bean:{
                    workbenchId:null,
                    id:null,
                    seq:null,
                    templateId:null,
                    templateCode:null,
                    name:null,
                    remark:null,
                    groupName:null,
                    url:null,
                    flag:null,
                    other:null
                },
                BizTemplateList:[],
                moduleVisible:false,
                isBusy: false,



                rules: {
                    type: [
                        {required: true, message: '请输入模块类型', trigger: 'blur'}
                    ],
                    name:[
                        { required: true, message: '请输入模块名称', trigger: 'blur' }
                    ],
                    seq:[
                        { required: true,type: 'number', message: '请输入模块排序号', trigger: 'blur' }
                    ]
                },
                ruleForm:{
                    type:'',
                    seq:'',
                    name:''
                },
                outerScrollVisible:false,
                innerScrollVisible:false,
                scrollList:[],
                scroll:{
                    id:null,
                    moduleId:null,
                    url:null,
                    showText:null,
                    duration:null,
                    seq:null
                },

                fixedSpId:"17112815160820008975",
                outerBizAppConfigVisible:false,
                BizAppConfigList:[],
                BizAppConfigListPlatForm:[],
                innerBizAppConfigVisible:false,
                bizAppConfig:{
                    id:null,
                    moduleId:null,
                    bizId:null,
                    bizName:null,
                    url:null,
                    icon:null,
                    remark:null,
                    seq:null
                },


                outerBizOptElementVisible:false,
                innerBizOptElementVisible:false,
                BizTemplateList:[],
                BizOptElementList:[],
                bizOptElement:{
                    id:null,
                    moduleId:null,
                    detailUrl:null,
                    name:null,
                    url:null,
                    seq:null
                }

            }
        },
        methods:{
            initData(){
                let _this=this
                if(this.currentWorkBenchId==null) {
                    let routerParams = this.$route.params
                    this.currentWorkBenchId = routerParams.workbenchId
                }
                _this.isBusy=true;
                bizModuleList({"workBenchId":this.currentWorkBenchId}).then(res => {
                    _this.tableData=res;
                    _this.isBusy=false;
                });
                bizTemplateListAll().then(data=>{
                    _this.BizTemplateList=data
                });
            },
            addModule(){
                this.bean={
                    workbenchId:this.currentWorkBenchId,
                    id:null,
                    seq:null,
                    templateId:null,
                    templateCode:null,
                    name:null,
                    remark:null,
                    groupName:null,
                    url:null,
                    flag:true,
                    other:null,
                };
                this.moduleVisible = true
                $(".modalContent input").removeAttr("readonly");
            },
            closeDialog(){
                this.moduleVisible = false
            },
            showImg(){
                var  templateId=this.bean.templateId
                let _this=this
                getBizTemplate({id:templateId}).then(res=>{
                    console.log(res)
                    _this.bean.other=res.url
                    _this.bean.templateCode=res.code
                });
            },
            edit(item){
                this.bean={
                    workbenchId:1,
                    id:item.id,
                    seq:item.seq,
                    templateId:item.templateId,
                    templateCode:item.templateCode,
                    name:item.name,
                    remark:item.remark,
                    groupName:item.groupName,
                    url:item.url,
                    flag:item.flag,
                    other:null,
                };
                this.showImg()
                this.moduleVisible = true
                $(".modalContent input").removeAttr("readonly");
            },
            saveModule(){
                let _this=this
                this.bean.seq=parseInt(this.bean.seq);
                saveBizModule(_this.bean).then(() => {
                    _this.$message.success('保存成功')
                    _this.moduleVisible = false
                    _this.initData();
                })
            },
            moveUp(scope){
                var id1=this.tableData[scope.$index].id;
                var id2=this.tableData[scope.$index-1].id;
                this.changeSeq(id1,id2);
            },
            moveDown(scope){
                var id1=this.tableData[scope.$index].id;
                var id2=this.tableData[scope.$index+1].id;
                this.changeSeq(id1,id2);
            },
            changeSeq(id1,id2){
                changeModuleSeq({"id1":id1,"id2":id2}).then(() => {
                    this.initData();
                })
            },
            del(id){
                let _this=this
                this.$confirm('确认删除？')
                    .then(res => {
                        delBizModule({id}).then(() => {
                            _this.$message.success('删除数据成功')
                            _this.moduleVisible = false
                            _this.initData();
                        })
                    });
            },


            config(moduleId){
                var _this=this;
                _this.isBusy = true;
                getBizModule({"id":moduleId}).then(res => {
                    switch (res.templateCode){
                        //轮播图
                        case "Slide":{
                            _this.scroll.moduleId = moduleId;
                            bizScrollList({"moduleId": moduleId}).then(itemres => {
                                _this.scrollList = itemres;
                                _this.outerScrollVisible = true;
                                _this.isBusy = false;
                            });
                        } break;
                        //订购业务
                        case "BizGroup":{
                            console.log(moduleId)
                            _this.bizAppConfig.moduleId=moduleId;
                            bizAppConfigList({"moduleId": moduleId}).then(bizres => {
                                console.log(bizres)
                                _this.BizAppConfigList = bizres;
                                _this.outerBizAppConfigVisible = true;
                                _this.isBusy = false;
                            });
                            bizAppConfigListPlatForm({"spId": this.fixedSpId}).then(bizresPlat => {
                                _this.BizAppConfigListPlatForm = bizresPlat;
                                _this.outerBizAppConfigVisible = true;
                                _this.isBusy = false;
                            });
                        }break;
                        default:{
                            _this.bizOptElement.moduleId=moduleId;
                            // bizTemplateListAll().then(tempRes => {
                            //     _this.BizTemplateList = tempRes;
                            //     _this.outerBizOptElementVisible = true;
                            //     _this.isBusy = false;
                            // });
                            bizOptElementList({"moduleId": moduleId}).then(optRes => {
                                console.log(optRes)
                                _this.BizOptElementList = optRes;
                                _this.outerBizOptElementVisible = true;
                                _this.isBusy = false;
                            });

                        }break;
                    }
                });
            },

            addScroll(){
                this.scroll={
                    id:null,
                    moduleId:this.scroll.moduleId,
                    url:null,
                    link:null,
                    showText:null,
                    duration:null,
                    seq:null
                };
                this.fileList=[]
                this.innerScrollVisible=true;

            },
            scrollEdit(item){
                this.scroll={
                    id:item.id,
                    moduleId:this.scroll.moduleId,
                    url:item.url,
                    link:item.link,
                    showText:item.showText,
                    duration:item.duration,
                    seq:item.seq
                };
                this.fileList=[]
                this.fileList.push({name:null,url:item.url})
                this.innerScrollVisible=true;
                $(".scrollContent input").removeAttr("readonly");
            },
            scrollView(item){
                this.scrollEdit(item);
                $(".scrollContent input").attr("readonly","readonly");
            },
            saveScroll(){
                console.log(this.scroll)
                saveBizScroll(this.scroll).then(() => {
                    this.$message.success('保存成功')
                    this.innerScrollVisible = false
                    this.config(this.scroll.moduleId)
                })
            },
            scrollDel(id){
                this.$confirm('确认删除？')
                    .then(res => {
                        delBizScroll({id}).then(() => {
                            this.$message.success('删除数据成功')
                            this.innerScrollVisible = false
                            this.config(this.scroll.moduleId)
                        })
                    });
            },
            scrollMoveUp(scope){
                var id1=this.scrollList[scope.$index].id;
                var id2=this.scrollList[scope.$index-1].id;
                this.changeScrollSeq(id1,id2);
            },
            scrollMoveDown(scope){
                var id1=this.scrollList[scope.$index].id;
                var id2=this.scrollList[scope.$index+1].id;
                this.changeScrollSeq(id1,id2);
            },
            changeScrollSeq(id1,id2){
                changeScrollSeq({"id1":id1,"id2":id2}).then(() => {
                    this.config(this.scroll.moduleId)
                })
            },




            //handle for img
            handlePictureCardPreview(file,fileList) {
//              this.imageUrl = file.url;
            },
            handleRemove(file, fileList) {
                this.fileList=[]
                this.configBean.icon=null
            },
            //在这里上传附件
            beforeUpload(file){
                var _this=this;
                let fd = new FormData()
                fd.append('file', file)
                fileUpload(fd).then(res => {
                    var tmp={
                        name:"",
                        url:res
                    }
                    _this.fileList=[]
                    _this.fileList.push(tmp)
                    _this.scroll.url=res
                })
            },




            addBizAppConfig(){
                this.bizAppConfig={
                    id:null,
                    moduleId:this.bizAppConfig.moduleId,
                    bizId:null,
                    bizName:null,
                    url:null,
                    icon:null,
                    remark:null,
                    seq:null
                }
                this.innerBizAppConfigVisible=true;
            },
            bizAppConfigEdit(item){
                this.bizAppConfig={
                    id:item.id,
                    moduleId:this.bizAppConfig.moduleId,
                    bizId:item.bizId,
                    bizName:item.bizName,
                    url:item.url,
                    icon:item.icon,
                    remark:item.remark,
                    seq:item.seq
                }
                this.innerBizAppConfigVisible=true;
                $(".bizAppConfigContent input").removeAttr("readonly");
            },
            bizAppConfigView(item){
                this.bizAppConfigEdit(item);
                $(".bizAppConfigContent input").attr("readonly","readonly");
            },
            saveBizAppConfig(){
                saveBizAppConfig(this.bizAppConfig).then(() => {
                    this.$message.success('保存成功')
                    this.innerBizAppConfigVisible = false
                    this.config(this.bizAppConfig.moduleId)
                })
            },
            bizAppConfigDel(id){
                this.$confirm('确认删除？')
                    .then(res => {
                        delBizAppConfig({id}).then(() => {
                            this.$message.success('删除数据成功')
                            this.innerBizAppConfigVisible = false
                            this.config(this.bizAppConfig.moduleId)
                        })
                    });
            },
            bizAppConfigMoveUp(scope){
                var id1=this.BizAppConfigList[scope.$index].id;
                var id2=this.BizAppConfigList[scope.$index-1].id;
                this.changeBizAppConfigSeq(id1,id2);
            },
            bizAppConfigMoveDown(scope){
                var id1=this.BizAppConfigList[scope.$index].id;
                var id2=this.BizAppConfigList[scope.$index+1].id;
                this.changeBizAppConfigSeq(id1,id2);
            },
            changeBizAppConfigSeq(id1,id2){
                changeBizAppConfigSeq({"id1":id1,"id2":id2}).then(() => {
                    this.config(this.bizAppConfig.moduleId)
                })
            },
            addOrderBiz(id){
                let _this=this
                _this.BizAppConfigListPlatForm.forEach(res=>{
                    if(res.bizId==id){
                        _this.bizAppConfig={
                            moduleId:_this.bizAppConfig.moduleId,
                            bizId:res.bizId,
                            bizName:res.bizName,
                            url:res.url,
                            icon:res.icon
                        }
                        this.saveBizAppConfig().then(t=>{
                            this.config(this.bizAppConfig.moduleId)
                            }
                        )
                    }
                })
            },







//      自定义业务数据编辑
            addBizOptElement(){
                this.bizOptElement={
                    id:null,
                    moduleId:this.bizOptElement.moduleId,
                    detailUrl:null,
                    name:null,
                    url:null,
                    seq:null,
                    flag:true
                }
                this.innerBizOptElementVisible=true;
            },
            bizOptElementEdit(item){
                this.bizOptElement={
                    id:item.id,
                    moduleId:this.bizOptElement.moduleId,
                    detailUrl:item.detailUrl,
                    name:item.name,
                    url:item.url,
                    seq:item.seq,
                    flag:item.flag
                }
                this.innerBizOptElementVisible=true;
                $(".bizOptElementContent input").removeAttr("readonly");
            },
            bizOptElementView(item){
                this.bizOptElementEdit(item);
                $(".bizOptElementContent input").attr("readonly","readonly");
            },
            bizOptElementDel(id){
                this.$confirm('确认删除？')
                    .then(res => {
                        delBizOptElement({id}).then(() => {
                            this.$message.success('删除数据成功')
                            this.innerBizOptElementVisible = false
                            this.config(this.bizOptElement.moduleId)
                        })
                    });
            },
            bizOptElementMoveUp(scope){
                var id1=this.BizOptElementList[scope.$index].id;
                var id2=this.BizOptElementList[scope.$index-1].id;
                this.changeOptElementSeq(id1,id2);
            },
            bizOptElementMoveDown(scope){
                var id1=this.BizOptElementList[scope.$index].id;
                var id2=this.BizOptElementList[scope.$index+1].id;
                this.changeOptElementSeq(id1,id2);
            },
            changeOptElementSeq(id1,id2){
                changeBizOptElementSeq({"id1":id1,"id2":id2}).then(() => {
                    this.config(this.bizOptElement.moduleId)
                })
            },
            saveBizOptElement(){
                saveBizOptElement(this.bizOptElement).then(() => {
                    this.$message.success('保存成功')
                    this.innerBizOptElementVisible = false
                    this.config(this.bizOptElement.moduleId)
                })
            }


        },
        components: {},
        computed: {
            ...mapState(["spId", "appId"])
        },
        mounted(){
            this.initData();
        }
    }

</script>

<style>

    .hidden{
        display:none;
    }

</style>
