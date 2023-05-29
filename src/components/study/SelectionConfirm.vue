<template>
  <div class="selection_confirm">
    <div class="sc_head">
      <p>公共课程 > {{ paperdetail.name }}</p>
      <div class="showing">
        <div>
          <el-image
            :src="paperdetail.courseCover"
            style="height: 285px; width: 100%;"
          ></el-image>
        </div>
        <div>
          <h3>{{ paperdetail.name }}</h3>
          <div class="p_detail">
            <ul>
              <li>选课人数:{{ paperdetail.enrollCount }}人</li>
              <li>总课时:{{ paperdetail.classHours }}学时</li>
              <li>好评数:{{ paperdetail.evaluateCount }}</li>
              <li>好评率:{{ paperdetail.praise }}</li>
              <li>主讲老师:{{ paperdetail.teacher }}</li>
              <li>主办单位:{{ paperdetail.courseCompany }}</li>
            </ul>
          </div>

          <div class="p_button" v-if="paperdetail.courseState != '1'">
            <p class="space mt20"></p>
            <el-button @click="enroll" type="warning">加入任务</el-button>
            <el-button @click="preview">课程预览</el-button>
          </div>
          <div class="p_button" v-else>
            <div>学习进度</div>
            <div>
              <el-progress :percentage="paperdetail.courseSpeed"></el-progress>
            </div>

            <el-button @click="enterCourse" class="mt15" type="warning"
              >进入课程</el-button
            >
          </div>
        </div>
      </div>
      <div class="cb"></div>
    </div>
    <div class="sc_body">
      <div>
        <el-container>
          <el-main>
            <el-tabs type="border-card">
              <el-tab-pane label="课程列表">
                <ul class="chapter_list">
                  <li v-for="c in chapters" :key="c.id">
                    <i class="el-icon-video-play"></i>&nbsp;&nbsp;{{
                      c.chapterName
                    }}
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="学员评论">
                <div class="edit_comment" v-if="userinfo.userId !== null">
                  <div
                    v-if="comments_my.length === 0 || commentdetail.id !== ''"
                  >
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                  </div>
                  <div
                    v-if="comments_my.length === 0 || commentdetail.id !== ''"
                  >
                    <el-radio v-model="commentdetail.rate" :label="1"
                      >好评</el-radio
                    >
                    <el-radio v-model="commentdetail.rate" :label="2"
                      >中评</el-radio
                    >
                    <el-radio v-model="commentdetail.rate" :label="3"
                      >差评</el-radio
                    >
                    <div class="space"></div>
                    <el-input
                      v-model="commentdetail.content"
                      type="textarea"
                      :rows="4"
                    ></el-input>
                    <div class="space"></div>
                    <el-button @click="sumbit" type="primary">评论</el-button>
                  </div>
                  <p class="cannot_comment" v-else>
                    每个用户只能评论一次，您可以点击编辑来修改您的评论。
                  </p>
                  <p class="cb"></p>
                </div>
                <div class="space"></div>
                <div class="total_rate">
                  <div>
                    <h3>{{ paperdetail.praise }}</h3>
                    <p>好评度</p>
                  </div>
                  <div>
                    <el-radio v-model="filterRate" :label="0"
                      >全部({{ comments.length }})</el-radio
                    >
                    <el-radio v-model="filterRate" :label="1"
                      >好评({{ comments_good.length }})</el-radio
                    >
                    <el-radio v-model="filterRate" :label="2"
                      >中评({{ comments_normal.length }})</el-radio
                    >
                    <el-radio v-model="filterRate" :label="3"
                      >差评({{ comments_bad.length }})</el-radio
                    >
                    <el-radio v-model="filterRate" :label="4"
                      >我的评价({{ comments_my.length }})</el-radio
                    >
                  </div>
                  <p class="cb"></p>
                </div>
                <div class="space"></div>
                <ul class="comment">
                  <li v-for="c in current_comments" :key="c.id">
                    <div class="show_comment">
                      <div>
                        <el-avatar icon="el-icon-user-solid"></el-avatar>
                        {{ c.user.name }}
                      </div>
                      <div>
                        {{ c.evaluateType | translateRate }}
                        <div class="space"></div>
                        {{ c.evaluateContent }}
                        <p class="corner">
                          <span
                            @click="toEditComment(c)"
                            v-if="c.user.userId === userinfo.userId"
                            >编辑</span
                          >&nbsp;|{{
                            c.createTime | splitDate
                          }}&nbsp;|赞&nbsp;{{ c.evaluatePraise }}
                        </p>
                      </div>
                      <p class="cb"></p>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="课程简介">{{
                paperdetail.description
              }}</el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      paperdetail: {
        courseSpeed: 0
      },
      chapters: [],
      comments: [],
      comments_good: [],
      comments_normal: [],
      comments_bad: [],
      comments_my: [],
      current_comments: [],
      page: 1,
      rows: 10,
      userinfo: {},
      commentdetail: {
        rate: 1,
        content: '',
        id: ''
      },
      filterRate: 1
    }
  },
  methods: {
    enterCourse() {
      this.$router.push({
        path: '/mycourses'
      })
      // this.$router.push({
      //     path: '/acquisition',
      //     query: {
      //       id: this.id
      //     }
      //   })
    },
    async submitEnrollment() {
      const { data: res } = await this.$http.post('/learn/course/enroll', {
        courseId: this.id,
        userId: this.userinfo.userId
      })
      if (res.state !== 200) {
        return this.$message.error('选课失败')
      } else {
        return this.$message.success('选课成功')
      }
    },
    enroll() {
      // 如果没报名则报名，否则进入已报名的课程列表
      if (this.userinfo.userId !== null) {
        this.submitEnrollment()
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    preview() {
      // 试看
      this.$router.push({
        path: '/selectionpreview',
        query: {
          id: this.id
        }
      })
    },
    sumbit() {
      // 判断添加新评论，还是修改旧评论
      if (this.commentdetail.id !== '') {
        this.editComment()
      } else {
        this.sumbitComment()
      }
    },
    toEditComment(c) {
      // 编辑指定评论

      this.commentdetail.rate = parseInt(c.evaluateType)
      this.commentdetail.content = c.evaluateContent
      this.commentdetail.id = c.evaluateId
    },
    async editComment() {
      // 提交已修改的评论

      const { data: res } = await this.$http.post('/learn/evaluate/edit', {
        evaluateId: this.commentdetail.id,
        evaluateType: this.commentdetail.rate,
        evaluateContent: this.commentdetail.content
      })
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
      } else {
        this.commentdetail.rate = ''
        this.commentdetail.content = ''
        this.commentdetail.id = ''
        this.getComment()
      }
    },
    async sumbitComment() {
      // 提交新评论
      const { data: res } = await this.$http.post('/learn/evaluate/add', {
        courseId: this.id,
        userId: this.userinfo.userId,
        evaluateType: this.commentdetail.rate,
        evaluateContent: this.commentdetail.content
      })
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
      } else {
        this.commentdetail.rate = ''
        this.commentdetail.content = ''
        this.getComment()
      }
    },
    async getComment() {
      // 获取评论
      const { data: res } = await this.$http.post('/learn/evaluate/list', {
        courseId: this.paperdetail.id,
        page: this.page,
        rows: this.rows
      })
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
      } else {
        this.comments_good = []
        this.comments_normal = []
        this.comments_bad = []
        this.comments_my = []
        this.comments = res.data
        for (var i = 0; i < this.comments.length; i++) {
          // 把评论拆分为，好评，中评，差评，我的评论
          if (this.comments[i].evaluateType === '1') {
            this.comments_good.push(this.comments[i])
          } else if (this.comments[i].evaluateType === '2') {
            this.comments_normal.push(this.comments[i])
          } else if (this.comments[i].evaluateType === '3') {
            this.comments_bad.push(this.comments[i])
          }
          if (this.comments[i].user.userId === this.userinfo.userId) {
            this.comments_my.push(this.comments[i])
          }
        }
        this.filterRate = 0
      }
    },
    async getPaperDetail() {
      // 获取课程信息
      const { data: res } = await this.$http.get(
        '/learn/course/courseInfo?id=' + this.id
      )
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
      } else {
        this.paperdetail = res.data
        this.paperdetail.courseSpeed = parseInt(res.data.courseSpeed)
        this.getChapters()
        this.getComment()
      }
    },
    async getChapters() {
      // 获取课程章节
      const { data: res } = await this.$http.post(
        '/learn/course/courseLChapter',
        {
          courseId: this.paperdetail.id
        }
      )
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
      } else {
        this.chapters = res.data
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getPaperDetail()
    this.userinfo = this.$store.getters.userinfo
  },
  watch: {
    filterRate() {
      if (this.filterRate === 0) this.current_comments = this.comments
      else if (this.filterRate === 1) this.current_comments = this.comments_good
      else if (this.filterRate === 2) {
        this.current_comments = this.comments_normal
      } else if (this.filterRate === 3) {
        this.current_comments = this.comments_bad
      } else if (this.filterRate === 4) {
        this.current_comments = this.comments_my
      }
    }
  },
  filters: {
    translateRate: function(rate) {
      if (rate === '1') return '好评'
      else if (rate === '2') return '中评'
      else return '差评'
    },
    splitDate: function(date) {
      return date.split('T')[0]
    }
  }
}
</script>

<style></style>
