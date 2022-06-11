<template>
  <div class="selection_preview">
    <div class="preview_head">
      <div class="inner">
        <div><span>课程名:</span>{{courserdetail.courseName}}</div>
        <div @click="back()"><i class="el-icon-back"></i>返回课程详情</div>
      </div>
    </div>
    <div class="selection_preview_body">
      <el-container>
        <el-main>
          <video  oncontextmenu="return false" ref="video" id="video" controlsList="nodownload" class="preview_video" :src="url" controls="controls"
            autoplay="autoplay">
            您的浏览器不支持 video 标签。
          </video>
          <div class="video_info">
            <div>
              {{currenttime | secondsFormat}}
            </div>
            <div>
              购买后可以完整学习、记录进度，使用笔记和问答
            </div>
          </div>
        </el-main>
        <el-aside>
          <el-tree :data="chapterTree" :props="Props" @node-click="handleNodeClick"></el-tree>
        </el-aside>
      </el-container>
    </div>

  </div>
</template>

<script>

  var si = null
  export default {
    data() {
      return {
        chapterIndex: 0,
        id: 0,
        courserdetail: {},
        url: "",
        chapterTree: [],
        Props: {
          children: 'lCourseware',
          label: 'chapterName'
        },
        currenttime: 0,
        video: null,
        try: true
      }
    },
    methods: {
      back() {
        clearInterval(si)
        this.$router.go(-1)

      },
      async getCourse() {
        const {
          data: res
        } = await this.$http.get("/learn/myLearn/courseInfo?id=" + this.id)
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.courserdetail = res.data
          this.chapterTree = this.courserdetail.lChapters;
          this.url = this.courserdetail.lChapters[this.chapterIndex].lCourseware.resourcesLink
        }
      },
      handleNodeClick(val) {
        if (this.try) {
          this.url = val.lCourseware.resourcesLink
        }
      }
    },
    created() {
      window.addEventListener("popstate", function() {
        clearInterval(si)
      });


      this.id = this.$route.query.id
      this.getCourse()
      var t = this

      si = setInterval(function() {  //6分钟试看
        t.currenttime = document.getElementById("video").currentTime.toFixed(0)
        if (t.currenttime > 360) {
          t.try = false
          clearInterval(si)
          document.getElementById("video").pause()
          t.url = ""
        }
      }, 500)


    },
    filters: {
      secondsFormat: function(sec) {
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
      }
    }
  }
</script>

<style>
</style>
