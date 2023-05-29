<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/courselist' }"
        >课件管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/courseedit' }"
        >编辑课件</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑课件</el-col>
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
                :model="coursedetail"
                :rules="rules"
                ref="coursedetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课件名称" prop="coursewareName">
                      <el-input v-model="coursedetail.coursewareName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课件类型" prop="state">
                      <el-radio v-model="coursedetail.coursewareType" label="1"
                        >讲义</el-radio
                      >
                      <el-radio v-model="coursedetail.coursewareType" label="2"
                        >文档</el-radio
                      >
                      <el-radio v-model="coursedetail.coursewareType" label="3"
                        >视频</el-radio
                      >
                      <el-radio v-model="coursedetail.coursewareType" label="4"
                        >标准</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="课件时长" prop="coursewareHours">
                      <el-input
                        v-model="coursedetail.coursewareHours"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!--  机构    -->

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="*组织机构" prop="organizationId">
                      <el-input
                        @focus="showOp = true"
                        suffix-icon="el-icon-search"
                        v-model="coursedetail.organizationName"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!--  机构    -->

                <!--  讲师    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="讲师" prop="teacherName">
                      <el-input
                        v-model="coursedetail.teacherName"
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
                        <el-col :span="2">姓名</el-col>
                        <el-col :span="6">
                          <el-input
                            v-model="tq.teacherName"
                            placeholder="姓名"
                          ></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">职务</el-col>
                        <el-col :span="6">
                          <el-input
                            v-model="tq.teacherTitle"
                            placeholder="职务"
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row class="buttons">
                        <el-col :span="2" :offset="0">
                          <el-button
                            icon="el-icon-search"
                            @click="getTeacherList"
                            type="primary"
                            >查询</el-button
                          >
                        </el-col>
                        <el-col :span="2" :offset="3">
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
                        :page-sizes="[1, 2, 5, 8]"
                        :page-size="drow"
                        layout="total, prev, pager, next"
                        :total="dtotal"
                      >
                      </el-pagination>
                    </div>
                  </el-card>
                </el-dialog>
                <!--  讲师    -->

                <!--  分类    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类" prop="coursewareTypeId">
                      <el-input
                        v-model="coursedetail.coursewareTypeName"
                        @focus="typeDialog = true"
                        suffix-icon="el-icon-search"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-dialog
                  title="分类"
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
                <!--  分类    -->

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="URL" prop="resourcesLink">
                      <el-input v-model="coursedetail.resourcesLink"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="上传文件">
                      <el-upload
                        :headers="myheader"
                        :on-success="handleAvatarSuccess"
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                      >
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="机构状态" prop="stutes">
                      <el-radio v-model="coursedetail.stutes" label="1"
                        >启用</el-radio
                      >
                      <el-radio v-model="coursedetail.stutes" label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="modifyDetail()"
                      >修改</el-button
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
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
var token = window.sessionStorage.getItem('token')

export default {
  components: {
    OrganizationPanel
  },
  data() {
    return {
      showOp: false,

      dpage: 1,
      drow: 10,
      dtotal: 0,
      theacherDialog: false,
      organizationDialog: false,
      typeDialog: false,
      tq: {},
      defaultProps: {
        children: 'chilCoursewareType',
        label: 'coursewareTypeName'
      },
      teachers: [],
      organizations: [],
      types: [],
      coursedetail: {},
      rules: {
        coursewareId: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        coursewareName: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        coursewareType: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        coursewareHours: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        // coursewareName: [
        //   {
        //     required: true,
        //     message: '不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        /* organizationId: [{
            required: true,
            message: "不能为空",
            trigger: 'blur'
          }],
          teacherName: [{
            required: true,
            message: "不能为空",
            trigger: 'blur'
          }],
          coursewareTypeId: [{
            required: true,
            message: "不能为空",
            trigger: 'blur'
          }], */
        resourcesLink: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        stutes: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      },
      uploadUrl: '',
      files: [],
      myheader: {
        token: token
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
    this.getOrganizationList()
    // this.getTeacherList()
    this.getTypeList()
    this.coursedetail = this.$route.query.row
    this.uploadUrl = this.$serverURL + 'manager/questions/uploadQuestionExcel'
    this.coursedetail.coursewareTypeId_num = parseInt(
      this.coursedetail.coursewareTypeId
    )
  },
  methods: {
    choseOrganization(e) {
      this.coursedetail.organizationId = e.organizationId
      this.coursedetail.organizationName = e.organizationName
    },
    handleAvatarSuccess(res, file) {
      this.files.push(file)
      // coursedetail.resourcesLink
      this.$message.success('上传成功')
    },
    modifyDetail() {
      this.modifyfunction()
    },
    async modifyfunction() {
      const { data: res } = await this.$http.post(
        '/manager/courseware/edit',
        this.coursedetail
      )
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
    async getTypeList() {
      const { data: res } = await this.$http.post('/manager/ctyp/tree', {
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
        this.coursedetail.teacherId = row.teacherId
        this.coursedetail.teacherName = row.teacherName
      } else if (this.organizationDialog) {
        this.organizationDialog = false
        this.coursedetail.organizationName = row.organizationName
        this.coursedetail.organizationId = row.organizationId
      }
    },
    handleNodeClick(data) {
      this.typeDialog = false
      this.coursedetail.coursewareTypeId = data.coursewareTypeId
      this.coursedetail.coursewareTypeName = data.coursewareTypeName

      // console.log(this.coursedetail.coursecoursewareTypeId)
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

<style scoped>
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
