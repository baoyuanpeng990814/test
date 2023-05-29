<template>
  <div>
    <el-dialog
      title="班级查询"
      :visible.sync="showGroupDialog"
      class="class-search"
    >
      <div class="group-tree">
        <el-tree
          :default-expand-all="true"
          :data="groupTreeData"
          :props="defaultGroupProps"
          @node-click="handleGroupClick"
        ></el-tree>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'GroupPanel',
  props: {
    show: Boolean,
    treeData: Array,
    groupData: Object
  },
  data() {
    return {
      showGroupDialog: false,
      groupTreeData: [], // 班级树数据
      defaultGroupProps: {} // 默认树属性
    }
  },
  created() {
    this.showGroupDialog = this.show
    this.groupTreeData = this.treeData
    this.defaultGroupProps = this.groupData
  },
  methods: {
    // 点击班级树
    handleGroupClick(data) {
      this.$emit('choose', data)
      this.showGroupDialog = false
    }
  },
  watch: {
    showGroupDialog: function(val) {
      if (val === false) this.$emit('turnOff', false)
    },
    show: function(val) {
      this.showGroupDialog = val
    }
  }
}
</script>

<style scoped></style>
