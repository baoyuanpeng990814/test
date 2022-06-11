<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myexam' }">我的考试</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">

        <el-radio-group v-model="query.examSortId">
          <el-radio-button label=undefined>全部</el-radio-button>
          <el-radio-button v-for="e in examSorts" :label="e.examSortId">{{e.examSortName}}</el-radio-button>
        </el-radio-group>
        <div class="space"></div>
        <el-radio-group v-model="query.state">
          <el-radio-button label="0">已报名</el-radio-button>
          <el-radio-button label="1">已考试</el-radio-button>
        </el-radio-group>
      </div>
      <div class="text item exam_list">
        <div v-for="d in datas">
          <div>
            <el-image style="width: 150px; height: 110px" :src="d.examCoverUrl" fit="fill"></el-image>
          </div>
          <div>
            <p>{{d.examName}}</p>
            <div v-if="d.timingType=='2'">
              截止时间:{{d.failureTime|truncateTime}}
            </div>
            <div v-else>
              答题时间:{{d.timingStartTime}}分钟&nbsp;&nbsp;截止时间:{{d.failureTime|truncateTime}}
            </div>
          </div>
          <div>
            <el-button @click="enrollExam(d)" type="primary">参加考试</el-button>
          </div>
          <p class="cb"></p>
        </div>
      </div>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page"
        :page-sizes="[1, 2, 5, 8]" :page-size="query.rows" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>


    <el-dialog title="考试信息" width="80%" :visible.sync="showDialog">
      <div class="exam_info">
        <p class="prologue" v-html="currentdata.examNotice"></p>
        <p class="examnotice" v-html="currentdata.examPrologue"> </p>

        <div>
          <el-button type="primary" @click="goExam()">参加考试</el-button>
          <el-button @click="showDialog = false">退出考试</el-button>

        </div>
      </div>


    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: {
          rows: 5,
          page: 1,
          state: "0",
          examSortId: undefined
        },
        datas: [],
        total: 5,
        examSorts: [],
        currentdata: {},
        showDialog: false,
        enrollId:0
      }
    },
    methods: {
      async goExam() {
        if (this.currentdata.countType >= this.currentdata.examSubmit) {
          this.$message.error('您已经不能再参加此次考试.')
          this.showDialog = false
        } else {
          const {
            data: res
          } = await this.$http.post("/learn/exam/enrollExam", {
            examId: this.currentdata.examId
          })
          if (res.state !== 200) {
            //return this.$message.error('数据获取失败！')
          } else {

            this.enrollId = res.data
            this.$router.push({
              name: 'exam',
              params: {
                id: this.currentdata.examUserId
              }
            });
          }

        }

      },
      enrollExam(val) {
        this.currentdata = val
        this.showDialog = true
      },
      async getExamList() {
        const {
          data: res
        } = await this.$http.post("/learn/myexam/examList", this.query)
        if (res.state !== 200) {
          this.datas = []
          //return this.$message.error('数据获取失败！')
        } else {
          this.datas = res.data
          this.total = res.count
        }
      },
      async getExamSortList() {
        const {
          data: res
        } = await this.$http.post("/learn/myexam/examSortlist", {
          parentNode: 0,
          page: 1,
          rows: 50
        })
        if (res.state !== 200) {

          //return this.$message.error('数据获取失败！')
        } else {
          //console.log(res)
          this.examSorts = res.data
          this.$forceUpdate()
        }
      },
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getUserList()

      },
      handleCurrentChange(newPage) {
        this.query.page = newPage
        this.getExamList()
      }
    },
    created() {
      this.getExamSortList()
      this.getExamList()
    },
    watch: {
      'query.examSortId'(val) {
        this.getExamList()
      },
      'query.state'(val) {
        this.getExamList()
      }
    },
    filters: {
      truncateTime(val) {
        return val.split(' ')[0]
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
