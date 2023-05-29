<template>
  <div>
    <el-dialog
      title="题库分类"
      :visible.sync="showQuesCatDialog"
      class="class-search"
    >
      <div class="group-tree">
        <el-tree
          :default-expand-all="true"
          :data="quesCateTreeData"
          :props="defaultQuesCateProps"
          @node-click="handleQuesCateClick"
        ></el-tree>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'QuestionCategoryPanel',
  props: {
    show: Boolean,
    treeData: Array
  },
  data() {
    return {
      showQuesCatDialog: false,
      quesCateTreeData: [],
      defaultQuesCateProps: {
        children: 'chilLQuestionsSort',
        label: 'questionsSortName'
      }
    }
  },
  created() {
    this.showQuesCatDialog = this.show
    this.quesCateTreeData = this.treeData
  },
  mounted() {},
  methods: {
    // 点击题库分类树
    handleQuesCateClick(data) {
      this.$emit('choose', data)
      this.showQuesCatDialog = false
    }
  },
  watch: {
    showQuesCatDialog: function(val) {
      if (val === false) this.$emit('turnOff', false)
    },
    show: function(val) {
      this.showQuesCatDialog = val
    }
  }
}
</script>

<style scoped></style>
