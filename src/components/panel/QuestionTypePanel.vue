<template>
  <el-dialog title="题型查询" :visible.sync="showDialog" class="protrusion">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="2">题型标题</el-col>
          <el-col :span="4">
            <el-input
              v-model="tq.questionsTypeName"
              placeholder="题型标题"
            ></el-input>
          </el-col>
          <el-col :span="18" style="text-align: right;">
            <el-button icon="el-icon-search" @click="getDataList" type="primary"
              >查询</el-button
            >
            <el-button
              icon="el-icon-refresh-right"
              @click="reset"
              type="primary"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table :data="data">
          <el-table-column prop="questionsTypeId" label="序号" width="60">
          </el-table-column>
          <el-table-column
            prop="questionsTypeName"
            label="题型名称"
            width="120"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button @click="choose(scope.row)" type="text" size="small"
                >确定</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10]"
          :page-size="drow"
          layout="total, sizes, prev, pager, next"
          :total="dtotal"
        >
        </el-pagination>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
export default {
  // 问题分类选择框
  name: 'QuestionTypePanel',
  props: {
    show: Boolean
  },
  data() {
    return {
      dpage: 1,
      drow: 10,
      dtotal: 0,
      tq: {},
      data: [],
      showDialog: false
    }
  },
  created() {
    this.showDialog = this.show
    this.getDataList()
  },
  methods: {
    choose(row) {
      this.$emit('choose', row)
      this.showDialog = false
    },
    async getDataList() {
      var param = this.tq
      param.page = this.dpage
      param.rows = this.drow
      param.organizationId = 0
      const { data: res } = await this.$http.post('/manager/qtyp/list', param)
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.data = res.data
        this.dtotal = res.count
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
      // console.log()
      if (val == false) this.$emit('turnOff', false)
    },
    show: function(val) {
      this.showDialog = val
    }
  }
}
</script>

<style></style>
