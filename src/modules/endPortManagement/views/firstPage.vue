<template>
  <section>
    <el-tabs v-model="editTab" type="border-card"  editable closable @tab-remove="removeTab" @edit="handleTabsEdit">
      <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name">
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
  import {} from '@/api/api'
  export default{
    data () {
      return {
          editTab: '1',
          editableTabs: [{
              title: '主页',
              name: '1',
              content: 'Tab 1 content'
          }],
          tabIndex: 1
      }
    },
      methods:{
          addTab(targetName) {
              let newTabName = ++this.tabIndex + '';
              this.editableTabs.push({
                  title: 'New Tab',
                  name: newTabName,
                  content: 'New Tab content'
              });
              this.editTab = newTabName;
          },
          removeTab(targetName) {
              let tabs = this.editableTabs;
              let activeName = this.editTab;
              if (activeName === targetName) {
                  tabs.forEach((tab, index) => {
                      if (tab.name === targetName) {
                          let nextTab = tabs[index + 1] || tabs[index - 1];
                          if (nextTab) {
                              activeName = nextTab.name;
                          }
                      }
                  });
              }

              this.editTab = activeName;
              this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          },
          handleTabsEdit(targetName, action) {
              if (action === 'add') {
                  let newTabName = ++this.tabIndex + '';
                  this.editableTabs.push({
                      title: 'New Tab',
                      name: newTabName,
                      content: 'New Tab content'
                  });
                  this.editableTabsValue = newTabName;
              }
              if (action === 'remove') {
                  let tabs = this.editableTabs;
                  let activeName = this.editableTabsValue;
                  if (activeName === targetName) {
                      tabs.forEach((tab, index) => {
                          if (tab.name === targetName) {
                              let nextTab = tabs[index + 1] || tabs[index - 1];
                              if (nextTab) {
                                  activeName = nextTab.name;
                              }
                          }
                      });
                  }

                  this.editableTabsValue = activeName;
                  this.editableTabs = tabs.filter(tab => tab.name !== targetName);
              }
          }

      },
    components: {

    },
    watch: {

    },
    created () {

    }
  }
</script>
<style lang="scss" scoped>

</style>
