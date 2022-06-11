<template>
  <el-dialog title="竞赛类型查询" :visible.sync="showDialog" class="protrusion">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      </div>
      <div>
        <el-tree :default-expand-all="true" :data="treedata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </el-card>
  </el-dialog>


</template>

<script>
  // 树形选择框
  export default {
    name: 'ContestTypePanel',
    props: {
      show: Boolean
    },
    data() {
      return {
        defaultProps: {
         children: 'competitionSortId"',
         label: 'competitionSortName'
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
      /* 获取菜单树*/
      async getDataTree() {
        const {
          data: res
        } = await this.$http.post("/manager/competitionSort/tree")
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
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

        if (val == false) this.$emit('turnOff', false)
      },
      show: function(val) {
        this.showDialog = val
      }
    }
  }
</script>

<style>
</style>
