<template>
  <div class="selection_preview acquisition_body">
    <div class="preview_head">
      <div class="inner">
        <div><span>课程名:</span>{{courserdetail.courseName}}</div>
        <div @click="back()"><i class="el-icon-back"></i>返回课程详情</div>
      </div>
    </div>
    <div class="selection_preview_body">
      <span class="fr">
        <el-button-group>
          <el-button @click="showLearn = true" :type="showLearn ? '':  'primary'" icon="el-icon-video-camera">课程学习
          </el-button>
          <el-button @click="applyFinish" :type="showLearn ? 'primary':  ''" icon="el-icon-document">申请结业</el-button>
        </el-button-group>
      </span>
      <div class="cb"></div>
      <ApplyFinish @getOnce="(x) => aonce = x" :once="aonce" :courseId="id" v-if="!showLearn" ></ApplyFinish>
      <span v-else>
        <div class="acquisition_shadow mt15">
          <el-container class="acquisition">
            <el-main>

              <video oncontextmenu="return false" ref="video" id="video" class="preview_video" :src="url"
                controlsList="nodownload" :controls="currentChapter.done" autoplay="autoplay">
                您的浏览器不支持 video 标签。
              </video>
              <div class="video_info">
                <div>
                </div>
                <div>
                  <div class="space"></div>
                  <input @keyup.enter="takeNote" class="note" prefix-icon="el-icon-edit-outline" v-model="note"
                    placeholder="记笔记,请输入想要记录的内容.按Enter保存笔记"></input>
                  <div class="space"></div>
                </div>
              </div>
            </el-main>
            <el-aside width="300px">
              <div class="item_n_note">
                <div class="twin">
                  <div @click="showNote=false">
                    <i class="el-icon-notebook-2"></i>
                    目录
                  </div>
                  <div @click="showNote=true">
                    <i class="el-icon-edit"></i>
                    笔记
                  </div>
                </div>
                <span v-if="!showNote">
                  <el-tree :data="chapterTree" :props="Props" @node-click="handleNodeClick"></el-tree>
                </span>
                <span v-else>
                  <ul class="note_list">
                    <li v-for="n in notes.length">
                      <div class="time_reminder">
                        <i class="el-icon-info"></i>
                        <span><i class="el-icon-caret-left"></i>{{notes[n-1].studyNotesTime}}</span>
                        <span>
                          <i class="el-icon-edit" @click="editNote(n-1)"></i>
                          <i class="el-icon-delete" @click="deleteNote(notes[n-1])"></i>
                        </span>
                      </div>
                      <span v-if="!noteEdit[n-1]">{{notes[n-1].studyNotes}}</span>
                      <span v-if="noteEdit[n-1]">
                        <el-input v-model="notes[n-1].studyNotes"></el-input>
                        <div class="space"></div>
                        <el-button @click="confirmEditNote(notes[n-1])" type="primary" size="mini">修改</el-button>
                        <el-button @click="cancelEditNote(n-1)" type="danger" size="mini">取消</el-button>
                      </span>


                    </li>
                  </ul>
                </span>

              </div>

            </el-aside>
          </el-container>
          <p class="cb"></p>
        </div>

        <div class="space"></div>
        <div class="sc_body">
          <div class="statistic">
            <div>
              <ChapterState :pieData="piedata"></ChapterState>
            </div>
            <div>
              <div class="space"></div>
              <el-tag effect="dark">课程进度</el-tag>
              <div class="space"></div>
              <p>当前课件进度</p>
              <el-progress :text-inside="true" :stroke-width="26" :percentage="chapterSpeed"></el-progress>

              <p>当前课程进度</p>
              <el-progress :text-inside="true" :stroke-width="26" :percentage="courseSpeed"></el-progress>

            </div>
            <p class="cb"></p>
          </div>


        </div>
        <div class="space"></div>
        <div class="sc_body">
          <div class="edit_comment" v-if="userinfo.userId != null">
            <div v-if="comments_my.length==0||commentdetail.id!=''">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </div>
            <div v-if="comments_my.length==0||commentdetail.id!=''">
              <el-radio v-model="commentdetail.rate" :label="1">好评</el-radio>
              <el-radio v-model="commentdetail.rate" :label="2">中评</el-radio>
              <el-radio v-model="commentdetail.rate" :label="3">差评</el-radio>
              <div class="space"></div>
              <el-input v-model="commentdetail.content" type="textarea" :rows="4"></el-input>
              <div class="space"></div>
              <el-button @click="sumbit" type="primary">评论</el-button>
            </div>
            <p class="cannot_comment" v-else>每个用户只能评论一次，您可以点击编辑来修改您的评论。</p>
            <p class="cb"></p>
          </div>
          <div class="space"></div>
          <div class="total_rate">
            <div>
              <h3>{{courserdetail.praise}}</h3>
              <p>好评度</p>
            </div>
            <div>
              <el-radio v-model="filterRate" :label="0">全部({{comments.length}})</el-radio>
              <el-radio v-model="filterRate" :label="1">好评({{comments_good.length}})</el-radio>
              <el-radio v-model="filterRate" :label="2">中评({{comments_normal.length}})</el-radio>
              <el-radio v-model="filterRate" :label="3">差评({{comments_bed.length}})</el-radio>
              <el-radio v-model="filterRate" :label="4">我的评价({{comments_my.length}})</el-radio>
            </div>
            <p class="cb"></p>
          </div>

          <div class="space"></div>
          <ul class="comment">
            <li v-for="c in current_comments">
              <div class="show_comment">
                <div>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                  {{c.user.name}}
                </div>
                <div>
                  {{c.evaluateType | translateRate}}
                  <div class="space"></div>
                  {{c.evaluateContent}}
                  <p class="corner"><span @click="toEditComment(c)"
                      v-if="c.user.userId==userinfo.userId">编辑</span>&nbsp;|{{c.createTime | splitDate}}&nbsp;|赞&nbsp;{{c.evaluatePraise}}
                  </p>
                </div>
                <p class="cb"></p>
              </div>
            </li>
          </ul>
          <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="5"
              layout="prev, pager, next" :total="ctotal">
            </el-pagination>
          </div>
        </div>

      </span>



    </div>

  </div>
</template>

<script>
  import ChapterState from '../charts/ChapterState.vue'
  import ApplyFinish from '../panel/ApplyFinish.vue'
  var si = null
  export default {
    components: {
      ChapterState,
      ApplyFinish
    },
    data() {
      return {
        aonce:false,
        showLearn: true,
        piedata: [{
            name: "未开始",
            value: 0
          },
          {
            name: "学习中",
            value: 0
          },
          {
            name: "已完成",
            value: 0
          }
        ],
        recordOnce: true,
        filterRate: 1,
        commentdetail: {
          rate: 1,
          content: "",
          id: ""
        },
        chapters: [],
        comments: [],
        comments_good: [],
        comments_normal: [],
        comments_bed: [],
        comments_my: [],
        current_comments: [],
        originalNotes: [],
        notes: [],
        noteEdit: [],
        showNote: false, //false,
        note: "",
        id: 0,
        courserdetail: {},
        url: "",
        chapterTree: [],
        currentChapter: {},
        Props: {
          children: 'lChapters',
          label: 'chapterName'
        },
        currenttime: 0,
        userinfo: {},
        page: 1,
        ctotal: 0,
        enroll: 0,
        courseSpeed: 0,
        chapterSpeed: 0,
        learningId: ""
      }
    },
    methods: {
      applyFinish() {  //申请结业
        if (this.courseSpeed == 100) {
          this.showLearn = false
          clearInterval(si)
        }
      },
      handleCurrentChange(val) {//评论翻页
        this.page = val
        this.getComment()
      },
      sumbit() { //判断添加新评论，还是修改旧评论
        if (this.commentdetail.id != "") {
          this.editComment()
        } else {
          this.sumbitComment()
        }
      },
      toEditComment(c) {

        this.commentdetail.rate = parseInt(c.evaluateType)
        this.commentdetail.content = c.evaluateContent
        this.commentdetail.id = c.evaluateId
      },
      async editComment() {

        const {
          data: res
        } = await this.$http.post("/learn/evaluate/edit", {
          evaluateId: this.commentdetail.id,
          evaluateType: this.commentdetail.rate,
          evaluateContent: this.commentdetail.content
        })
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.commentdetail.rate = ""
          this.commentdetail.content = ""
          this.commentdetail.id = ""
          this.getComment()
        }
      },
      async sumbitComment() {
        const {
          data: res
        } = await this.$http.post("/learn/evaluate/add", {
          courseId: this.id,
          userId: this.userinfo.userId,
          evaluateType: this.commentdetail.rate,
          evaluateContent: this.commentdetail.content
        })
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.commentdetail.rate = ""
          this.commentdetail.content = ""
          this.getComment()
        }
      },
      async getComment() {
        const {
          data: res
        } = await this.$http.post("/learn/evaluate/list", {
          courseId: this.id,
          page: this.page,
          rows: 5
        })
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.courserdetail.praise = res.praise
          this.comments_good = []
          this.comments_normal = []
          this.comments_bed = []
          this.comments_my = []
          this.comments = res.data
          for (var i = 0; i < this.comments.length; i++) { //把评论拆分为，好评，中评，差评，我的评论
            if (this.comments[i].evaluateType == "1") this.comments_good.push(this.comments[i])
            else if (this.comments[i].evaluateType == "2") this.comments_normal.push(this.comments[i])
            else if (this.comments[i].evaluateType == "3") this.comments_bed.push(this.comments[i])

            if (this.comments[i].user.userId == this.userinfo.userId) this.comments_my.push(this.comments[i])
          }
          this.filterRate = 0
          this.ctotal = res.count
          this.$forceUpdate()
        }
      },
      async confirmEditNote(n) { //提交编辑笔记
        const {
          data: res
        } = await this.$http.post("/learn/snotes/edit", {
          studyNotes: n.studyNotes,
          studyNotesId: n.studyNotesId
        })
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.getNotes()
        }
      },
      cancelEditNote(index) {  //删除笔记
        this.noteEdit[index] = false
        this.notes[index].studyNotes = this.originalNotes[index]
        this.$forceUpdate()
      },
      editNote(index) { //编辑笔记
        for (var i = 0; i < this.noteEdit.length; i++) {
          this.noteEdit[i] = false
          this.notes[i].studyNotes = this.originalNotes[i]
        }
        this.noteEdit[index] = true
        this.$forceUpdate()
      },
      async deleteNote(n) { //删除笔记
        const {
          data: res
        } = await this.$http.post("/learn/snotes/del", {
          studyNotesId: n.studyNotesId,
        })
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.getNotes()
        }
      },
      takeNote() {
        this.setNote()
      },
      async getNotes() { //获取笔记
        const {
          data: res
        } = await this.$http.post("/learn/snotes/list", {
          chapterId: this.currentChapter.chapterId,
          courseId: this.id,
          userId: this.userinfo.userId,
          rows: 1000,
          page: 1
        })
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.notes = res.data
          for (var i = 0; i < this.notes.length; i++) {
            this.noteEdit[i] = false
            this.originalNotes[i] = this.notes[i].studyNotes + ""
          }
          this.$forceUpdate()
        }
      },
      async setNote() { //添加笔记
        const {
          data: res
        } = await this.$http.post("/learn/snotes/add", {
          chapterId: this.currentChapter.chapterId,
          courseId: this.id,
          studyNotes: this.note,
          studyNotesTime: this.mSecondsFormat(this.currenttime)
        })
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          studyNotes: this.note = ""
          this.getNotes()
        }
      },
      back() {
        clearInterval(si)
        this.$router.go(-1)
        this.noteHint = "按Enter保存笔记"
      },
      async getCourse() {
        const {
          data: res
        } = await this.$http.get("/learn/myLearn/courseInfo?id=" + this.id)
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.courserdetail = res.data
          this.chapterTree = this.courserdetail.lChapters
          this.currentChapter = this.courserdetail.lChapters[0]
          this.url = this.courserdetail.lChapters[0].lCourseware.resourcesLink
          this.learningId = this.courserdetail.lChapters[0].lLearn.learnId
          this.getNotes()
          this.getLearnState()
        }
      },
      handleNodeClick(val) { //切换章节
        this.recordLearn()
        this.url = val.lCourseware.resourcesLink
        this.currentChapter = val
        this.recordOnce = true
        this.getLearnState()
      },
      mSecondsFormat(sec) {
        let hour = Math.floor(sec / 3600);
        let minute = Math.floor((sec - hour * 3600) / 60);
        let second = sec - hour * 3600 - minute * 60;
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        if (second < 10) {
          second = "0" + second;
        }
        return hour + ":" + minute + ":" + second;
      },
      async recordLearn() {  //记录学习进度

        const {
          data: res
        } = await this.$http.post("/learn/myLearn/recordLearning", {
          learnId: this.learningId,
          chapterId: this.currentChapter.chapterId,
          coursewareId: this.currentChapter.lCourseware.coursewareId,
          learnTime: this.currenttime,
          enrollId: this.enroll
        })
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {

        }
      },
      async getLearnState() { //获取学习进度
        const {
          data: res
        } = await this.$http.get("/learn/myLearn/learningStatus" +
          "?chapterId=" + this.currentChapter.chapterId +
          "&courseId=" + this.id
        )
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          if (this.currentChapter.lLearn == null) {
            this.learningId = null
            this.currentChapter.done = false  //如果done为true，则用户可以操作进度条.
          } else {
            this.learningId = this.currentChapter.lLearn.learningId
            document.getElementById("video").currentTime = this.currentChapter.lLearn.learnTime

            var t = this
            var xt = setInterval(function() {
              var duration = document.getElementById("video").duration.toFixed(0) - 1
              //console.log(duration)
              if (duration != 0 && !isNaN(duration)) {
                t.currentChapter.done = document.getElementById("video").currentTime.toFixed(0) >= duration
                t.$forceUpdate()
                clearInterval(xt)
              }
            }, 200)
          }
          this.courseSpeed = parseInt(res.data.courseSpeed)
          this.courseSpeed = this.courseSpeed  > 100 ? this.courseSpeed  : 100
          this.chapterSpeed = parseInt(res.data.chapterSpeed)
          this.chapterSpeed = this.courseSpeed  > 100 ? this.courseSpeed  : 100
          this.piedata = [{
              name: "未开始",
              value: res.data.notCount
            },
            {
              name: "学习中",
              value: res.data.ingCount
            },
            {
              name: "已完成",
              value: res.data.alreadyCount
            }
          ]
          //console.log(this.piedata)
          this.$forceUpdate()
        }
      }

    },
    beforeDestroy() {
      clearInterval(si)
      this.recordLearn()
    },
    created() {

      //piedata

      this.userinfo = this.$store.getters.userinfo
      this.id = this.$route.query.id
      this.enroll = this.$route.query.enrollId
      this.getCourse()
      this.getComment()
      var t = this
      si = setInterval(function() {

        t.currenttime = document.getElementById("video").currentTime.toFixed(0) - 1

        var duration = document.getElementById("video").duration
        if (duration - 1 <= t.currenttime) {
          if (t.recordOnce) {
            t.recordOnce = false

            t.recordLearn()
          }
        }

      }, 500)
    },
    watch: {
      filterRate() {
        if (this.filterRate == 0) this.current_comments = this.comments
        else if (this.filterRate == 1) this.current_comments = this.comments_good
        else if (this.filterRate == 2) this.current_comments = this.comments_normal
        else if (this.filterRate == 3) this.current_comments = this.comments_bed
        else if (this.filterRate == 4) this.current_comments = this.comments_my
      }
    },
    filters: {
      translateRate: function(rate) {
        if (rate == "1") return "好评"
        else if (rate == "2") return "中评"
        else return "差评"
      },
      secondsFormat: function(sec) {
        return this.mSecondsFormat(sec)
      },
      splitDate: function(date) {
        return date.split("T")[0]
      }
    }
  }
</script>

<style>
</style>
