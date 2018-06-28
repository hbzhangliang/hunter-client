<template>
    <div class="menu-header bgc-f7f7fb">
        <div v-if="isShow">
            <span><img :src="emblem" alt=""></span>
            <span class="m-l-10">智慧党建</span>
        </div>
    </div>
</template>

<script>
    import emblem from '../../static/img/emblem.png'
    export  default {
        name:'menu-header',
        data () {
            return {
                emblem: emblem
            }
        },
        props:{
            isShow:{
                type: Boolean,
                default:false
            }
        }
    }
</script>

<style lang="scss">
    .menu-header{
        width: 180px;
        height: 76px;
        display: inline-block;
        vertical-align: top;
        padding:14px 18px;
        border-bottom: 1px solid #eaeaea;
        border-right: 1px solid #eaeaea;
        span{
           display: inline-block;
           vertical-align: middle;
            font-size: 14px;
            img{
                display: block;
            }
        }
    }
</style>
