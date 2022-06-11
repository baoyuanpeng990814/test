<template>
  <div class="selection_body exam_finder">
    <el-carousel :interval="5000" height="440px" arrow="never">
      <el-carousel-item v-for="p in pictures">
        <h3>
          <el-image style="width: 100%; height: 440px;" :src="p" alt="" fit="none"></el-image>
        </h3>
      </el-carousel-item>
    </el-carousel>


    <div class="selection_content">
      <el-container>
        <el-main>
          <div>
            <el-card>
              <div slot="header" class="clearfix">
                <span>进行中的考试</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">全部</el-button>-->
              </div>
              <div class="selection_page">
                <el-row>
                  <el-col :span="6" v-for="c in currents">
                    <!-- {{s.courseName}}-->
                    <div @click="enrollExam(c)" class="item_div_left">
                      <el-image :src="c.examCoverUrl"></el-image>
                    </div>
                    <div class="item_div_left">
                      <p>{{c.examName}}</p>
                      <div class="item_info">
                        <i class="el-icon-timer"></i>
                        {{c.createTime|truncateTime}}---{{c.failureTime|truncateTime}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <div class="space"></div>
            <el-card>
              <div slot="header" class="clearfix">
                <span>近期即将开考</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">全部</el-button>-->
              </div>
              <div class="selection_page">
                <el-row>
                  <el-col :span="6" v-for="c in coming">
                    <!-- {{s.courseName}}-->
                    <div class="item_div_left">
                      <el-image :src="c.examCoverUrl"></el-image>
                    </div>
                    <div class="item_div_left">
                      <p>{{c.examName}}</p>
                      <div class="item_info">
                        <i class="el-icon-timer"></i>
                        {{c.createTime|truncateTime}}---{{c.failureTime|truncateTime}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-main>
        <el-aside width="270px" class="selection_aside">
          <el-card>
            <div slot="header" class="clearfix">
              <span>考试排行</span>
              <!--<el-button @click="turnToList()" style="float: right; padding: 3px 0" type="text">更多</el-button>-->
            </div>
            <div v-for="t in tops.length" class="selection_top">
              <div>{{t}}.&nbsp;&nbsp;{{tops[t-1].name}}</div>
              <div>{{tops[t-1].examCount}}人</div>
              <div class="cb"></div>
            </div>
            <div class="cb"></div>
          </el-card>
        </el-aside>
      </el-container>
    </div>

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
        enrollId:0,
        currentdata: [],
        showDialog: false,
        tops: [],
        currents: [],
        coming: [],
        pictures: [require('../../images/banner3.png'), require('../../images/banner2.png')]
      }
    },
    created() {
      this.getCurrentExam()
      this.getComingExam()
      this.getExamTop()
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
                id: this.currentdata.examId,
                enrollId:this.enrollId
              }
            });
          }

        }

      },
      enrollExam(val) {
        this.currentdata = val
        this.showDialog = true
      },
      async getExamTop() {
        const {
          data: res
        } = await this.$http.post("/learn/exam/rankingExam")
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.tops = res.data
          this.$forceUpdate()
        }
      },
      async getCurrentExam() {
        const {
          data: res
        } = await this.$http.post("/learn/exam/progressExam")
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.currents = res.data
          this.$forceUpdate()
        }
      },
      async getComingExam() {
        const {
          data: res
        } = await this.$http.post("/learn/exam/aboutExam")
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.coming = res.data
          this.$forceUpdate()
        }
      }
    },
    filters: {
      truncateTime(time) {
        var t = time.split(" ")[0]
        return t.split("T")[0]
      }
    }
  }
</script>

<style>
</style>
