<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/graduationlist' }">结业管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/graduationconfirm' }">结业审核</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">结业审核</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="detail_lines detail1_lines">
          <el-container>
            <el-main>
              <el-row>
                <el-col :span="2">
                  课程名
                </el-col>
                <el-col :span="20">
                  {{listDetail.courseName}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  申请人
                </el-col>
                <el-col :span="20">
                  {{listDetail.userName}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  章节状态
                </el-col>
                <el-col :span="20">
                  <div id="barchart" class="mt15" style="width: 800px;height:600px;"></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  &nbsp;
                </el-col>
                <el-col :span="20">
                  <div class="space"></div>
                  <el-button type="primary" @click="allow">允许结业</el-button>
                  <div class="space"></div>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        courseId: '',
        listDetail: {},
        dataDetail: {},
        userinfo: {},
        chart: {},
        option: {
          yAxis: {
            type: 'category',
            data: []
          },
          xAxis: {
            type: 'value'
          },
          legend: {
            data: ['已学课时', '应学课时']
          },
          series: [{
            data: [],
            type: 'bar',
            name: '已学课时'
          }, {
            data: [],
            type: 'bar',
            name: '应学课时'
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            containLabel: true

          }
        }

      }
    },
    created() {
      this.listDetail = this.$route.query.row
      this.userinfo = this.$store.getters.userinfo
      this.getData()
    },
    methods: {
      async allow() {
        const {
          data: res
        } = await this.$http.get('/manager/graduation/passed?id=' + this.dataDetail.lChapters[0].lLearn.enrollId)
        if (res.state !== 200) {
          // return this.$message.error('数据获取失败！')
          this.$message.error(res.msg)
        } else {
          this.$message.success(res.msg)
          this.$router.go('-1')
        }
      },
      async getData() {
        const {
          data: res
        } = await this.$http.get('/manager/graduation/courseInfo?id=' + this.listDetail.courseId +
          '&userId=' + this.userinfo.userId)
        if (res.state !== 200) {
          // return this.$message.error('数据获取失败！')
        } else {
          this.dataDetail = res.data
          this.option.yAxis.data = []
          this.option.series[0].data = []
          for (var i = 0; i < this.dataDetail.lChapters.length; i++) {
            this.option.yAxis.data.push(this.dataDetail.lChapters[i].chapterName)
            this.option.series[0].data.push(this.dataDetail.lChapters[i].lLearn.learnTime)
            this.option.series[1].data.push(this.dataDetail.lChapters[i].lCourseware.coursewareHours * 60 * 60)
          }

          this.chart = this.$echarts.init(document.getElementById('barchart'))
          this.chart.setOption(this.option)
        }
      }
    }
  }
</script>

<style scoped>
  .barchart {
    width: 500px;
    height: 1000px;
  }
</style>
