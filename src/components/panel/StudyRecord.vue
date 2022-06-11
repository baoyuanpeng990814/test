<template>
  <div>

    <div>
      <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
        style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="courseName" label="课程名称" width="120">
        </el-table-column>
        <el-table-column prop="courseType" label="课程类型" width="120">
          <template slot-scope="scope">{{ scope.row.courseType |transfermType }}</template>
        </el-table-column>
        <el-table-column prop="courseSortName" label="分类名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="简介" width="120">
        </el-table-column>
        <el-table-column prop="courseTheme" label="学习主题" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="courseCompany" label="主办单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  //学习记录展示
  export default {
    name: 'StudyRecord',
    data() {
      return {
        tableData: [],
        query:{
          page: 1,
          rows: 10
        },
        total: 0
      }

    },
    created(){
      this.getStudyList()
    },
    methods: {
      findDetail(row){
        console.log(row)
      },
      handleSelectionChange(val){},    //获取学习记录
      async getStudyList() {
        const {
          data: res
        } = await this.$http.post("/manager/lStatistic/learnList",this.query)
        if (res.state !== 200) {
          return this.$message.error('操作失败！')
        } else {
          this.tableData = res.data
          this.total = res.count
          return this.$message.success('操作成功！')

        }
      }
    },
    filters:{
      transfermType(val){
        if (val == "1") return "必修"
        else return  "选修"
      }
    }
  }
</script>

<style>
</style>
