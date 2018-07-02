<template>
  <section class="end-container">
    <p>{{message}}</p>
    <p>{{ message.split('').reverse().join('') }}</p>
    <p><a :href="href">百度</a></p>
    <button @click="messageRev">点击</button>
    <p>计算属性{{countAdd}},原始数据{{count}}</p>
    <p :class="{ active: isActive}">对象语法绑定class</p>
    <p :class="[activeClass, textCenter]">数组语法绑定class1</p>
    <!--可以使用运算符-->
    <p :class="[!isActive ? activeClass:'', textCenter]">数组语法绑定class2</p>
    <p v-if="isLoad">条件渲染加载</p>
    <p v-else>不加载</p>

    <p v-show="false">条件渲染显示</p>

    <p v-for="(item, index) in lists" v-show="item.show">{{index}}.列表渲染{{item.list}}</p>

    <p v-for="value in object">遍历对象{{value}}</p>

    <p><input type="text" v-model="inputData" placeholder="表单输入绑定"/></p>
    <p>{{inputData}}</p>
    <button @click="submit">tijiao</button>
    <div>
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="Two" v-model="picked">
    <label for="two">Two</label>
    <br>
    <span>Picked: {{ picked }}</span>
    </div>
    <div>
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>
    </div>
    <p>组件：<navBar data="组件1" @name="getName"><div slot="test">dsadada</div> </navBar></p>
  </section>
</template>
<script>
  import navBar from '@/components/navBar.vue'
  export default{
    data () {
      return {
        message: 'demo',
        href: 'http://www.baidu.com', // :href为v-bind:href为v的缩写
        count: 0,
        isActive: false,  // class对象语法绑定classname
        activeClass: 'active',
        textCenter: 'textCenter',
        isLoad: false, // v-if判断加载dom
        isShow: true,
        lists: [ // 列表渲染配合条件渲染
          {list: 'one', show: true},
          {list: 'two', show: true},
          {list: 'three', show: false}],
        object: {
          firstName: 'John',
          lastName: 'Doe',
          age: 30
        },
        inputData: '1111111',
        picked: 'One',
        checkedNames: []
      }
    },
    methods: {
      messageRev () { // @click为v-on:click的缩写
        this.message = 'click'
      },
      submit () {
        let data = {
          input: this.inputData
        }
        console.log(data)
      },
      getName (val) {
        console.log(val)
      }
    },
    computed: {
      countAdd () { // 计算属性可以对数据进行修饰
        return this.count + 1
      }
    },
    watch: { // watch用来监听数据变化
      message (val, oldVal) {
        console.log(`新数据${val},旧数据${oldVal}`)
      }
    },
    components: {
      navBar
    }
  }
</script>
<style lang="scss" scoped>
  p,div{
    margin: 15px 0;
  }
  .active{
    color: red;
  }
  .textCenter{
    text-align: center;
  }
</style>
