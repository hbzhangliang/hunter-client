<template>
  <section>
    <input placeholder="请输入关键字，回车搜索" type="text" @keyup.13="search"v-model="searchData"maxlength="15"/>
    <i class="el-icon-search"></i>
  </section>
</template>
<script>
  export default{
    data () {
      return {
        searchData: this.searchValue
      }
    },
    model: {
      prop: 'searchData',
      event: 'search'
    },
    props: {
      searchValue: ''
    },
    methods: {
      search () {
        this.$emit('search', this.searchData)
      }
    }
  }
</script>
<style lang="scss" scoped>
  section{
    position: relative;
  i{
    position: absolute;
    right: 8px;
    top: 10px;
    color:#d9d9d9;
    font-size: 16px;
  }
  }
  input{
    width: 200px;
    height:35px;
    border:1px solid #d9d9d9;
    padding-left: 10px;
    border-radius: 4px;
    outline: none;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #d9d9d9;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #d9d9d9;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #d9d9d9;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #d9d9d9;
  }
</style>
