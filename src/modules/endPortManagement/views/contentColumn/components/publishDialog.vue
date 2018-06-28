<template>
    <div class="publish-dialog">
        <el-dialog
                title="内容管理-发布"
                :visible.sync="isShow"
                @close="cancel"
                width="30%">
            <el-form ref="form2">
                <el-form-item label="标题">
                    <span v-text="detail.title"></span>
                </el-form-item>

                <el-form-item label="摘要">
                    <span v-text="detail.summary"></span>
                </el-form-item>

                <el-form-item label="配图1">
                    <span class="w-100"><img class="w-100" :src="detail.mobileImage" alt=""></span>
                </el-form-item>

                <el-form-item label="配图2">
                    <span class="w-100"><img class="w-100" :src="detail.pcImage" alt=""></span>
                </el-form-item>

                <el-form-item label="发布至">
                     <ul class="inline w-250">
                        <li v-for="(item,index) in detail.list" :key="item.terminalId">
                            <span class="inline vertical-a-t" v-text="item.name"></span>
                            <el-checkbox-group class="inline w-200 vertical-a-t" v-model="checkedList[index]">
                                <el-checkbox v-for="subItem in item.list"  :label="subItem.colId" :key="subItem.colId">{{subItem.colName}}</el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <!--<li>-->
                            <!--<span class="inline vertical-a-t">微信</span>-->
                            <!--<el-checkbox-group class="inline w-200 vertical-a-t" v-model="wxCheckedList">-->
                                <!--<el-checkbox label="复选框 A"></el-checkbox>-->
                                <!--<el-checkbox label="复选框 B"></el-checkbox>-->
                                <!--<el-checkbox label="复选框 C"></el-checkbox>-->
                                <!--<el-checkbox label="禁用" ></el-checkbox>-->
                                <!--<el-checkbox label="选中且禁用"></el-checkbox>-->
                            <!--</el-checkbox-group>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="inline vertical-a-t">门户</span>-->
                            <!--<el-checkbox-group class="inline w-200 vertical-a-t" v-model="portalCheckedList">-->
                                <!--<el-checkbox label="复选框 A"></el-checkbox>-->
                                <!--<el-checkbox label="复选框 B"></el-checkbox>-->
                                <!--<el-checkbox label="复选框 C"></el-checkbox>-->
                                <!--<el-checkbox label="禁用" ></el-checkbox>-->
                                <!--<el-checkbox label="选中且禁用"></el-checkbox>-->
                            <!--</el-checkbox-group>-->
                        <!--</li>-->
                    </ul>
                </el-form-item>

                <el-form-item>
                    <span class="font-s-14" slot="label">推送通知</span>
                    <el-radio v-model="detail.isPushMessage" label="on">开</el-radio>
                    <el-radio v-model="detail.isPushMessage" label="off">关</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="releaseColContent">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getReleaseInfo,releaseColContent} from '@/api/api'
    export default {
        name:'publish-dialog',
        props: {
            isDialogVisible: {
                type: Boolean,
                default: true
            },
            id:{
                type:''
            }
        },
        data () {
            return {
                detail:{
                    list:[],
                    isPushMessage:'off'
                },
                isShow: this.isDialogVisible,
                portalCheckedList:[],
                checkedList:[],
            }
        },
        created(){
           this.init();
        },
        methods:{
            async init(){
                try{
                    this.portalCheckedList =[];
                    this.checkedList =[];
                    this.detail.list = [];
                    this.detail.isPushMessage = 'off';

                    const r = await getReleaseInfo({id: this.id});
                    this.detail = Object.assign({},this.detail,r[0])
                    this.detail.list.map(v=>this.checkedList.push([]));
                    this.checkedList.map((v,i)=>{
                        if(this.detail.list[i].list){
                            this.detail.list[i].list.map((val,index)=>{
                                if(val.checkOn) v.push(val.colId)
                            })
                        }
                    })
                }catch(e){
                    console.log(e)
                }
            },
            releaseColContent(){
                releaseColContent(this.publishList).then(r=>{
                    console.log(r)
                    this.$message.success('发布成功')
                    this.isShow = false;
                }).catch(e=>{
                    this.$message.error('发布失败')
                    console.log(e)
                })
            },
            cancel(){
                this.$emit('handelClose');
            }
        },
        computed:{
            publishList(){
                const arr = [];
                this.checkedList.map((v,i) =>{
                    // console.log(this.detail.list[i])
                    const o = {
                        "colConId":this.detail.id,
                        "terminalId": this.detail.list[i].terminalId,
                        "colId":v.join(','),
                        "isPushMessage": this.detail.isPushMessage
                    }
                    arr.push(o)
                })
                return  arr;
            }
        },
        watch: {
            isDialogVisible(val) {
                this.isShow = this.isDialogVisible
                if(val){
                    this.init()
                }
            }
        }
    }
</script>

<style lang="scss">
    .publish-dialog{
        .el-checkbox-group{
            .el-checkbox {
                margin-right: 0;
                margin-left: 10px;
                .el-checkbox__label{
                    font-size: 12px;
                }
            }
        }
    }
</style>
