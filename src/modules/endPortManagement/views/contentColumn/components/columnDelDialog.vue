<template>
	<div class="del dialog-com">
		<el-dialog
		  title="提示"
		  :visible.sync="isShow"
		  @close="cancel"
		  width="30%">
		  <span>是否确认删除？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="isShow = false" size="small">取 消</el-button>
		    <el-button type="primary" @click="delHandel"  size="small">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
    import {deleteCol} from '@/api/api'
	export default{
		props: {
            delDialogVisible: false,
            id:'',
        },
		data(){
			return{
               isShow: this.delDialogVisible,
			}
		},
		methods:{
			delHandel(){
                let param = {
			        "ids":this.id,
			    };
		        deleteCol(param).then(res => {
		           this.$message.success( '删除成功!');
		           this.isShow = false;
		        })
		        .catch(function(err) {
		        	this.$message.error('删除失败')
		        });
            },
			cancel(){
                this.$emit('delHandelClose');
            }
		},
		watch: {
            delDialogVisible() {
                this.isShow = this.delDialogVisible
            }
        }
	}
</script>
<style lang="scss">
@import "./dialog.scss";
</style>