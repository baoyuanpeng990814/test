<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/paperlist' }"
        >课程管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/papercreate' }"
        >创建课程</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建课程</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form
                :model="paperDetail"
                :rules="paperRules"
                ref="paperDetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课程名称" prop="courseName">
                      <el-input v-model="paperDetail.courseName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课程类型" prop="courseType">
                      <el-radio v-model="paperDetail.courseType" label="1"
                        >自主选课</el-radio
                      >
                      <el-radio v-model="paperDetail.courseType" label="2"
                        >专题培训</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 当是专题培训的时候选择发布对象-->
                <div v-show="paperDetail.courseType == '2'">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="发布对象分类" prop="lCourseTarget">
                        <el-radio
                          v-model="lCourseTarget.courseTargetType"
                          label="0"
                          >机构</el-radio
                        >
                        <el-radio
                          v-model="lCourseTarget.courseTargetType"
                          label="1"
                          >分组</el-radio
                        >
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- 当发布对象类型是0是弹出发布对象的接口-->
                  <el-row v-show="lCourseTarget.courseTargetType == '0'">
                    <el-col :span="24">
                      <div @mousedown="orgTarget = true">
                        <el-form-item label="发布机构对象" prop="lCourseTarget">
                          <el-input
                            v-model="twin.courseCompanyName"
                            @focus="showOp = true"
                            suffix-icon="el-icon-search"
                            :readonly="true"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- -->
                  <el-row v-show="lCourseTarget.courseTargetType == '1'">
                    <el-col :span="24">
                      <div>
                        <el-form-item label="发布分组对象" prop="groupingId">
                          <el-input
                            v-model="twin.groupingName"
                            @focus="showOd = true"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <!-- /发布对象-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课程阶段" prop="recommendStutes">
                      <el-radio v-model="paperDetail.recommendStutes" label="1"
                        >报名阶段</el-radio
                      >
                      <el-radio v-model="paperDetail.recommendStutes" label="2"
                        >学习阶段</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <!--  分类    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属分类" prop="courseSortId">
                      <el-input
                        v-model="paperDetail.courseSortId"
                        @focus="typeDialog = true"
                        suffix-icon="el-icon-search"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-dialog
                  title="所属分类"
                  :visible.sync="typeDialog"
                  class="protrusion"
                >
                  <el-card class="box-card">
                    <el-tree
                      :data="types"
                      :props="defaultProps"
                      @node-click="handleNodeClick"
                    ></el-tree>
                  </el-card>
                </el-dialog>
                <!-- / 分类    -->

                <!--  主办单位   div @mousedown="orgTarget 区分是哪个组织列表分组 -->
                <el-row>
                  <div @mousedown="orgTarget = false">
                    <el-col :span="24">
                      <el-form-item label="主办单位" prop="courseCompany">
                        <el-input
                          v-model="paperDetail.courseCompanyName"
                          @focus="showOp = true"
                          suffix-icon="el-icon-search"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>

                <!--  主题    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课程主题" prop="courseTheme">
                      <el-input
                        v-model="paperDetail.courseTheme"
                        @focus="themeDialog = true"
                        suffix-icon="el-icon-search"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-dialog
                  title="课程主题"
                  :visible.sync="themeDialog"
                  class="protrusion"
                >
                  <div>
                    <el-table :data="themes">
                      <el-table-column
                        property="themeId"
                        label="序号"
                        width="50"
                      ></el-table-column>
                      <el-table-column
                        property="themeName"
                        label="主题名称"
                        width="150"
                      ></el-table-column>
                      <el-table-column fixed="right" label="操作" width="50">
                        <template slot-scope="scope">
                          <el-button
                            @click="choose(scope.row)"
                            type="text"
                            size="small"
                            >确定</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[1, 2, 5, 8]"
                      :page-size="drow"
                      layout="total, prev, pager, next"
                      :total="dtotal"
                    >
                    </el-pagination>
                  </div>
                </el-dialog>
                <!-- / 主题    -->

                <!--  讲师    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="讲师" prop="teacher">
                      <el-input
                        v-model="paperDetail.teacher"
                        @focus="theacherDialog = true"
                        suffix-icon="el-icon-search"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-dialog
                  title="讲师"
                  :visible.sync="theacherDialog"
                  class="protrusion"
                >
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <el-row>
                        <el-col :span="1">姓名:</el-col>
                        <el-col :span="6">
                          <el-input
                            v-model="tq.teacherName"
                            placeholder="姓名"
                          ></el-input>
                        </el-col>
                        <el-col :span="1" :offset="1">职务:</el-col>
                        <el-col :span="6">
                          <el-input
                            v-model="tq.teacherTitle"
                            placeholder="职务"
                          ></el-input>
                        </el-col>
                        <el-col :span="9" style="text-align: right;">
                          <el-button
                            icon="el-icon-search"
                            @click="getTeacherList"
                            type="primary"
                            >查询</el-button
                          >
                          <el-button
                            icon="el-icon-refresh-right"
                            @click="reset"
                            type="primary"
                            >重置</el-button
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <div>
                      <el-table :data="teachers">
                        <el-table-column
                          property="teacherId"
                          label="序号"
                          width="50"
                        ></el-table-column>
                        <el-table-column
                          property="teacherName"
                          label="姓名"
                          width="150"
                        ></el-table-column>
                        <el-table-column
                          property="teacherSex"
                          label="性别"
                          width="50"
                        >
                          <template slot-scope="scope">{{
                            scope.row.teacherSex | transformSex
                          }}</template>
                        </el-table-column>
                        <el-table-column
                          property="teacherJob"
                          label="职务"
                          width="100"
                        ></el-table-column>
                        <el-table-column
                          property="teacherType"
                          label="类别"
                          width="50"
                        >
                          <template slot-scope="scope">{{
                            scope.row.teacherType | transformType
                          }}</template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="50">
                          <template slot-scope="scope">
                            <el-button
                              @click="choose(scope.row)"
                              type="text"
                              size="small"
                              >确定</el-button
                            >
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10]"
                        :page-size="drow"
                        layout="total, prev, pager, next"
                        :total="dtotal"
                      >
                      </el-pagination>
                    </div>
                  </el-card>
                </el-dialog>
                <!--  /讲师    -->
                <!-- 学时-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="学时" prop="classHours">
                      <el-input v-model="paperDetail.classHours"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="封面" prop="courseCover">
                      <el-input v-model="paperDetail.courseCover"></el-input>
                      <el-upload
                        :on-success="handleAvatarSuccess"
                        class=" mt15 avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                      >
                        <img
                          v-if="paperDetail.courseCover"
                          :src="paperDetail.courseCover"
                          class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <!-- <el-image style="width: 200px; height: 200px; margin: 10px 118px" :src="paperDetail.courseCover"
                  fit="contain"></el-image> -->
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="简介" prop="description">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="paperDetail.description"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="是否发布" prop="releaseStutes">
                      <el-radio v-model="paperDetail.releaseStutes" label="0"
                        >未发布</el-radio
                      >
                      <el-radio v-model="paperDetail.releaseStutes" label="1"
                        >发布</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布时间" prop="createTime">
                      <el-date-picker
                        type="date"
                        v-model="paperDetail.createTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="生效时间" prop="releaseTime">
                      <el-date-picker
                      type="datetime"
                        v-model="paperDetail.releaseTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="失效时间" prop="courseFailTime">
                      <el-date-picker
                        type="datetime"
                        v-model="paperDetail.courseFailTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col style="text-align: center;">
                    <el-button
                      type="primary"
                      @click="createUserFn('paperDetail')"
                      >添加</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>

    <OrganizationPanel
      :show="showOp"
      @choose="choseOrganization"
      @turnOff="e => (showOp = e)"
    >
    </OrganizationPanel>

    <!-- 分组筛选列表-->
    <GroupPanel
      :show="showOd"
      @choose="getOd"
      @turnOff="e => (showOd = e)"
    ></GroupPanel>
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
import GroupPanel from '../panel/GroupPanel.vue'
import Today from '../../assets/common.js/today.js'
export default {
  components: {
    OrganizationPanel,
    GroupPanel
  },
  data() {
    return {
      orgTarget: false,
      uploadUrl: this.$serverURL + 'common/uploadCover',
      showOp: false,
      showOd: false,
      twin: {
        groupingName: ''
      },
      lCourseTarget: {
        courseTargetType: '',
        courseTarget: ''
      },
      dpage: 1,
      drow: 10,
      dtotal: 0,
      theacherDialog: false,
      organizationDialog: false,
      typeDialog: false,
      themeDialog: false,
      tq: {},
      defaultProps: {
        children: 'chilLCourseSort',
        label: 'courseSortName'
      },

      teachers: [],
      organizations: [],
      types: [],
      themes: [],
      programlist: [],
      paperDetail: {
        courseName: '',
        courseType: '',
        courseSortId: '',
        courseCompany: '',
        courseTheme: '',
        courseFailTime: '',
        courseCover: '',
        recommendStutes: '',
        description: '',
        releaseStutes: '',
        releaseTime: '',
        createTime: '',
        teacher: '',
        classHours: ''
      },
      paperRules: {
        courseName: [
          {
            required: true,
            message: '请输入课程名称',
            trigger: 'blur'
          }
        ],
        courseType: [
          {
            required: true,
            message: '请选择课程类型',
            trigger: 'blur'
          }
        ],
        courseSortId: [
          {
            required: true,
            message: '请选择所属分类',
            trigger: 'change'
          }
        ],
        courseCompany: [
          {
            required: true,
            message: '请选择主办单位',
            trigger: 'change'
          }
        ],
        courseTheme: [
          {
            required: true,
            message: '请选择课程主题',
            trigger: 'change'
          }
        ],
        courseFailTime: [
          {
            required: true,
            message: '请选择失效时间',
            trigger: 'change'
          }
        ],
        courseCover: [
          {
            required: true,
            message: '请选择课程封面',
            trigger: 'change'
          }
        ],
        recommendStutes: [
          {
            required: true,
            message: '请选择课程阶段',
            trigger: 'change'
          }
        ],
        releaseStutes: [
          {
            required: true,
            message: '请选择发布状态',
            trigger: 'change'
          }
        ],
        classHours: [
          {
            required: true,
            message: '请输入学时',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    theacherDialog() {
      if (this.theacherDialog) {
        this.getTeacherList()
      }
    }
  },
  created() {
    // 获取当前时间
    this.paperDetail.createTime = Today.getDate(this.paperDetail.createTime)
    this.getProgramList()
    this.getOrganizationList()
    this.getTypeList()
    this.getThemeList()
  },
  methods: {
    test() {},
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      this.paperDetail.courseCover = res.url
    },
    getOd(val) {
      this.lCourseTarget.courseTarget = val.groupingId.toString()
      this.twin.groupingName = val.groupingName
    },
    choseOrganization(e) {
      /* orgTarget判断当前是否是发布对象调用 */
      if (this.orgTarget) {
        this.lCourseTarget.courseTarget = e.organizationId
        this.twin.courseCompanyName = e.organizationName
      } else {
        this.paperDetail.courseCompany = e.organizationId
        this.paperDetail.courseCompanyName = e.organizationName
      }
    },
    async getProgramList() {
      const { data: res } = await this.$http.post('manager/csort/list', {
        page: 1,
        rows: 100
      })
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.programlist = res.data
      }
    },
    /* 报名成功后跳转到编辑页面 */

    createUserFn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          /* 如果是专题培训类型则把发布对象添加到lCourseTarget里面 */
          /* lCourseTarget对象
              参数名	            必选	    类型	    说明
              courseTarget	    是	    string	发布人
              courseTargetType	是	    string	发布对象分类 0机构1分组 */
          if (this.paperDetail.courseType === '2') {
            this.paperDetail.lCourseTarget = this.lCourseTarget
          }
          const { data: res } = await this.$http.post(
            '/manager/course/add',
            this.paperDetail
          )
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('添加成功')
            this.$router.push({
              path: '/paperedit',
              query: {
                row: res.data
              }
            })
            // this.$router.go(-1)
          }
        } else {
          return false
        }
      })
    },
    async getTeacherList() {
      var param = this.tq
      param.page = this.dpage
      param.rows = this.drow

      const { data: res } = await this.$http.post(
        '/manager/teacher/list',
        param
      )
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
      const { data: res } = await this.$http.post('/manager/org/list', param)
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.organizations = res.data
        this.dtotal = res.count
      }
    },
    async getThemeList() {
      const { data: res } = await this.$http.post('/manager/theme/list', {
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
      const { data: res } = await this.$http.post('/manager/csort/tree', {
        page: this.dpage,
        rows: this.drow
      })
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.dtotal = res.count
        this.types = res.data
      }
    },
    reset() {
      this.tq = {}
      this.getOrganizationList()
      this.getTeacherList()
      this.getTypeList()
    },
    choose(row) {
      if (this.theacherDialog) {
        this.theacherDialog = false
        this.paperDetail.teacher = row.teacherId
      } else if (this.organizationDialog) {
        this.organizationDialog = false
        this.paperDetail.courseCompany = row.organizationId
      } else if (this.themeDialog) {
        this.themeDialog = false
        this.paperDetail.courseTheme = row.themeId
      }
    },
    handleNodeClick(data) {
      this.typeDialog = false
      this.paperDetail.courseSortId = data.courseSortId
    },
    // 监听rows改变的事件
    handleSizeChange(newSize) {
      this.drow = newSize
      if (this.theacherDialog) this.getTeacherList()
      // elseif (this.theacherDisalog) this.getTeacherList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.dpage = newPage
      if (this.theacherDialog) this.getTeacherList()
    }
  },
  filters: {
    transformDate: function(date) {
      return date.split('T')[0]
    },
    transformSex: function(sex) {
      if (sex === '1') return '男'
      else return '女'
    },
    transformType: function(type) {
      if (type === '1') return '内部'
      else return '外部'
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
  border-color: #409eff;
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
