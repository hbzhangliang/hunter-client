<template>
    <div class="mobile-preview" >
        <publish-dialog></publish-dialog>
        <div class="content">
            <h3 v-text="detail.title" class="font-s-14 fw-500 m-b-5"></h3>
            <div class="m-b-10">
                <span class="c-ccc">是疯疯癫癫个该发</span>
                <span class="c-ccc" v-text="detail.mediaSource"></span>
                <span class="c-ccc" v-text="moment(detail.createTime).format('YYYY-MM-DD')"></span>
            </div>
            <div  v-html="contents"></div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import publishDialog from './components/publishDialog.vue'
    import {getContentDetail} from '@/api/api'
    export default {
       name:'mobile-preview',
        components:{publishDialog},
       data () {
           return {
               detail:{
                   title:'',
                   content:'',
                   mediaSource:'帜讯信息',
                   createTime:''
               },
               moment: moment,
               content:'<p style="height:900px">是否更可能是根据南京南</p><p>放开你今年开工纪念馆等功能决定根据你的功夫的概率将电脑</p><p>申达股份独孤皇后该发<img src=\\"http://terminal-center.oss-cn-hangzhou.aliyuncs.com/umsapp6.1.0/attachments/5b1fb1d5283f2e7590807999\\"></p>'
           }
       },
       created(){
            this.render();
       },
        computed:{
           contents(){
               if(!this.content) return '';
               return this.content.replace(/\\"/g,"")
           }
        },
       methods:{
           async render(){
               try{
                   const query = this.$route.query
                   const r = await getContentDetail({'id':query.id});
                   this.detail = Object.assign({},this.detail, r);

               }catch(e){
                   console.log(e)
               }
           }
       }
   }
</script>

<style lang="scss">
    .mobile-preview{
        padding:40px;
        .content{
            overflow-y: scroll;
            overflow-x: hidden;
            padding:10px;
            width: 375px;
            height: 667px;
            border: 1px solid rgba(174,174,174,1);
            margin:auto;
            img{
                width:300px;
            }
        }
    }
</style>
