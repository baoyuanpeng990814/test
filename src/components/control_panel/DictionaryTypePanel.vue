<template>
  <div>
    <el-dialog
      title="数据字典类型查询"
      :visible.sync="showDicTypeDialog"
      class="class-search"
    >
      <div class="group-tree">
        <el-tree
          :default-expand-all="true"
          :data="dicTypeTreeData"
          :props="defaultDicTypeProps"
          @node-click="handleDicTypeClickFn"
        ></el-tree>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'DictionaryTypePanel',
  props: {
    show: Boolean,
    treeData: Array
  },
  data() {
    return {
      showDicTypeDialog: false,
      defaultDicTypeProps: {
        children: 'chilDictType',
        label: 'dictTypeName'
      }
    }
  },
  created() {
    this.showDicTypeDialog = this.show
    this.dicTypeTreeData = this.treeData
  },
  methods: {
    // 点击字典类型树
    handleDicTypeClickFn(data) {
      this.$emit('choose', data)
      this.showDicTypeDialog = false
    }
  },
  watch: {
    showDicTypeDialog: function(val) {
      if (val === false) this.$emit('turnOff', false)
    },
    show: function(val) {
      this.showDicTypeDialog = val
    }
  }
}
</script>

<style scoped></style>
