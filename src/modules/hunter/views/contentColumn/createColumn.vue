<template>
    <div class="create-column" >
         <el-form label-width="110px" :model="columnData" :rules="columnDataRule" ref="columnData">
	        <el-form-item label="栏目名称"  prop="name">
	        	<el-input size="small" v-model.tirm="columnData.name"></el-input>
	        </el-form-item>
	       <el-form-item label="栏目描述"  prop="desc">
	        	<el-input size="small" v-model="columnData.desc"></el-input>
	        </el-form-item>
	        <el-form-item label="所属企业"  prop="spName">
	        	<!-- <el-input size="small" v-model.tirm="columnData.spName"></el-input> -->
                <el-autocomplete
                class="inline-input"
                 v-model.tirm="columnData.spName"
                :fetch-suggestions="querySearch"
                placeholder="请输入企业"
                @select="handleSelect"
              ></el-autocomplete>
	        </el-form-item>
	        <el-form-item label="栏目数据类型"  prop="type"> 
	        	 <el-radio-group  @change="getType" v-model="columnData.type">
	                 <el-radio  label="OPEN" value="OPEN">开放</el-radio>
	                 <el-radio  label="INTERFACE" value="INTERFACE">接口</el-radio>
                </el-radio-group>
                 <div class="interface" ref="interface">
                 	<el-input class="w-150 marr-15" size="small" v-model="columnData.url"></el-input>
        			<el-button type="primary" size="small" class="flr"><span>选择</span></el-button>
                 </div>
	        </el-form-item>
	       <el-form-item>
	          <el-button class="w-130" size="small" @click="resetColumn">取消</el-button>
	          <el-button type="primary" class="w-130" size="small" @click="saveColumn">提交</el-button>
	        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
Vue.use(axios);
import {getTerminalList} from '@/api/api'
export default {
  name: "create-column",
  data() {
    return {
    	columnData:{
    		name:'',//栏目名称
    		desc:'',//栏目描述
    		spName:'',//所属企业
        spId:'',
    		type:'OPEN',//栏目类型 开放OPEN，接口INTERFACE
    		columnCode:'',//栏目编码
    		url:'',//接口地址
    		terminalId:''//终端类型
    	},
    	typeR:'OPEN',
    	columnDataRule: { //新建栏目rule 
	        name: [{required: true, message: '请输入栏目名称', trigger: 'blur'}],
	        spName: [{required: true, message: '请输入企业名称', trigger: 'blur'}]
	    },
      restaurants: [],
      columnListData:[],
      pageParams: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 0
      },
      target:[],
      targetOptions:[],
    };
  },
  mounted() {
      this.loadAll();
  },
  created() {
    getTerminalList({"catagoryName":"terminal"}).then(r=>{
      this.targetOptions = r;
      console.log(r[0])
      this.target = [r[0].id]
    }).catch(e=>{
      console.log(e)
    })
  },
  methods:{
    //搜索企业s
    querySearch(queryString, cb) {
        var restaurants = this.columnListData;
        console.log(restaurants)
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        results.forEach(item=>{
            item.value = item.spName;
        });
        if(results.length){ //如果有则
          // 调用 callback 返回建议列表的数据
           cb(results);
        }else{
            this.loadAll().then(res=>{
               this.columnListData.forEach(item=>{
                item.value = item.spName;
               });
               cb(this.columnListData);
            });
        }
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.spName.indexOf(queryString) === 0);
        };
      },
      loadAll() {
        let fault = {
          "page": this.pageParams.currentPage,
          "pageSize": this.pageParams.pageSize,
        };
        let searchFilter = {
            spName: this.columnData.spName,
        }
        let param = Object.assign(fault, {filter: searchFilter});
       let promise =  axios
          .post("/api/corp/corp-app-list", param, {})
          .then(res => {
            this.columnListData = []
            //验证没有则清空spName
            this.columnListData = res.data.data.data || []; 
             console.log(this.columnListData)
          })
          .catch(function(err) {
          });

       return promise;   
      },
      handleSelect(item) {
        this.columnData.spId = item.id;
        this.$refs.columnData.validateField('spName');
      },
    //搜索企业e
  	getType(){
  	  let type = this.columnData.type;
  	  let interfaces = this.$refs.interface;
  	  console.log(interfaces)
  	  if(type == 'INTERFACE'){
  	  	  interfaces.style.display = "block";
  	  }else{
  	  	  interfaces.style.display = "none";
  	  }	
  	},
  	saveColumn(){
	   //type为接口时，url不能为空
    	let url = this.columnData.url;
    	let pattern = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
    	if(this.columnData.type == 'INTERFACE'){
    		if((url == "") || !pattern.test(url)){
    			this.$message.error("请输入有效的接口地址！");
    			return false;
    		}
    	}
    	this.inserColumn();
    },
  	inserColumn(){
	    this.$refs.columnData.validate((valid) => {
			if (valid) {
	            let param = {
	            	columnCode:this.columnData.columnCode,
		    		    // terminalId:this.columnData.terminalId,
                terminalId: this.target.join(','),
                name:this.columnData.name,
                desc:this.columnData.desc,
                spName:this.columnData.spName,
                type:this.columnData.type,
                url:this.columnData.url,
		    	};

		    	axios.post('/api/column-manager/saveCol', param, {    
	            }).then(res =>{
	            	let code = res.data.code;
	            	if(code == -4001){//-4001栏目名称已经存在！
                        this.$message.error(res.data.message);
	            	}else{
		            	this.$message.success( '新建成功!');
		            	this.resetColumn();
		            	this.getType();
		            	this.columnData.url='';
		            	this.$router.push({ path: `columnList`});
	            	}
	            }).catch(function(err){
                    this.$message.error(res.data.message);
	            });            
	        } else {
				return false;
			}
		});
  	},
  	//重置
	resetColumn() {
       this.$refs.columnData.resetFields();
    },
  }
};
</script>

<style lang="scss">
.create-column{
   padding: 30px 40px;
   position: relative;
   .el-input__inner{
   	width:320px;
   }
   .interface{
   	display:none;
   	width:320px;
   	overflow:hidden;
   	.el-input__inner{
   		width:240px;
   	}
   	.el-button{
   		width:80px;
   		margin-top:5px;
   		border-top-left-radius: 0;
   		border-bottom-left-radius: 0;    
   	} 
   }
   .w-130{
   	width:130px;
   }
}
</style>