<template>
	<div class="turn-off dialog-com">
		<el-dialog
		  title="提示"
		  :visible.sync="isShow"
		  :text="text"
		  :status="status"
		  @close="cancel"
		  width="30%">
		  <span>{{text}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="isShow = false" size="small">取 消</el-button>
		    <el-button type="primary" @click="modifyHandel"  size="small">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
    import {contModifyStatus} from '@/api/api'
	export default{
		props: {
            statusDialogVisible: false,
            id:'',
            text:'',
            status:'',//0-关闭1-开启
        },
		data(){
			return{
               isShow: this.statusDialogVisible,
			}
		},
		methods:{
			modifyHandel(){
                let param = {
			        "ids":this.id,
			        "actionType":this.status//0-关闭1-开启
			    };
		        contModifyStatus(param).then(res => {
		           this.$message.success( '修改成功!');
		           this.isShow = false;
		        })
		        .catch(function(err) {
		        	this.$message.error('修改失败')
		        });
            },
			cancel(){
                this.$emit('statusHandelClose');
            }
		},
		watch: {
            statusDialogVisible() {
                this.isShow = this.statusDialogVisible
            }
        }
	}
</script>
<style lang="scss">
@import "./dialog.scss";
</style>