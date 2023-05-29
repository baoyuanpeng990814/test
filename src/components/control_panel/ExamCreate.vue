<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/examlist' }"
        >考试管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/examcreate' }"
        >添加考次</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">添加考次</el-col>
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
                :model="examDetail"
                :rules="examDetailRules"
                ref="examDetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="封面" prop="examCoverUrl">
                      <el-input v-model="examDetail.examCoverUrl"></el-input>
                      <el-upload
                        :on-success="handleAvatarSuccess"
                        class=" mt15 avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                      >
                        <img
                          v-if="examDetail.examCoverUrl"
                          :src="examDetail.examCoverUrl"
                          class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="编号" prop="examCode">
                      <el-input v-model="examDetail.examCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属分类" prop="examSortId">
                      <el-input
                        v-model="twin.examSortName"
                        @focus="showOd2 = true"
                        :readonly="true"
                      ></el-input>
                      <!-- <el-input v-model="examDetail.examSortId"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--  <el-form-item label="所属机构" prop="organizationId">
                      <el-input v-model="twin.organizationName" @focus="showOd=true" :readonly="true"></el-input>
                    </el-form-item>

                    -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="成绩公布" prop="achievementType">
                      <el-radio v-model="examDetail.achievementType" label="1"
                        >考试结束后</el-radio
                      >
                      <el-radio v-model="examDetail.achievementType" label="2"
                        >指导时间</el-radio
                      >
                      <el-radio v-model="examDetail.achievementType" label="3"
                        >不公示</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="归档状态" prop="examFile">
                      <el-radio v-model="examDetail.examFile" label="0"
                        >自动归档</el-radio
                      >
                      <el-radio v-model="examDetail.examFile" label="1"
                        >手动归档</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="次数限制" prop="examFrequency">
                      <el-input-number
                        v-model="examDetail.examFrequency"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="考次名称" prop="examName">
                      <el-input v-model="examDetail.examName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="考试须知" prop="examNotice">
                      <quill-editor
                        ref="text"
                        v-model="examDetail.examNotice"
                        class="myQuillEditor"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="试卷首语" prop="examPrologue">
                      <quill-editor
                        ref="text"
                        v-model="examDetail.examPrologue"
                        class="myQuillEditor"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="交卷限制" prop="examSubmit">
                      <el-input-number
                        v-model="examDetail.examSubmit"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="失效时间" prop="failureTime">
                      <el-date-picker
                        v-model="examDetail.failureTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="失效时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="考生查看详情" prop="isExaminee">
                      <el-radio v-model="examDetail.isExaminee" label="0"
                        >不允许</el-radio
                      >
                      <el-radio v-model="examDetail.isExaminee" label="1"
                        >允许</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <div @mousedown="orgTarget = false">
                    <el-col :span="24">
                      <el-form-item label="主办单位" prop="organizationId">
                        <el-input
                          v-model="twin.organizationName"
                          @focus="showOd = true"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布状态" prop="releaseState">
                      <el-radio v-model="examDetail.releaseState" label="0"
                        >未发布</el-radio
                      >
                      <el-radio v-model="examDetail.releaseState" label="1"
                        >已发布</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="计时方式" prop="timingType">
                      <el-radio v-model="examDetail.timingType" label="1"
                        >答题时间</el-radio
                      >
                      <el-radio v-model="examDetail.timingType" label="2"
                        >开始考试时间交卷时间</el-radio
                      >
                      <el-radio v-model="examDetail.timingType" label="3"
                        >按题计时</el-radio
                      >
                      <el-radio v-model="examDetail.timingType" label="4"
                        >不计时</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row v-if="examDetail.timingType == 1">
                  <el-col :span="24">
                    <el-form-item label="考试时长" prop="timingStartTime">
                      <el-input-number
                        :controls="false"
                        :min="0"
                        v-model="examDetail.timingStartTime"
                      >
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row v-if="examDetail.timingType == 2">
                  <el-col :span="12">
                    <el-form-item label="开始时间" prop="timingStartTime">
                      <el-date-picker
                        v-model="examDetail.timingStartTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="结束时间" prop="timingEndTime">
                      <el-date-picker
                        v-model="examDetail.timingEndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类" prop="type">
                      <el-radio v-model="examDetail.type" label="1"
                        >考试</el-radio
                      >
                      <el-radio v-model="examDetail.type" label="2"
                        >模拟</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-switch
                    v-model="userTarget"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="指定发布对象"
                    inactive-text="默认"
                  >
                  </el-switch>
                </el-row>

                <!-- 当是专题培训的时候选择发布对象-->
                <div v-show="userTarget">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="发布对象分类" prop="lExamTarget">
                        <el-radio v-model="lExamTarget.examTargetType" label="0"
                          >机构</el-radio
                        >
                        <el-radio v-model="lExamTarget.examTargetType" label="1"
                          >分组</el-radio
                        >
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- 当发布对象类型是0是弹出发布对象的接口-->
                  <el-row v-show="lExamTarget.examTargetType == '0'">
                    <el-col :span="24">
                      <div @mousedown="orgTarget = true">
                        <el-form-item label="发布机构对象" prop="lExamTarget">
                          <el-input
                            v-model="twin.courseCompanyName"
                            @focus="showOd = true"
                            suffix-icon="el-icon-search"
                            :readonly="true"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- -->
                  <el-row v-show="lExamTarget.examTargetType == '1'">
                    <el-col :span="24">
                      <div>
                        <el-form-item label="发布分组对象" prop="groupingId">
                          <el-input
                            v-model="twin.groupingName"
                            @focus="showOd3 = true"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <el-row>
                  <el-col style="text-align: center;">
                    <el-button type="primary" @click="addExamFn('examDetail')"
                      >提交</el-button
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
      :show="showOd"
      @choose="getOd"
      @turnOff="e => (showOd = e)"
    ></OrganizationPanel>
    <ExamTypePanel
      :show="showOd2"
      @choose="getOd2"
      @turnOff="e => (showOd2 = e)"
    ></ExamTypePanel>
    <!-- 分组筛选列表-->
    <GroupPanel
      :show="showOd3"
      @choose="getOd3"
      @turnOff="e => (showOd3 = e)"
    ></GroupPanel>
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
import ExamTypePanel from '../panel/ExamTypePanel.vue'
import GroupPanel from '../panel/GroupPanel.vue'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    OrganizationPanel,
    ExamTypePanel,
    GroupPanel
  },
  data() {
    return {
      userTarget: false,
      showOd: false, //  组织结构弹窗
      showOd2: false, // 考试分类接口弹窗
      showOd3: false, // 分组结构弹窗

      twin: {
        organizationName: '',
        examSortName: ''
      },
      orgTarget: false,
      lExamTarget: {
        examTargetType: '',
        examTarget: ''
      },
      examDetail: {
        achievementType: '1',
        examCode: '',
        examCoverUrl: '',
        examFile: '1',
        examFrequency: 1,
        examName: '',
        examNotice: '',
        examPrologue: '',
        examSortId: 0,
        examSubmit: 1,
        failureTime: '',
        isExaminee: '0',
        organizationId: 2,
        releaseState: '1',
        timingType: '1',
        type: '1'
      },
      examDetailRules: {
        examCode: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        examCoverUrl: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        examFile: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        examFrequency: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        examName: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        examNotice: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        examPrologue: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        examSubmit: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        failureTime: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        isExaminee: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        organizationId: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        releaseState: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        timingType: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      },
      uploadUrl: this.$serverURL + 'common/uploadCover'
    }
  },
  created() {
    this.examDetail.examSortId = this.$route.query.parent
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.examDetail.examCoverUrl = res.url
    },
    /* 组织选择*/
    getOd(val) {
      /* orgTarget判断当前是否是发布对象调用*/
      if (this.orgTarget) {
        this.lExamTarget.examTarget = val.organizationId
        this.twin.courseCompanyName = val.organizationName
      } else {
        this.examDetail.organizationId = val.organizationId
        this.twin.organizationName = val.organizationName
      }
      /* this.examDetail.organizationId = val.organizationId
        this.twin.organizationName = val.organizationName */
    },
    getOd2(val) {
      this.examDetail.examSortId = val.examSortId
      this.twin.examSortName = val.examSortName
    },
    getOd3(val) {
      this.lExamTarget.examTarget = val.groupingId.toString()
      this.twin.groupingName = val.groupingName
    },
    addExamFn(formName) {
      /* 判断是否是指定发布，如果是把发布对象填充到examDetail里面*/
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.userTarget) {
            this.examDetail.lExamTarget = this.lExamTarget
          }
          const { data: res } = await this.$http.post(
            '/manager/exam/add',
            this.examDetail
          )
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('创建成功')
            this.examDetail.examId = res.data
            this.$router.push({
              path: '/examedit',
              query: {
                row: this.examDetail,
                twin: this.twin,
                c: true
              }
            })

            //this.$router.go(-1)
          }
        } else {
          return false
        }
      })
    }
  },
  filters: {
    transformDate: function(date) {
      return date.split('T')[0]
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
