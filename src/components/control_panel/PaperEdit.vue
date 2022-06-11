<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/paperlist' }">课程分类</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/paperedit' }">编辑课程</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑课程&nbsp;&nbsp;&nbsp;&nbsp;<el-button @click="editChapter">编辑章节</el-button>
            </el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form :model="paperdetail" :rules="rules" ref="paperdetail" label-width="100px"
                class="demo-ruleForm login_form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课程名称" prop="courseName">
                      <el-input v-model="paperdetail.courseName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课程类型" prop="courseType">
                      <el-radio v-model="paperdetail.courseType" label="1">自主选课</el-radio>
                      <el-radio v-model="paperdetail.courseType" label="2">专题培训</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 当是专题培训的时候选择发布对象-->
                <div v-show="paperdetail.courseType=='2'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="发布对象分类" prop="lCourseTarget">
                        <el-radio v-model="lCourseTarget.courseTargetType" label="0">机构</el-radio>
                        <el-radio v-model="lCourseTarget.courseTargetType" label="1">分组</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- 当发布对象类型是0是弹出发布对象的接口-->
                  <el-row v-show="lCourseTarget.courseTargetType == '0'">
                    <el-col :span="24">
                      <div @mousedown="orgTarget = true">
                        <el-form-item label="发布机构对象" prop="lCourseTarget">

                          <el-input v-model="twin.courseCompanyName" @focus="showOp=true" suffix-icon="el-icon-search"
                            :readonly="true"></el-input>

                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- -->
                  <el-row v-show="lCourseTarget.courseTargetType == '1'">
                    <el-col :span="24">
                      <div>
                        <el-form-item label="发布分组对象" prop="groupingId">
                          <el-input v-model="twin.groupingName" @focus="showOd=true"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                </div>
                <!-- /发布对象-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课程阶段" prop="recommendStutes">
                      <el-radio v-model="paperdetail.recommendStutes" label="1">报名阶段</el-radio>
                      <el-radio v-model="paperdetail.recommendStutes" label="2">学习阶段</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>


                <!--  分类    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属分类" prop="courseSortId">
                      <el-input v-model="twin.courseSortName" @focus="typeDialog=true" suffix-icon="el-icon-search"
                        :readonly="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-dialog title="所属分类" :visible.sync="typeDialog" class="protrusion">
                  <el-card class="box-card">
                    <el-tree :data="types" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                  </el-card>
                </el-dialog>
                <!-- / 分类    -->

                <!--  主办单位   div @mousedown="orgTarget 区分是哪个组织列表分组 -->
                <el-row>
                  <div @mousedown="orgTarget = false">
                    <el-col :span="24">
                      <el-form-item label="主办单位" prop="courseCompany">
                        <el-input v-model="paperdetail.courseCompanyName" @focus="showOp=true"
                          suffix-icon="el-icon-search" :readonly="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>

                <!--  主题    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课程主题" prop="courseTheme">
                      <el-input v-model="twin.courseThemeName" @focus="themeDialog=true" suffix-icon="el-icon-search"
                        :readonly="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-dialog title="课程主题" :visible.sync="themeDialog" class="protrusion">

                  <div>
                    <el-table :data="themes">
                      <el-table-column property="themeId" label="序号" width="50"></el-table-column>
                      <el-table-column property="themeName" label="主题名称" width="150"></el-table-column>
                      <el-table-column fixed="right" label="操作" width="50">
                        <template slot-scope="scope">
                          <el-button @click="choose(scope.row)" type="text" size="small">确定</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                      :page-sizes="[1, 2, 5, 8]" :page-size="drow" layout="total, prev, pager, next" :total="dtotal">
                    </el-pagination>
                  </div>

                </el-dialog>
                <!-- / 主题    -->

                <!--  讲师    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="讲师" prop="teacher">
                      <el-input v-model="twin.teacherName" @focus="theacherDialog=true" suffix-icon="el-icon-search"
                        :readonly="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-dialog title="讲师" :visible.sync="theacherDialog" class="protrusion">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <el-row>
                        <el-col :span="2">姓名</el-col>
                        <el-col :span="6">
                          <el-input v-model="tq.teacherName" placeholder="姓名"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">职务</el-col>
                        <el-col :span="6">
                          <el-input v-model="tq.teacherTitle" placeholder="职务"></el-input>
                        </el-col>
                      </el-row>
                      <el-row class="buttons">
                        <el-col :span="2" :offset="0">
                          <el-button icon="el-icon-search" @click="getTeacherList" type="primary">查询</el-button>
                        </el-col>
                        <el-col :span="2" :offset="3">
                          <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>
                        </el-col>

                      </el-row>
                    </div>
                    <div>
                      <el-table :data="teachers">
                        <el-table-column property="teacherId" label="序号" width="50"></el-table-column>
                        <el-table-column property="teacherName" label="姓名" width="150"></el-table-column>
                        <el-table-column property="teacherSex" label="性别" width="50">
                          <template slot-scope="scope">{{ scope.row.teacherSex |transfermSex }}</template>
                        </el-table-column>
                        <el-table-column property="teacherJob" label="职务" width="100"></el-table-column>
                        <el-table-column property="teacherType" label="类别" width="50">
                          <template slot-scope="scope">{{ scope.row.teacherType |transfermType }}</template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="50">
                          <template slot-scope="scope">
                            <el-button @click="choose(scope.row)" type="text" size="small">确定</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :page-sizes="[1, 2, 5, 8]" :page-size="drow" layout="total, prev, pager, next" :total="dtotal">
                      </el-pagination>
                    </div>
                  </el-card>
                </el-dialog>
                <!--  /讲师    -->
                <!-- 学时-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="学时" prop="classHours">
                      <el-input v-model="paperdetail.classHours"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row>
                  <el-col :span="24">
                    <el-form-item label="封面" prop="courseCover">

                      <el-input v-model="paperdetail.courseCover"></el-input>
                      <el-upload :on-success="handleAvatarSuccess" class=" mt15 avatar-uploader" :action="uploadUrl"
                        :show-file-list="false">
                        <img v-if="paperdetail.courseCover" :src="paperdetail.courseCover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>

                    </el-form-item>
                    <!-- <el-image style="width: 200px; height: 200px; margin: 10px 118px" :src="paperdetail.courseCover"
                  fit="contain"></el-image> -->

                  </el-col>
                </el-row>



                <el-row>
                  <el-col :span="24">
                    <el-form-item label="简介" prop="description">
                      <el-input type="textarea" :rows="4" v-model="paperdetail.description"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row>
                  <el-col :span="24">
                    <el-form-item label="是否发布" prop="releaseStutes">
                      <el-radio v-model="paperdetail.releaseStutes" label="0">未发布</el-radio>
                      <el-radio v-model="paperdetail.releaseStutes" label="1">发布</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布时间" prop="releaseTime">
                      <el-date-picker type="date" v-model="paperdetail.releaseTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="失效时间" prop="courseFailTime">
                      <el-date-picker type="datetime" v-model="paperdetail.courseFailTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>









                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="modifyDetail()">修改</el-button>
                  </el-col>
                </el-row>

              </el-form>
            </el-main>
          </el-container>



        </div>
      </el-card>
    </div>


    <el-container class="mt20">



      <el-dialog title="章节" :visible.sync="chapterDialog" :fullscreen="true" class="protrusion">
        <el-button type="primary" @click="insertChapter()">新建章节</el-button>
        <ul class="chapterul">
          <li v-for="c in chapters ">
            <div class="block">
              <el-input v-model="c.chapterName"></el-input>
            </div>
            <div class="block">
              <el-input v-model="c.coursewareId" @focus="displayCourses(c)" suffix-icon="el-icon-search"
                :readonly="true"></el-input>
            </div>
            <div class="block">排序
              <el-input-number size="mini" v-model="c.chapterSeq"></el-input-number>
            </div>
            <div class="block">
              <el-checkbox true-label="1" false-label="0" v-model="c.pageStutes">页面状态</el-checkbox>
              <el-checkbox true-label="1" false-label="0" v-model="c.controlStutes">控制状态</el-checkbox>
              <el-checkbox true-label="1" false-label="0" v-model="c.loadStutes">下载状态</el-checkbox>
            </div>
            <div class="block">
              <el-button type="text" @click="updateChapter(c)">确定</el-button>
              <el-button type="text" @click="insertChapter(c)">新建</el-button>
              <el-button type="text" @click="deleteChapter(c)">删除</el-button>
            </div>
            <div class="flatten"></div>
            <ul>
              <li v-for="l in c.lChilLChapter">
                <div class="block">
                  <el-input v-model="l.chapterName"></el-input>
                </div>
                <div class="block">
                  <el-input v-model="l.coursewareId" @focus="displayCourses(l)" suffix-icon="el-icon-search"
                    :readonly="true"></el-input>
                </div>
                <div class="block">排序
                  <el-input-number size="mini" v-model="l.chapterSeq"></el-input-number>
                </div>
                <div class="block">
                  <el-checkbox true-label="1" false-label="0" v-model="l.pageStutes">页面状态</el-checkbox>
                  <el-checkbox true-label="1" false-label="0" v-model="l.controlStutes">控制状态</el-checkbox>
                  <el-checkbox true-label="1" false-label="0" v-model="l.loadStutes">下载状态</el-checkbox>
                </div>
                <div class="block">
                  <el-button type="text" @click="updateChapter(l)">确定</el-button>
                  <el-button type="text" @click="deleteChapter(l)">删除</el-button>
                </div>
                <div class="flatten"></div>
              </li>
            </ul>
          </li>
        </ul>
      </el-dialog>



      <el-dialog title="" :visible.sync="delDialog" width="30%">
        <span>确定要删除：{{supposeDelete.chapterName}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>

    <OrganizationPanel :show="showOp" @choose="choseOrganization" @turnOff="(e)=>showOp = e">
    </OrganizationPanel>
    <CourseWarePanel :show="showCWp" @choose="choseCourseWare" @turnOff="(e)=>showCWp = e">
    </CourseWarePanel>
    <!-- 分组筛选列表-->
    <GroupPanel :show="showOd" @choose="getOd" @turnOff="(e) => showOd=e"></GroupPanel>
  </div>



</template>

<script>
  import OrganizationPanel from '../panel/OrganizationPanel.vue'
  import CourseWarePanel from '../panel/CourseWarePanel.vue'
  import GroupPanel from '../panel/GroupPanel.vue'
  export default {
    components: {
      OrganizationPanel,
      CourseWarePanel,
      GroupPanel
    },
    data() {
      return {
        orgTarget: false,
        uploadUrl: this.$serverURL + "common/uploadCover",
        showOp: false,
        showOd: false,
        twin: {
          groupingName: "",
          teacherName: "",
          courseSortName: "",
          courseThemeName : ""
        },
        lCourseTarget: {
          courseTargetType: "",
          courseTarget: "",
        },
        showCWp: false,
        supposeDelete: {},
        delDialog: false,
        chapterDialog: false,
        courseDialog: false,
        chapters: [],
        courses: [],
        currentCourses: {},

        dpage: 1, //分页，应用于选择框
        drow: 10, //分页，应用于选择框
        dtotal: 0, //分页，应用于选择框
        theacherDialog: false,
        organizationDialog: false,
        typeDialog: false,
        themeDialog: false,
        tq: {}, //查询条件，应用于选择框
        defaultProps: {
          children: 'chilLCourseSort',
          label: 'courseSortName'
        },

        teachers: [],
        organizations: [],
        types: [],
        themes: [],
        programlist: [],
        paperdetail: {},
        rules: {
          courseName: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }],
          courseType: [{
            required: true,
            message: '类型不能为空',
            trigger: 'blur'
          }],
         courseSortId: [{
            required: true,
            message: '所属分类不能为空',
            trigger: 'blur'
          }],
          courseCompany: [{
             required: true,
             message: '主办单位不能为空',
             trigger: 'blur'
           }],
          courseTheme: [{
             required: true,
             message: '学习主题不能为空',
             trigger: 'blur'
           }],
          courseFailTime: [{
            required: true,
            message: '失效时间不能为空',
            trigger: 'blur'
          }],
          courseCover: [{
            required: true,
            message: '课程封面不能为空',
            trigger: 'blur'
          }],
          recommendStutes: [{
            required: true,
            message: '课程阶段不能为空',
            trigger: 'blur'
          }],
          releaseStutes: [{
            required: true,
            message: '发布状态不能为空',
            trigger: 'blur'
          }],
          classHours: [{
            required: true,
            message: '学时不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      /* 从列表传输过来的数字接收*/
      this.paperdetail = this.$route.query.row
      if(this.paperdetail.lCourseTarget){
        this.lCourseTarget = this.paperdetail.lCourseTarget
        this.twin.courseCompanyName = this.paperdetail.lCourseTarget.courseTarget
         this.twin.groupingName = this.paperdetail.lCourseTarget.courseTarget
      }
      this.twin.teacherName = this.$route.query.row.teacherName;
      this.twin.courseSortName = this.$route.query.row.courseSortName;
      this.twin.courseThemeName = this.$route.query.row.courseThemeName;
      this.getProgramList()

      this.getOrganizationList()
      this.getTeacherList()
      this.getTypeList()
      this.getThemeList()
      //console.log(this.paperdetail)
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.paperdetail.courseCover = res.url
      },
      getOd(val) {
        this.lCourseTarget.courseTarget = val.groupingId.toString()
        this.twin.groupingName = val.groupingName

      },
      choseOrganization(e) {
        console.log(this.orgTarget, "22222222")
        /* orgTarget判断当前是否是发布对象调用*/
        if (this.orgTarget) {
          this.lCourseTarget.courseTarget = e.organizationId
          this.twin.courseCompanyName = e.organizationName
        } else {
          this.paperdetail.courseCompany = e.organizationId
          this.paperdetail.courseCompanyName = e.organizationName
        }

      },
      choseCourseWare(e) {
        this.courseDialog = false
        this.currentCourses.chapterName = e.coursewareNme
        this.currentCourses.coursewareId = e.coursewareId
      },

      async confirmDelete() { //删除章节
        this.delDialog = false
        const {
          data: res
        } = await this.$http.post("manager/chapter/del", {
          chapterId: this.supposeDelete.chapterId
        })
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.getChapterTree()
          return this.$message.success(res.msg)
        }
      },
      async updateChapter(c) {


        if (c.chapterId == null) {
          const {
            data: res
          } = await this.$http.post("manager/chapter/add", c)
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            c.chapterId = res.data
            return this.$message.success(res.msg)
          }
        } else {
          const {
            data: res
          } = await this.$http.post("manager/chapter/edit", c)
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            return this.$message.success(res.msg)
          }
        }

      },
      insertChapter(c) { //新章节
        if (c == null) {
          c = {}
          c.chapterId = 0
        }
        var newChapter = {
          chapterName: "",
          chapterItem: c.chapterId,
          chapterSeq: 1,
          chapterType: 3,
          courseId: this.paperdetail.courseId,
          learnType: 1,
          pageStutes: "0",
          controlStutes: "0",
          loadStutes: "0",
          coursewareId: ""
        }
        if (c.chapterId == 0) {

          this.chapters.push(newChapter)
          //console.log(this.chapters)
        } else {
          c.lChilLChapter.push(newChapter)
        }
      },
      deleteChapter(c) {
        this.delDialog = true
        this.supposeDelete = c
      },
      editChapter() {
        this.getChapterTree()
        this.getCourseList()
        this.chapterDialog = true
      },
      async getCourseList() {
        var param = {}
        param.coursewareName = this.tq.coursewareName
        param.page = this.dpage
        param.rows = this.drow
        const {
          data: res
        } = await this.$http.post("manager/courseware/list", param)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.dtotal = res.count
          this.courses = res.data
        }
      },
      async getChapterTree() {
        const {
          data: res
        } = await this.$http.post("/manager/chapter/tree", {
          courseId: this.paperdetail.courseId
        })
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {

          this.chapters = res.data
        }
      },
      displayCourses(c) {
        this.currentCourses = c
        this.showCWp = true
      },
      chooseCourse(row) {
        this.courseDialog = false
        console.log(row)
        this.currentCourses.chapterName = row.coursewareNme
        this.currentCourses.coursewareId = row.coursewareId
      },


      modifyDetail() {
        this.modifyorganization()
      },
      async getProgramList() {
        const {
          data: res
        } = await this.$http.post("manager/csort/list", {
          page: 1,
          rows: 100
        })
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.programlist = res.data
        }
      },
      async modifyorganization() {
        /* 如果是专题培训类型则把发布对象添加到lCourseTarget里面*/
        /* lCourseTarget对象
              参数名	            必选	    类型	    说明
              courseTarget	    是	    string	发布人
              courseTargetType	是	    string	发布对象分类 0机构1分组*/
        if(this.paperdetail.courseType == "2"){
          this.paperdetail.lCourseTarget = this.lCourseTarget;

        }
        const {
          data: res
        } = await this.$http.post("/manager/course/edit", this.paperdetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {

          this.$message.success('修改成功')
          this.$router.go(-1)
        }
      },
      async getTeacherList() {
        var param = this.tq
        param.page = this.dpage
        param.rows = this.drow

        const {
          data: res
        } = await this.$http.post("/manager/teacher/list", param)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.dtotal = res.count
          this.teachers = res.data
        }
      },
      async getOrganizationList() {
        var param = this.tq
        param.page = this.dpage
        param.rows = this.drow
        param.organizationId = 0
        const {
          data: res
        } = await this.$http.post("/manager/org/list", param)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.organizations = res.data
          this.dtotal = res.count
        }
      },
      async getThemeList() {
        const {
          data: res
        } = await this.$http.post("/manager/theme/list", {
          page: this.dpage,
          rows: this.drow
        })
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.dtotal = res.count
          this.themes = res.data
        }
      },
      async getTypeList() {
        const {
          data: res
        } = await this.$http.post("/manager/csort/tree", {
          page: this.dpage,
          rows: this.drow
        })
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.dtotal = res.count
          this.types = res.data
          console.log(this.types)
        }
      },
      reset() {
        this.tq = {}
        this.getOrganizationList()
        this.getTeacherList()
        this.getTypeList()
      },
      choose(row) {
        if (this.theacherDialog) { //如果讲师选择框打开这获取讲师的职
          this.theacherDialog = false
          this.paperdetail.teacher = row.teacherId
          this.paperdetail.teacherName = row.teacherName
          this.twin.teacherName = row.teacherName
        } else if (this.organizationDialog) { //公司
          this.organizationDialog = false
          this.paperdetail.courseCompany = row.organizationId
          this.paperdetail.courseCompanyName = row.organizationName

        } else if (this.themeDialog) { //课程主题
          this.themeDialog = false
          this.paperdetail.courseTheme = row.themeId
          this.paperdetail.courseThemeName = row.themeName
          this.twin.courseThemeName = row.themeName
          console.log(row)
        }
        console.log(this.twin)
      },
      handleNodeClick(data) {

        this.typeDialog = false
        this.paperdetail.courseSortId = data.courseSortId
        this.paperdetail.courseSortName = data.courseSortName
        this.twin.courseSortName = data.courseSortName
        console.log(data,"febn")
        console.log(this.twin)
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.drow = newSize
        if (this.theacherDialog) this.getTeacherList()
        if (this.chapterDialog) this.getCourseList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.dpage = newPage
        if (this.theacherDialog) this.getTeacherList()
        if (this.chapterDialog) this.getCourseList()
      }
    },
    filters: {
      transfermBoolen: function(val) {
        if (val == "1") {
          return true
        } else {
          return false
        }
      },
      truncateDate: function(date) {
        return date.split('T')[0]
      },
      transfermState: function(state) {
        if (state == "1") return "启用"
        else return "禁用"
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
