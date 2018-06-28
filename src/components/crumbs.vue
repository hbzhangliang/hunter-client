<template>
    <section class="crumbs bgc-fff">
        <!--<p class="font-s-18 c-333">App管理</p>-->
        <p class="font-s-12 m-t-10">
            <a href="#/">
                <span>首页</span>
                <slot name="test"></slot>
            </a>
            <span v-if="$route.name!='firstPage'">&nbsp>&nbsp
            <a>{{pname}}</a>
            &nbsp>&nbsp
            {{name}}</span>
        </p>
        <!--<p>{{data}}</p>-->
        <!--<button @click="upData">up</button>-->
    </section>
</template>
<script>
    export default{
        props: {
            data: {
                type: String,
                default: 'ceshi'
            }
        },
        data () {
            return {
                pname:"",
                name: '',
                name2: '',
                menuConfig:[
                    {code:"styleConfig",pname:"终端中心",name:"风格配置"},
                    {code:"pageConfig",pname:"终端中心",name:"页面配置"},
                    {code:"optConfigElement",pname:"终端中心",name:"自定义业务模板配置"},
                    {code:"openContent",pname:"终端中心",name:"开放服务内容管理"},
                    {code:"redisServer",pname:"终端中心",name:"Redis缓存"},

                    {code:"positionServer",pname:"App开放服务",name:"定位服务"},
                    {code:"base",pname:"App开放服务",name:"基础服务"},
                    {code:"share",pname:"App开放服务",name:"分享服务"},
                    {code:"image",pname:"App开放服务",name:"图像服务"},
                    {code:"voice",pname:"App开放服务",name:"录音服务"},
                    {code:"doc",pname:"App开放服务",name:"文件服务"},
                    {code:"location",pname:"App开放服务",name:"位置服务"},
                    {code:"scan",pname:"App开放服务",name:"扫一扫"},
                    {code:"shake",pname:"App开放服务",name:"摇一摇"},
                    {code:"title",pname:"App开放服务",name:"标题控制接口"},
                    {code:"video",pname:"App开放服务",name:"视频服务"},
                    {code:"target",pname:"App开放服务",name:"客户端跳转"},


                    {code:"data_terminal",pname:"数据统计",name:"移动设备终端"},
                    {code:"biz_data",pname:"数据统计",name:"业务访问统计"},
                    {code:"biz_info",pname:"数据统计",name:"业务访问详情"},
                    {code:"sdk_data",pname:"数据统计",name:"JsSDK调用统计"},
                    {code:"sdk_info",pname:"数据统计",name:"JsSDK调用详情"},

                    {code:"event_data",pname:"数据统计",name:"用户行为数据"},
                    {code:"event_info",pname:"数据统计",name:"用户行为数据详情"},
                    {code:"event_sts",pname:"数据统计",name:"用户行为统计"},
                    {code:"user_compose",pname:"数据统计",name:"用户构成数据"},


                    {code:"core_user",pname:"系统管理",name:"用户管理"},
                    {code:"core_role",pname:"系统管理",name:"角色管理"},
                    {code:"core_acl",pname:"系统管理",name:"权限管理"},
                    {code:"core_menu",pname:"系统管理",name:"菜单管理"},
                    {code:"mng_acl",pname:"系统管理",name:"分配权限"},

                    {code:"auth_1",pname:"权限管理",name:"服务权限项管理"},
                    {code:"auth_2",pname:"权限管理",name:"企业账号管理"},
                    {code:"auth_3",pname:"权限管理",name:"账号权限项关联管理"},
                    {code:"auth_4",pname:"权限管理",name:"账号赋予批量成员"},
                    {code:"auth_5",pname:"权限管理",name:"成员赋予批量账号"},
                    {code:"auth_6",pname:"权限管理",name:"成员权限查询"},

                    {code:"createContent",pname:"内容栏目管理",name:"内容新建"},
                    {code:"editContent",pname:"内容栏目管理",name:"内容编辑"},
                    {code:"mobilePreview",pname:"内容栏目管理",name:"移动详情页"},
                    {code:"columnListApp",pname:"内容栏目管理",name:"栏目列表-企业"},
                    {code:"columnList",pname:"内容栏目管理",name:"栏目列表"},
                    {code:"contentList",pname:"内容栏目管理",name:"内容列表"},

                    {code:"corp_terminal",pname:"企业终端管理",name:"企业终端管理列表"},
                    {code:"corp_applist",pname:"企业终端管理",name:"App管理列表"},
                    {code:"corp_workbenchlist",pname:"企业终端管理",name:"工作台列表"},
                    {code:"corp_workbenchconf",pname:"企业终端管理",name:"工作台配置"},
                    {code:"corp_template",pname:"企业终端管理",name:"自定义模板配置"},
                    {code:"corp_fileupload",pname:"企业终端管理",name:"附件上传"},

                    {code:"demo",pname:"微信开放服务",name:"demo"},

                    {code:"workbenchConfig",pname:"终端运营管理",name:"工作台配置"},
                    {code:"companyAppManage",pname:"企业管理",name:"企业App管理"},
                    {code:"packagePage",pname:"终端运营管理",name:"有界面自动打包"},

                    {code:"newTheme",pname:"终端运营管理",name:"新建主题模版"},
                    {code:"newIndustryDefaultConfig",pname:"终端运营管理",name:"新建行业通用App默认资源"},
                    {code:"modifyConfiguration",pname:"终端运营管理",name:"功能配置"},
                    {code:"versionManage",pname:"终端运营管理",name:"企业App管理"},
                    {code:"industryList",pname:"终端运营管理",name:"行业通用App"},
                    {code:"grayLevelPublic",pname:"终端运营管理",name:"App版本灰度发布"},
                    {code:"appVersionPublish",pname:"终端运营管理",name:"App新版本发布"},
                    {code:"companyList",pname:"终端运营管理",name:"企业列表"},
                    {code:"appManageList",pname:"终端运营管理",name:"App管理列表"},
                    {code:"taskManage",pname:"终端运营管理",name:"任务管理"},
                    {code:"templateLibrary",pname:"终端运营管理",name:"工作台模版库"},
                    {code:"themeTemplateLibrary",pname:"终端运营管理",name:"主题模版库"},
                    {code:"appManageSummary",pname:"App管理列表",name:"概览"},
                    {code:"versionManage",pname:"App管理列表",name:"版本管理"},
                    {code:"appVersionPublish",pname:"App管理列表",name:"发布版本"},
                    {code:"grayLevelPublic",pname:"App管理列表",name:"灰度设置"},
                    {code:"modifyConfiguration",pname:"App管理列表",name:"配置管理"},
                    {code:"reStructureApp",pname:"App管理列表",name:"重新打包"},
                    {code:"appDataStaticsg",pname:"App管理列表",name:"数据统计"}
                ]
            }
        },
        methods: {
            upData () {
                this.$emit('name', this.name2)
            },
            reload(){
                var code=this.$route.name;
                var _this=this;
                $.each(this.menuConfig,function (index,item) {
                    if(item.code==code){
                        _this.pname=item.pname;
                        _this.name=item.name;
                    }
                });
            }
        },
        created () {
            this.reload()
        },
        watch:{
            $route(){
                this.reload()
            }
        }
    }
</script>
<style lang="scss">
    .crumbs{
        display: inline-block;
        width: calc(100% - 180px);
        height:76px;
        border-bottom: 1px solid #eaeaea;
        padding:18px 20px;
        vertical-align: top;
        p{
            line-height: 1;
            font-size: 12px;
            a{
                color: #616161;
                font-size: 12px;
            }
        }
    }

</style>
