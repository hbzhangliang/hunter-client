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
                this.ws.close()
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
                    // 连接回调
                    console.log("is open")
                    _this.ws.send({"data":"it is just test"})
                    console.log(message)
                };
                _this.ws.onclose = function(message) {
                    // 断开连接回调
                    console.log("is close")
                    console.log(message)
                };
                _this.ws.onmessage = function(message) {
                    console.log("is on message")
                    console.log(message)
                    // 消息监听
                    _this.msg+=message.data+";"
                };
            }
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
