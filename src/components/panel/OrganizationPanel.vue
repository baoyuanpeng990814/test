<template>
  <el-dialog title="组织机构查询" :visible.sync="showDialog" class="protrusion">
    <el-card class="box-card">
      <div slot="header" class="clearfix"></div>
      <div>
        <el-tree
          :default-expand-all="true"
          :data="treedata"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
// 组织机构 树形选择框
export default {
  name: 'OrganizationPanel',
  props: {
    show: Boolean
  },
  data() {
    return {
      defaultProps: {
        children: 'chilLOrganization',
        label: 'organizationName'
      },
      showDialog: false,
      treedata: []
    }
  },
  created() {
    this.showDialog = this.show
    this.getDataTree()
  },
  methods: {
    async getDataTree() {
      const { data: res } = await this.$http.post('/manager/org/tree')
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        // 赋值组织树数据
        this.treedata = res.data
      }
    },
    handleNodeClick(data) {
      this.$emit('choose', data)
      
      this.showDialog = false
    }
  },
  watch: {
    showDialog: function(val) {
      if (val === false) this.$emit('turnOff', false)
    },
    show: function(val) {
      this.showDialog = val
    }
  }
}
</script>

<style></style>
