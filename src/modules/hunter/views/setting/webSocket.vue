<template>
    <section>
        this is page webSocket
        <div>
            <el-input v-model="msg" placeholder="请输入内容" size="medium"></el-input>


            <el-button type="primary" icon="el-icon-search"  @click="ssT">测试</el-button>

            <el-button type="primary" icon="el-icon-search"  @click="ssF">关闭</el-button>
        </div>
    </section>
</template>
<script>
    import {wsTest,wsTest2} from '@/api/api'
    import $ from 'jquery'

    export default {
        // name: 'base',
        data: function () {
            return {
                msg:null,
                ws:null
            }
        },
        methods: {
            ssT(){
                let _this=this
                _this.init_page()
                // wsTest().then(res=>{
                //
                // })
            },
            ssF(){
                this.socketClose()
            },
            init_page(){
                let _this=this
                //判断当前浏览器是否支持WebSocket
                if('WebSocket' in window) {
                    _this.ws = new WebSocket("ws://127.0.0.1:8060/chat");
                } else {
                    alert('当前浏览器 Not support websocket')
                }

                _this.ws.onopen = function(message) {
                   _this.socketOpen(message)
                };
                _this.ws.onclose = function() {
                   _this.socketClose()
                };
                _this.ws.onmessage = function(message) {
                   _this.socketMessage(message)
                };
            },
            socketMessage(message){
                console.log("is on message")
                console.log(message)
                // 消息监听
                this.$message({
                    type: 'info',
                    message: message.data
                })
            },
            socketClose(){
                this.ws.close()
                console.log("is close")
            },
            socketOpen(message){
                console.log("is open")
                this.ws.send({"data":"it is just test"})
                console.log(message)
            }
        },
        beforeDestroy(){
            this.socketClose()
        },
        components: {},
        computed: {},
        created() {
            // this.init_page()
        }

    }
</script>
<style lang="scss" scoped>

</style>
