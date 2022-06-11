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
                <span>进行中的问卷</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">全部</el-button>-->
              </div>
              <div class="selection_page">
                <el-row>
                  <el-col :span="6" v-for="c in currents">
                    <!-- {{s.courseName}}-->
                    <div @click="takeQuestionary(c)" class="item_div_left">
                      <el-image :src="c.examineCover"></el-image>
                    </div>
                    <div class="item_div_left">
                      <p>{{c.examineName}}</p>
                      <div class="item_info">
                        <i class="el-icon-timer"></i>
                        {{c.startTime|truncateTime}}---{{c.endTime|truncateTime}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <div class="space"></div>
            <el-card>
              <div slot="header" class="clearfix">
                <span>即将开始的问卷</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">全部</el-button>-->
              </div>
              <div class="selection_page">
                <el-row>
                  <el-col :span="6" v-for="c in coming">
                    <!-- {{s.courseName}}-->
                    <div class="item_div_left">
                      <el-image :src="c.examineCover"></el-image>
                    </div>
                    <div class="item_div_left">
                      <p>{{c.examineName}}</p>
                      <div class="item_info">
                        <i class="el-icon-timer"></i>
                        {{c.startTime|truncateTime}}---{{c.endTime|truncateTime}}
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

  </div>
</template>

<script>
  export default {
    data() {
      return {
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
      takeQuestionary(e){

        this.$router.push({
          name: 'questionary',
          params: {
            id: e.examineId
          }
        });
      },
      async getExamTop() {
        const {
          data: res
        } = await this.$http.post("/learn/examins/rankingExamine")
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
        } = await this.$http.post("/learn/examins/list")
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
        } = await this.$http.post("/learn/examins/aboutExamine")
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
