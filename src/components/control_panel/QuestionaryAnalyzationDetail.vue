<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/examanalyzation' }">问卷统计</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/examanalyzationdetail' }">问卷统计详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">
              <el-button @click="basicInfo">基本信息</el-button>
              <el-button @click="stateInfo">整体分析</el-button>
            </el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="detail_lines detail1_lines">
          <el-container>
            <el-main v-if="showExaminfo">
              <el-row>
                <el-col :span="2">
                  基本信息
                </el-col>
                <el-col :span="20">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  问卷名称
                </el-col>
                <el-col :span="20">
                  {{datadetail.examineName}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  问卷编号
                </el-col>
                <el-col :span="20">
                  {{datadetail.examineNum}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  开始时间
                </el-col>
                <el-col :span="20">
                  {{datadetail.startTime}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  结束时间
                </el-col>
                <el-col :span="20">
                  {{datadetail.endTime}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  简介
                </el-col>
                <el-col :span="20">
                  {{datadetail.description}}
                </el-col>
              </el-row>

            </el-main>

            <el-main v-if="showStatistic">

              <ul class="questionary_results">
                <li v-for="e in  examInfo">
                  <p>{{e.examineQuestionTitle}}</p>
                  <div v-for="o in e.optionList">
                    {{o.option+":"+o.optionCount}}
                  </div>
                </li>
              </ul>

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
        examInfo: {},
        showExaminfo: true,
        showStatistic: false,
        datadetail: {}

      }
    },
    created() {
      this.datadetail = this.$route.query
      this.getQuestionaryInfo()
    },
    mounted() {

    },
    methods: {
      basicInfo() {
        this.showStatistic = false
        this.showExaminfo = true
      },
      stateInfo() {
        this.showStatistic = true
        this.showExaminfo = false
      },
      async getQuestionaryInfo() {
        const {
          data: res
        } = await this.$http.post('/manager/lStatistic/examineInfo', {
          id: this.datadetail.examineId
        })
        if (res.state !== 200) {

        } else {
          this.examInfo = res.data.questionList
        }
      }
    }
  }
</script>

<style>
</style>
