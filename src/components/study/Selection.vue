<template>
  <div class="selection_body">
    <el-carousel :interval="5000" height="440px" arrow="never">
      <el-carousel-item v-for="p in pictures" :key="p.id">
        <h3>
          <el-image
            style="width: 100%; height: 440px;"
            :src="p"
            alt=""
            fit="none"
          ></el-image>
        </h3>
      </el-carousel-item>
    </el-carousel>

    <div class="head_menu">
      <ul>
        <li v-for="t in themes.length" :key="t.id">
          <el-button type="text" @click="turnToList(t - 1)">{{
            themes[t - 1].themeName
          }}</el-button>

          <div class="incidental">
            <div
              class="option"
              v-for="ct in themes[t - 1].chilLTheme"
              :key="ct.id"
            >
              <el-button @click="turnToList(t - 1, ct.themeId)" type="text">{{
                ct.themeName
              }}</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="selection_content">
      <el-container>
        <el-main>
          <div v-for="t in themes.length" :key="t.id">
            <el-card>
              <div slot="header" class="clearfix">
                <span>{{ themes[t - 1].themeName }}</span>
                <el-button
                  @click="turnToList(t - 1)"
                  style="float: right; padding: 3px 0"
                  type="text"
                  >更多</el-button
                >
              </div>
              <div class="selection_page">
                <el-row>
                  <el-col :span="12" v-for="s in sections[t - 1]" :key="s.id">
                    <!-- {{s.courseName}}-->
                    <div class="item_div_left" @click="goToConfirm(s)">
                      <el-image :src="s.courseCover"></el-image>
                    </div>
                    <div class="item_div_left" @click="goToConfirm(s)">
                      <p>{{ s.courseName }}</p>
                      <div class="item_info">
                        <i class="el-icon-timer"></i>{{ s.classHours }}
                        &nbsp;
                        <i class="el-icon-user"></i>{{ s.people }}
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <div class="space"></div>
          </div>

          <el-button @click="turnToList()" class="load_more"
            >点击加载更多</el-button
          >
        </el-main>
        <el-aside width="270px" class="selection_aside">
          <el-card>
            <div slot="header" class="clearfix">
              <span>选课排名</span>
              <el-button
                @click="turnToList()"
                style="float: right; padding: 3px 0"
                type="text"
                >更多</el-button
              >
            </div>
            <div v-for="t in tops.length" class="selection_top" :key="t / id">
              <div>{{ t }}.&nbsp;&nbsp;{{ tops[t - 1].name }}</div>
              <div>{{ tops[t - 1].courseCount }}人</div>
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
      pictures: [
        require('../../images/banner1.png'),
        require('../../images/banner2.png')
      ],
      themes: [],
      sections: [],
      tops: []
    }
  },
  methods: {
    goToConfirm(s) {
      //转到课程介绍页
      this.$router.push({
        path: '/selectionconfirm',
        query: {
          id: s.courseId
        }
      })
    },
    turnToList(index, index2) {
      //转到list
      if (index != null && index2 != null) {
        this.$router.push({
          path: '/selectionlist',
          query: {
            id: this.themes[index].themeId,
            childid: index2
          }
        })
      } else if (index != null) {
        this.$router.push({
          path: '/selectionlist',
          query: {
            id: this.themes[index].themeId
          }
        })
      } else {
        this.$router.push({
          path: '/selectionlist'
        })
      }
    },
    async getSectionTop() {
      //课程热度排名
      const { data: res } = await this.$http.post('/learn/course/courseRanking')
      if (res.state !== 200) {
        //return this.$message.error('数据获取失败！')
      } else {
        this.tops = res.data
      }
    },
    async getSections(id, index) {
      //获取课程主题

      const { data: res } = await this.$http.post('/learn/course/listTheme', {
        themeId: id,
        page: 1,
        rows: 4
      })
      if (res.state !== 200) {
      } else {
        this.sections[index] = res.data
        this.$forceUpdate()
      }
    },
    async getThemeTree() {
      //获取课程主题树

      const { data: res } = await this.$http.post(
        '/learn/course/treeTheme',
        this.queryInfo
      )
      if (res.state !== 200) {
        //return this.$message.error('数据获取失败！')
      } else {
        this.themes = res.data
        for (var i = 0; i < this.themes.length; i++) {
          this.sections[i] = []
        }
        for (var i = 0; i < this.themes.length; i++) {
          this.getSections(this.themes[i].themeId, i)
        }
      }
    }
  },
  created() {
    this.getThemeTree()
    this.getSectionTop()
  }
}
</script>
<style></style>
