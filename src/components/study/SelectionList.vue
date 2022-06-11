<template>

  <div class="selection_body">
    <div class="space mt20"></div>

    <div class="selection_list">
      <el-container>
        <el-main>

          <el-card>
            <div slot="header" class="clearfix">
              <span class="card_title">课程中心</span>

            </div>
            <div class="text item">
              <el-collapse>
                <el-collapse-item :title="currentTheme.themeName" name="1">
                  <el-button @click="changeParentTheme(t.themeId)" v-for="t in themes" plain>{{t.themeName}}</el-button>
                </el-collapse-item>
              </el-collapse>

              <div class="selection_page mt20">
                <el-button @click="changeParentTheme(currentTheme.themeId)" plain>全部</el-button>
                <el-button @click="changeParentTheme(t.themeId)" class="t.themeId == id ? 'unchose_btn' :  'chose_btn'" v-for="t in currentTheme.chilLTheme" plain>
                  {{t.themeName}}
                </el-button>
              </div>

              <div class="space mt20"></div>
              <div class="selection_page">
                <el-row>
                  <div v-if="sections.length ==0">
                    <h3 class="nothing">暂无课程</h3>
                  </div>

                  <el-col :span="6" v-for="s in sections">
                    <!-- {{s.courseName}}-->
                    <div @click="goToConfirm(s)" class="item_div_left">
                      <el-image style="height: 120px" :src="s.courseCover"></el-image>
                    </div>
                    <div @click="goToConfirm(s)" class="item_div_left">
                      <p>{{s.courseName}}</p>
                      <div class="item_info">
                        <i class="el-icon-timer"></i>{{s.classHours}}课时
                        &nbsp;
                        <span class="p_amoung"><i class="el-icon-user"></i>{{s.people}}人在学</span>

                      </div>
                    </div>

                  </el-col>
                </el-row>
              </div>
              <div class="space"></div>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="page" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                layout="sizes, prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </el-card>
          <div class="space"></div>
        </el-main>
        <el-aside width="270px" class="selection_aside">
          <el-card>
            <div slot="header" class="clearfix">
              <span>选课排名</span>
              <el-button @click="turnToListMore()" style="float: right; padding: 3px 0" type="text">更多</el-button>
            </div>
            <div v-for="t in tops.length" class="selection_top">
              <div>{{t}}.&nbsp;&nbsp;{{tops[t-1].name}}</div>
              <div>{{tops[t-1].courseCount}}人</div>
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
        pictures: [require('../../images/banner1.png'), require('../../images/banner2.png')],
        themes: [],
        sections: [],
        tops: [],
        id: 0,
        currentTheme: {},
        total: 0,
        rows: 10,
        page: 1
      }
    },
    methods: {
      goToConfirm(s) {
        console.log(s)

        this.$router.push({
          path: '/selectionconfirm',
          query: {
            id: s.courseId
          }
        })

      },
      turnToListMore() {
        this.$router.push({
          path: '/selectionlist',

        })
      },
      changeParentTheme(id) {
        this.id =  id
        for (var i = 0; i < this.themes.length; i++) {
          if (this.themes[i].themeId == this.id) {
            this.currentTheme = this.themes[i] 
          }
        }

        if (this.id == 0) this.getAllSections()
        else this.getSections(this.id)

      },
      async getSectionTop() {
        const {
          data: res
        } = await this.$http.post("/learn/course/courseRanking")
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.tops = res.data
        }
      },
      async getAllSections() {
        this.id = 0
        const {
          data: res
        } = await this.$http.post("/learn/course/listTheme", {
          page: this.page,
          rows: this.rows
        })
        if (res.state !== 200) {
          this.sections = []
        } else {
          this.sections = res.data
          this.total = res.count

        }

      },
      async getSections(id) {
        const {
          data: res
        } = await this.$http.post("/learn/course/listTheme", {
          themeId: id,
          page: this.page,
          rows: this.rows
        })
        if (res.state !== 200) {
          this.sections = []
        } else {
          this.sections = res.data
          this.total = res.count

        }
      },
      async getThemeTree() {
        const {
          data: res
        } = await this.$http.post("/learn/course/treeTheme", this.queryInfo)
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.themes = []
          this.themes.push({
            themeId: 0,
            themeName: "全部",
            themeState: "1",
            parentNode: 0,
            description: "全部",
            createOrg: "",
            chilLTheme: []
          })

          for (var i = 0; i < res.data.length; i++) {
            this.themes.push(res.data[i])
          }
          for (var i = 0; i < this.themes.length; i++) {
            if (this.themes[i].themeId == this.id) {
              this.currentTheme = this.themes[i]
            }
            for (var j = 0; j < this.themes[i].chilLTheme.length; j++) {
              this.themes[0].chilLTheme.push(this.themes[i].chilLTheme[j])
            }
          }

        }
      },
      handleSizeChange(val) {
        this.rows = val
      },
      handleCurrentChange(val) {

        this.page = val
        this.changeParentTheme(this.id)
      }
    },
    created() {
      this.id = this.$route.query.id
      var cid = this.$route.query.childid
      this.getThemeTree()
      this.getSectionTop()
      if (this.id != null) this.getSections(this.id)
      else this.getAllSections()
      var _this = this
      setTimeout(function(){
       if(cid!=null)

        _this.changeParentTheme(cid)
      },50)
    }
  }
</script>

<style>
</style>
