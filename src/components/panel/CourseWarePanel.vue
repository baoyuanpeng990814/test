<template>
  <el-dialog title="机构查询" :visible.sync="showDialog" class="protrusion">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="3">名称</el-col>
          <el-col :span="6">
            <el-input v-model="tq.coursewareName" placeholder="名称"></el-input>
          </el-col>
        </el-row>
        <el-row class="buttons mt15">
          <el-col :span="2" :offset="0">
            <el-button icon="el-icon-search" @click="getDataList" type="primary">查询</el-button>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>
          </el-col>

        </el-row>
      </div>
      <div>
        <el-container>
          <el-aside class="list_tree" width="120px">
            <el-tree :expand-on-click-node="false" :default-expand-all="true" :data="treedata" :props="defaultProps"
              @node-click="handleNodeClick">
            </el-tree>
          </el-aside>
          <el-main class="list_body">

            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" >
              <el-table-column prop="coursewareId" label="序号" width="60">
              </el-table-column>
              <el-table-column prop="coursewareNme" label="课件名称" width="200">
              </el-table-column>
              <el-table-column prop="teacherName" label="讲师" width="90">
              </el-table-column>
              <el-table-column prop="coursewareNme" label="课件路径" width="200">
              </el-table-column>


              <el-table-column fixed="right" label="操作" width="50">
                <template slot-scope="scope">
                  <el-button @click="choose(scope.row)" type="text" size="small">确定</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :page-sizes="[1, 2, 5, 8]" :page-size="drow" layout="total, sizes, prev, pager, next" :total="dtotal">
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>
  </el-dialog>


</template>

<script> //课件选择框
  export default {
    name: 'CourseWarePanel',
    props: {
      show: Boolean
    },
    data() {
      return {
        dpage: 1,
        drow: 5,
        dtotal: 0,
        tq: {},
        tableData: [],
        showDialog: false,
        defaultProps: {
          children: 'chilCoursewareType',
          label: 'coursewareTypeName'
        },
        treedata: [],
      }
    },
    created() {
      this.showDialog = this.show
      this.getDataList()
      this.getCourseTree()

    },
    methods: {
      handleNodeClick(data) {
        this.tq.coursewareTypeId = data.coursewareTypeId
        this.getDataList()
      },
      choose(row) {
        this.$emit('choose', row)
        this.showDialog = false
      },
      async getCourseTree() {
        const {
          data: res
        } = await this.$http.post("/manager/ctyp/tree")
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.treedata = res.data
        }
      },
      async getDataList() {
        var param = this.tq
        param.page = this.dpage
        param.rows = this.drow
        const {
          data: res
        } = await this.$http.post("/manager/courseware/list", param)
        if (res.state !== 200) {
          this.tableData = []
          //return this.$message.error('数据获取失败！')
        } else {
          this.dtotal = res.count
          this.tableData = res.data
        }
      },
      reset() {
        this.tq = {}
        this.getDataList()
      },
      handleSizeChange(newSize) {
        this.drow = newSize
        this.getDataList()


      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.dpage = newPage
        this.getDataList()
      }
    },
    watch: {
      showDialog: function(val) {
        //console.log()
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
