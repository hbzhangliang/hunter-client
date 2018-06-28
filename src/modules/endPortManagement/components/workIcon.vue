<!--
该组件是业务图标选择组件-->
<template>
    <div>
      <section>
        <h3 class="end-title">业务图标选择</h3>
        <div class="radioBox">
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item.appId" v-for="item in allIcon" :key="item">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="tableBox">
          <el-table :data="workIconData" border width="100%;">
            <el-table-column type="index" label="排序" width="80">
            </el-table-column>
            <el-table-column prop="name" label="业务" width="250">
            </el-table-column>
            <el-table-column prop="img" label="图标" width="250">
              <template slot-scope="scope">
                <img :src="scope.row.img" style="width: 50px"/>
              </template>
            </el-table-column>
            <el-table-column  label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="del(scope.row.id,scope.$index)">删除</el-button>
                <el-button type="text" @click="moveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                <el-button type="text" v-if="scope.$index < workIconData.length -1"@click="moveDown(scope)">下移</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
      <div class="btnBox">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"@click="submit">提交</el-button>
      </div>
    </div>
</template>
<script>
  import end from '@/common/js/utils'
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      isAdd: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        workIconData: this.data.sort(end.arrSort('sort')),
        checkList: [],
        allIcon: [],
        isAddVisible: this.isAdd
      }
    },
    methods: {
      cancel () {
        this.$emit('cancel')
      },
      moveUp (scope) {
        this.workIconData[scope.$index].sort--
        this.workIconData[scope.$index - 1].sort++
        end.arrSplice(this.workIconData, scope.$index, scope.$index - 1)
      },
      moveDown (scope) {
        this.workIconData[scope.$index].sort++
        this.workIconData[scope.$index + 1].sort--
        end.arrSplice(this.workIconData, scope.$index, scope.$index + 1)
      },
      del (id, index) {
        console.log(id, index)
        let arr = []
        let sort = this.workIconData[index].sort
        this.$confirm('确认删除？')
          .then(res => {
            this.workIconData.splice(index, 1)
            this.workIconData.map(res => {
              arr.push(res.name)
              if (res.sort > sort) {
                res.sort --
              }
            })
            this.checkList = [...arr]
          })
          .catch();
      },
      submit () {
        this.$emit('submit', this.workIconData, this.isAddVisible)
      }
    },
    watch: {
      checkList (value) {
        let workList = []
        value.map(res1 => {
          this.allIcon.map(res2 => {
            if (res1 === res2.appId) {
              workList.push(res2)
              res2.sort = this.workIconData.length
            }
          })
        })
        console.log(workList)
        for (let i = 0; i < workList.length; i++) {
          workList[i].sort = i
        }
        this.workIconData = [...workList]
        this.workIconData.sort(end.arrSort('sort'))
      }
    },
    created () {
      let listData = []
      this.workIconData.map(res => {
        listData.push(res.appId)
      })
      this.checkList = [...listData]
      // this.allIcon = [...this.workIconData]
      this.$store.state.endDictGroupData.bizList.map(res => {
//        this.allIcon.push({...res})
      })
      if (this.isAddVisible) {
        this.workIconData = []
        this.checkList = []
      }
    }
  }
</script>
<style lang="scss" scoped>
  $borderColor:rgba(220,220,200,0.4);
  section{
    border:1px solid $borderColor;
    margin-top: 15px;
    padding-bottom: 15px;
  }
  .end-title{
    border:none;
    border-bottom:1px solid $borderColor;
  }
  .btnBox{
    text-align: center;
    margin-top: 15px;
  }
  .radioBox{
    margin: 15px 30px;
    label{
      margin-right: 20px;
      span.el-radio__inner{
        margin-right: 5px;
      }
    }
  }
  .tableBox{
    padding: 0px 15px;
  }
</style>
