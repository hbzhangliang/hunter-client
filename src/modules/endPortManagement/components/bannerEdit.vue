<!--该组件为banner编辑组件-->
<template>
  <div>
    <section>
      <h3 class="end-title">轮播图编辑</h3>
      <div class="onePic" v-for="(item, index) in bannerData">
        <article>
          <label for="pic">图片：</label>
          <input id="pic" type="text" readonly class="end-input" v-model="item.img"/>
          <button class="end-button-primary">图片</button>
          <div class="imgbox" :style='`background-image:url(${item.img})`'></div>
        </article>
        <article>
          <label for="text">文字：</label>
          <input id="text" type="text"  class="end-input" v-model="item.title"/>
        </article>
        <article>
          <label for="link">链接：</label>
          <input id="link" type="text"  class="end-input" v-model="item.url"/>
        </article>
        <div class="operation">
          <button class="end-button-primary-backwhite" @click="del(index)">删除</button>
          <button class="end-button-primary-backwhite" @click="moveUp(index)" v-if="index > 0">上移</button>
          <button class="end-button-primary-backwhite" @click="moveDown(index)" v-if="index < bannerData.length -1">下移</button>
        </div>
      </div>
      <div style="text-align: right">
        <button class="end-button-primary addOnePic" @click="addOne">添加</button>
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
  export default{
    props: {
      data: {
        type: Array,
        default: []
      },
      isAdd: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        bannerData: this.data.sort(end.arrSort('sort')),
        bannerIsAdd: this.isAdd
      }
    },
    methods: {
      addOne () {
        this.bannerData.push({img: '', title: '', url: '', sort: this.bannerData.length + 1})
      },
      del (index) {
        console.log(index)
        let sort = this.bannerData[index].sort
        this.$confirm('确认删除？')
          .then(res => {
            this.bannerData.splice(index, 1)
            this.bannerData.map(res => {
              if (res.sort > sort) {
                res.sort --
              }
            })
          })
          .catch();
      },
      moveUp (index) {
        this.bannerData[index].sort--
        this.bannerData[index - 1].sort++
        end.arrSplice(this.bannerData, index, index - 1)
      },
      moveDown (index) {
        this.bannerData[index].sort++
        this.bannerData[index + 1].sort--
        end.arrSplice(this.bannerData, index, index + 1)
      },
      cancel () {
        this.$emit('cancel')
      },
      submit () {
        this.$emit('submit', this.bannerData, this.bannerIsAdd)
      }
    },
    created () {
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
  .btnBox{
    text-align: center;
    margin-top: 15px;
  }
  .end-title{
    border-bottom:1px solid $borderColor;
  }
  .onePic{
    border-bottom: 1px dashed $borderColor;
    width: 90%;
    margin: auto;
    padding-bottom: 15px;
  }
  article{
    margin-top: 15px;
    input{
      width: 350px;
    }
    button{
      margin-left: -5px;
    }
    .imgbox{
      width: 250px;
      height:150px;
      border:1px solid $borderColor;
      margin-top: 15px;
      margin-left: 47px;
      background-size: auto 100%;
      background-position: center;
    }
  }
  .operation{
    text-align: right;
    margin-top: 15px;
    margin-right: 15px;
    button{
      margin-right: 5px;
    }
  }
  .addOnePic{
    margin-right: 20px;
    margin-top: 15px;
  }
</style>
