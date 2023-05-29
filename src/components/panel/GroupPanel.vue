<template>
  <el-dialog title="分组类型查询" :visible.sync="showDialog" class="protrusion">
    <el-card class="box-card">
      <div slot="header" class="clearfix"></div>
      <div>
        <el-tree
          :default-expand-all="true"
          :data="treedata"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
// 树形选择框
export default {
  name: 'GroupPanel',
  props: {
    show: Boolean
  },
  data() {
    return {
      defaultProps: {
        children: 'groupingId',
        label: 'groupingName'
      },
      showDialog: false,
      treedata: [],
      queryTreeInfo: {
        page: 1,
        rows: 10
      },
      count: 0
    }
  },
  created() {
    this.showDialog = this.show
    this.getDataTree()
  },
  methods: {
    /* 获取菜单树 */
    async getDataTree() {
      const { data: res } = await this.$http.post(
        '/manager/grouping/list',
        this.queryTreeInfo
      )
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.count = res.count
        this.treedata = res.data
        let page = this.queryTreeInfo.page
        let rows = this.queryTreeInfo.rows
        let cc = page * rows
        if (this.count > cc) {
          let ee = Math.ceil(this.count / 10)
          console.log(ee)
          this.queryTreeInfo.page = ee
          this.queryTreeInfo.rows = ee * 10
          const { data: res1 } = await this.$http.post(
            '/manager/grouping/list',
            this.queryTreeInfo
          )
          if (res1.state !== 200) {
            return this.$message.error('数据获取失败！')
          } else {
            this.treedata = res1.data
          }
        }
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
