<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
        <h3 class="end-title">模块配置</h3>
        <div class="main">
        <div class="banner">
          <!--<el-carousel trigger="click" height="450px"style="width: 250px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>-->
        </div>
          <!--右侧-->
        <div class="tableBox">
          <div class="pageTableContent">
            <el-button type="primary" class="addBanner" @click="addModule"><i class="el-icon-plus"></i>添加模块</el-button>
            <el-table :data="bannerData" border width="100%">
              <el-table-column type="index" label="排序" width="80">
              </el-table-column>
              <el-table-column prop="name" label="模块名字" width="180">
              </el-table-column>
              <el-table-column prop="title" label="模块内业务" width="350">
              </el-table-column>
              <el-table-column  label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row.moduletype, scope)">编辑</el-button>
                  <el-button type="text" @click="notAllowd(scope.row.id)">禁用</el-button>
                  <el-button type="text" @click="del(scope.$index,scope.row.id)">删除</el-button>
                  <el-button type="text" @click="moveUp(scope)" v-if="scope.$index > 0">上移</el-button>
                  <el-button type="text" v-if="scope.$index < bannerData.length -1"@click="moveDown(scope)">下移</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="savePage" style="margin: 15px auto;display: block">保存</el-button>
            <div class="cover" v-show="tableVisible"></div>
          </div>

          <bannerEdit
            class="bannerEdit" v-if="editBannerVisible"
            :data="bannerList"
            :isAdd="bannerIsAdd"
            @submit="saveBannerData"
            @cancel="cancelBannerEdit">
          </bannerEdit>
          <workIcon
            v-if="workIconVisible"
            @cancel="cancelWorkIcon"
            :isAdd="workIconIsAdd"
            @submit="saveWorkIconData"
            :data="workIconData"></workIcon>
          <selfModule
            v-if="selfModuleVisible"
            :data="selfModuleData"
            :isAdd="selfIsAdd"
            @submit="saveSelfModuleData"
            @cancel="cancelSelfModule"></selfModule>
          </div>
          <!--右侧-->
          <div style="clear: both"></div>
      </div>
    </div>

    <!--弹出框-->
    <el-dialog title="请选择添加的模板类型" :visible.sync="moduleVisible" size="tiny"
               @close="closeDialog">
      <div class="modalContent">
        <el-radio class="radio" v-model="moduletype" label="1">轮播图</el-radio><br/>
        <el-radio class="radio" v-model="moduletype" label="2">业务图标</el-radio><br/>
        <el-radio class="radio" v-model="moduletype" label="3">自定义模块</el-radio>
      </div>
      <div style="text-align: center;margin-top: 25px">
        <el-button @click="closeModal">取消</el-button>
        <el-button type="primary" @click="saveModuleType">确定</el-button>
      </div>

    </el-dialog>
  </section>
</template>
<style lang="scss" scoped>
  $borderColor:rgba(220,220,200,0.4);
  .content{
    margin-top: 15px;
    border:1px solid $borderColor;
  }
  .main{
    padding: 15px;
  }
  .banner{
    float: left;
    width: 220px;
    height:450px;
    background: url('~@/assets/images/app.png') no-repeat;
    background-size: auto 100%;
    background-position: center;
  }
  .modalContent{
    width: 70%;
    margin: auto;
    label{
      margin: 10px 0;
    }
  }
  .tableBox{
    float: left;
    margin-left: 15px;
    width: calc(100% - 235px);
  }
  .end-title{
    border-bottom: 1px solid $borderColor;
  }
  .addBanner{
    float: right;
    margin-bottom: 15px;
    display: block;
    i{margin-right: 4px}
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .pageTableContent{
    position: relative;
    .cover{
      position: absolute;
      width: 100%;
      height:100%;
      background: white;
      z-index: 10;
      top:0;
      left: 0;
      opacity: 0.5;
    }
  }
</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import bannerEdit from '../../components/bannerEdit.vue'
  import workIcon from '../../components/workIcon.vue'
  import selfModule from '../../components/selfModule.vue'
  import { getWorkBenchData, saveData, getAllConfigData, getSelfData } from '@/api/api'
  export default{
    data () {
      return {
        bannerData: [
        ],
        cutNumber: [
          {showName: true},
          {showName: false}
        ],
        moduleVisible: false,
        moduletype: '1',
        editBannerVisible: false,
        workIconVisible: false,
        selfModuleVisible: false,
        tableVisible: false,
        allData: [],
        workIconData: [],
        workIconId: '',  // 编辑那条数据的id
        selfModuleDataId: '', // 编辑那条自定义模板id
        bannerListId: '' // 编辑banner图id
      }
    },
    methods: {
      upChangeAllDataLay (choseId, otherId) {  // 上移动改变所有数据layer
        console.log(choseId, otherId)  //  choseId表示当前移动数据的id, otherId表示被移动数据Id
        this.allData.slideShowMdlList.map(res => {
          if (res.id === choseId) {
            res.layer--
          }
          if (res.id === otherId) {
            res.layer++
          }
        })
        this.allData.groupBizMdlList.map(res => {
          if (res.id === choseId) {
            res.layer--
          }
          if (res.id === otherId) {
            res.layer++
          }
        })
        this.allData.optConfigMdlList.map(res => {
          if (res.id === choseId) {
            res.layer--
          }
          if (res.id === otherId) {
            res.layer++
          }
        })
      },
      downChangeAllDataLay (choseId, otherId) {  // 下移动改变所有数据layer
        console.log(choseId, otherId)  //  choseId表示当前移动数据的id, otherId表示被移动数据Id
        this.allData.slideShowMdlList.map(res => {
          if (res.id === choseId) {
            res.layer++
          }
          if (res.id === otherId) {
            res.layer--
          }
        })
        this.allData.groupBizMdlList.map(res => {
          if (res.id === choseId) {
            res.layer++
          }
          if (res.id === otherId) {
            res.layer--
          }
        })
        this.allData.optConfigMdlList.map(res => {
          if (res.id === choseId) {
            res.layer++
          }
          if (res.id === otherId) {
            res.layer--
          }
        })
      },
      delChangeLayer (id, layer) { // 删除后修改layer的值
        console.log(id, layer)
        this.allData.slideShowMdlList.map((res, i) => {
          if (res.layer > layer) {
            res.layer--
          }
        })
        this.allData.groupBizMdlList.map((res, i) => {
          if (res.layer > layer) {
            res.layer--
          }
        })
        this.allData.optConfigMdlList.map((res, i) => {
          console.log(res.layer, 'la2223')
          if (res.layer > layer) {
            res.layer--
          }
        })
        // 再次遍历删除，同时遍历会有问题
        this.allData.slideShowMdlList.map((res, i) => {
          if (res.id === id) {
            console.log(i)
            this.allData.slideShowMdlList.splice(i, 1)
          }
        })
        this.allData.groupBizMdlList.map((res, i) => {
          if (res.id === id) {
            console.log(i)
            this.allData.groupBizMdlList.splice(i, 1)
          }
        })
        this.allData.optConfigMdlList.map((res, i) => {
          if (res.id === id) {
            console.log(i)
            this.allData.optConfigMdlList.splice(i, 1)
          }
        })
      },
      moveUp (scope) {
        this.bannerData[scope.$index].layer--
        this.bannerData[scope.$index - 1].layer++
        this.upChangeAllDataLay(this.bannerData[scope.$index].id, this.bannerData[scope.$index - 1].id)
        end.arrSplice(this.bannerData, scope.$index, scope.$index - 1)
      },
      moveDown (scope) {
        this.bannerData[scope.$index].layer++
        this.bannerData[scope.$index + 1].layer--
        this.downChangeAllDataLay(this.bannerData[scope.$index].id, this.bannerData[scope.$index + 1].id)
        end.arrSplice(this.bannerData, scope.$index, scope.$index + 1)
      },
      del (index, id) {
        this.$confirm('确认删除？')
          .then(res => {
            let layer = this.bannerData[index].layer
            console.log(layer)
            this.bannerData.splice(index, 1)
            this.delChangeLayer(id, layer)
            this.bannerData.map(res => {
              if (res.layer > layer) {
                res.layer --
              }
            })
          })
          .catch();
      },
      edit (moduletype, scope) {
        this.editBannerVisible = false
        this.workIconVisible = false
        this.selfModuleVisible = false
        this.tableVisible = true
        if (moduletype === '1') {
          this.editBannerVisible = true
          console.log(scope.row)
          this.bannerIsAdd = false
          this.bannerList = scope.row.showList
          this.bannerListId = scope.row.id
        } else if (moduletype === '2') {
          this.workIconVisible = true
          this.workIconData = scope.row.showList
          this.workIconIsAdd = false
          this.workIconId = scope.row.id
        } else {
          this.selfModuleVisible = true
          this.selfModuleData = scope.row.showList
          this.selfIsAdd = false
          this.selfModuleDataId = scope.row.id
        }
      },
      addModule () {
        this.moduleVisible = true
        this.tableVisible = true
      },
      notAllowd () {},
      saveModuleType () {
        this.moduleVisible = false
        this.editBannerVisible = false
        this.workIconVisible = false
        this.selfModuleVisible = false
        this.tableVisible = true
        console.log(this.moduletype)
        if (this.moduletype === '1') {
          this.editBannerVisible = true
          this.bannerIsAdd = true
          this.bannerList = []
        } else if (this.moduletype === '2') {
          this.workIconVisible = true
          this.workIconIsAdd = true
        } else {
          this.selfModuleVisible = true
          this.selfIsAdd = true
          this.selfModuleData = {}
        }
      },
      savePage () { // 总体的保存
        this.saveAllData()
      },
      saveAllData () { // 提交及总体保存都会调用
        saveData(this.allData).then(() => {
          this.$message.success('保存成功')
          this.editBannerVisible = false
          this.workIconVisible = false
          this.selfModuleVisible = false
          this.tableVisible = false
          this.getAlldataByspId()
        }, error => {
          this.$message.warning(error)
        })
      },
      saveBannerData (data, isAdd) {
        if (isAdd) {
          let layer = this.addLayer()
          console.log(data, 'addb', layer)
          this.allData.slideShowMdlList.push({layer: layer, slideShowList: data})
        } else {
          this.allData.slideShowMdlList.map(res => {
            if (res.id === this.bannerListId) {
              res.slideShowList = data
            }
          })
        }
        console.log(this.allData)
        this.saveAllData()
      },
      saveSelfModuleData (data, isAdd) {
        // data do something
        console.log(data, isAdd)
        // this.saveAllData()
        if (isAdd) {
          let layer = this.addLayer()
          // console.log('add1', layer, data)
          this.allData.optConfigMdlList.push({layer: layer, optConfig: data})
        } else {
          this.allData.optConfigMdlList.map(res => {
            console.log(res.id, this.selfModuleDataId, 2221231)
            if (res.id === this.selfModuleDataId) {
              res.optConfig = data
            }
          })
        }
        this.saveAllData()
      },
      saveWorkIconData (data, isAdd) {
        // data do something
        console.log(data, isAdd)
        if (isAdd) {
          let layer = 1
          this.allData.groupBizMdlList.map(() => {
            layer++
          })
          this.allData.slideShowMdlList.map(() => {
            layer++
          })
          this.allData.optConfigMdlList.map(() => {
            layer++
          })
          this.allData.groupBizMdlList.push({
            optGroupBiz: {bizList: data},
            layer: layer
          })
        } else {
          this.allData.groupBizMdlList.map(res => {
            if (res.id === this.workIconId) {
              res.optGroupBiz.bizList = data
            }
          })
        }
        this.saveAllData()
      },
      getAlldataByspId () {
        getWorkBenchData().then(res => {
          this.allData = res
          let sliderData = res.slideShowMdlList
          this.bannerData = []
          if (sliderData.length > 0) {
            sliderData.map(res => {
              this.bannerData.push({name: '轮播图', title: '无', showList: [...res.slideShowList], moduletype: '1', layer: res.layer, id: res.id})
            })
          }
          let groupBizMdlList = res.groupBizMdlList // 业务图标数据
          console.log(groupBizMdlList, 223)
          groupBizMdlList.map(res => {
            let titleAssign = ''
            res.optGroupBiz.bizList.map(res2 => {
              titleAssign += res2.name + ' '
            })
            this.bannerData.push(
              { name: res.optGroupBiz.name ? '业务图标(' + res.optGroupBiz.name + ')' : '业务图标',
                title: titleAssign,
                showList: [...res.optGroupBiz.bizList],
                moduletype: '2',
                layer: res.layer,
                id: res.id
              })
          })
          let selfDefined = res.optConfigMdlList // 自定义组件数据
          console.log(selfDefined, 224)
          selfDefined.map(res => {
            this.bannerData.push({name: '自定义模块', title: res.optConfig.name, showList: res.optConfig, moduletype: '3', layer: res.layer, id: res.id})
          })
          this.bannerData.sort(end.arrSort('layer'))
        }, errMsg => {
          this.$message.warning(errMsg)
        })
      },
      cancelBannerEdit () {
        this.editBannerVisible = false
        this.tableVisible = false
      },
      cancelWorkIcon () {
        this.workIconVisible = false
        this.tableVisible = false
      },
      cancelSelfModule () {
        this.selfModuleVisible = false
        this.tableVisible = false
      },
      closeModal () {
        this.moduleVisible = false
        this.tableVisible = false
      },
      closeDialog () {},
      addLayer () {
        let layer = 1
        this.allData.groupBizMdlList.map(() => {
          layer++
        })
        this.allData.slideShowMdlList.map(() => {
          layer++
        })
        this.allData.optConfigMdlList.map(() => {
          layer++
        })
        return layer
      }
    },
    created () {
      this.getAlldataByspId()
      getAllConfigData().then(res => {
        console.log(res, 'dict')
        this.$store.dispatch('getGroupDict', res[0])
        console.log(this.$store.state.endDictGroupData, 11)
      })
      getSelfData().then(res => {
        console.log(res, 'dict2')
        this.$store.dispatch('getSelfModuleDict', res)
      })
    },
    components: {
      NavBar,
      bannerEdit,
      workIcon,
      selfModule
    }
  }
</script>
