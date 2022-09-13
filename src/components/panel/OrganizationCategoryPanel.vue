<template>
  <el-dialog title="考题分类查询" :visible.sync="showDialog" class="protrusion">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      </div>
      <div>
        <el-tree :default-expand-all="false" :data="treedata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </el-card>
  </el-dialog>

</template>

<script>
  // 组织机构分类选择框
  export default {
    name: 'OrganizationPanel',
    props: {
      show: Boolean
    },
    data() {
      return {
        defaultProps: {
          children: 'chilLQuestionsSort',
          label: 'questionsSortName'
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
     /* 试题分类树  选择试题分类 */
      async getDataTree() {
        const {
          data: res
        } = await this.$http.post('/manager/qsort/tree')
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
        // console.log()
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
