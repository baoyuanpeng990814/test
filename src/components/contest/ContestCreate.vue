<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/contestlist' }"
        >竞赛考试管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/contestcreate' }"
        >竞赛添加考次</el-breadcrumb-item
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
                :model="dataDetail"
                :rules="rules"
                ref="dataDetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="封面" prop="competitionCover">
                      <el-input
                        v-model="dataDetail.competitionCover"
                      ></el-input>
                      <el-upload
                        :on-success="handleAvatarSuccess"
                        class=" mt15 avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                      >
                        <img
                          v-if="dataDetail.competitionCover"
                          :src="dataDetail.competitionCover"
                          class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="竞赛类型" prop="competitionType">
                      <el-radio v-model="dataDetail.competitionType" label="1"
                        >1理论</el-radio
                      >
                      <el-radio v-model="dataDetail.competitionType" label="2"
                        >2实操
                      </el-radio>
                      <el-radio v-model="dataDetail.competitionType" label="3"
                        >3理论+实操</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属分类" prop="competitionSort">
                      <el-input
                        v-model="twin.competitionSortName"
                        @focus="showOd2 = true"
                        :readonly="true"
                      ></el-input>
                      <!-- <el-input v-model="dataDetail.contestSortId"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 发布对象-->

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布对象分类" prop="competitionTarget">
                      <el-radio
                        v-model="competitionTarget.competitionTargetType"
                        label="0"
                        >机构</el-radio
                      >
                      <el-radio
                        v-model="competitionTarget.competitionTargetType"
                        label="1"
                        >分组</el-radio
                      >
                      <el-radio
                        v-model="competitionTarget.competitionTargetType"
                        label="2"
                        >用户</el-radio
                      >
                      <el-radio
                        v-model="competitionTarget.competitionTargetType"
                        label="3"
                        >职业</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 当发布对象类型是0是弹出发布对象的接口-->
                <el-row v-show="competitionTarget.competitionTargetType == '0'">
                  <el-col :span="24">
                    <div>
                      <el-form-item
                        label="发布机构对象"
                        prop="competitionTarget"
                      >
                        <el-input
                          v-model="twin.organizationName"
                          @focus="showOd = true"
                          suffix-icon="el-icon-search"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <!-- -->
                <el-row v-show="competitionTarget.competitionTargetType == '1'">
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

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分数定义" prop="fractionType">
                      <el-radio v-model="dataDetail.fractionType" label="1"
                        >1使用题库试题分数</el-radio
                      >
                      <el-radio v-model="dataDetail.fractionType" label="2"
                        >2指定题型分数</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="竞赛状态" prop="competitionState">
                      <el-radio v-model="dataDetail.competitionState" label="1"
                        >1答题阶段</el-radio
                      >
                      <el-radio v-model="dataDetail.competitionState" label="2"
                        >2实操阶段</el-radio
                      >
                      <el-radio v-model="dataDetail.competitionState" label="3"
                        >3专家评分阶段</el-radio
                      >
                      <el-radio v-model="dataDetail.competitionState" label="4"
                        >4结束</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="竞赛标题" prop="competitionName">
                      <el-input v-model="dataDetail.competitionName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="竞赛声明" prop="competitionExplain">
                      <quill-editor
                        ref="text"
                        v-model="dataDetail.competitionExplain"
                        class="myQuillEditor"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      label="参赛次数限制"
                      prop="competitionFrequency"
                    >
                      <el-input-number
                        v-model="dataDetail.competitionFrequency"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="离开页面次数" prop="leavePage">
                      <el-input-number
                        v-model="dataDetail.leavePage"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布状态" prop="releaseState">
                      <el-radio v-model="dataDetail.releaseState" label="0"
                        >未发布</el-radio
                      >
                      <el-radio v-model="dataDetail.releaseState" label="1"
                        >已发布</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布时间" prop="releaseTime">
                      <el-date-picker
                        v-model="dataDetail.releaseTime"
                        type="datetime"
                        placeholder="发布时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="出题方式" prop="assignTopic">
                      <el-radio v-model="dataDetail.assignTopic" label="1"
                        >固定试卷</el-radio
                      >
                      <el-radio v-model="dataDetail.assignTopic" label="2"
                        >随机试卷</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="答题开始时间" prop="timingStartTime">
                      <el-date-picker
                        v-model="dataDetail.timingStartTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="答题结束时间" prop="timingEndTime">
                      <el-date-picker
                        v-model="dataDetail.timingEndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="实操开始时间"
                      prop="operationStartTime"
                    >
                      <el-date-picker
                        v-model="dataDetail.operationStartTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="实操结束时间" prop="operationEndTime">
                      <el-date-picker
                        v-model="dataDetail.operationEndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="专家打分开始时间"
                      prop="expertStartTime"
                    >
                      <el-date-picker
                        v-model="dataDetail.expertStartTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="专家打分结束时间" prop="expertEndTime">
                      <el-date-picker
                        v-model="dataDetail.expertEndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreation"
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
    <ContestTypePanel
      :show="showOd2"
      @choose="getOd2"
      @turnOff="e => (showOd2 = e)"
    ></ContestTypePanel>
    <GroupPanel
      :show="showOd3"
      @choose="getOd3"
      @turnOff="e => (showOd3 = e)"
    ></GroupPanel>
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
import ContestTypePanel from '../panel/ContestTypePanel.vue'
import GroupPanel from '../panel/GroupPanel.vue'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    OrganizationPanel,
    ContestTypePanel,
    GroupPanel
  },
  data() {
    return {
      showOd: false,
      showOd2: false,
      showOd3: false, // 分组结构弹窗
      twin: {
        organizationName: '',
        competitionSortName: ''
      },
      competitionTarget: {
        competitionTargetType: '',
        competitionTarget: ''
      },
      dataDetail: {
        assignTopic: '', //出题方式 1固定试卷 2随机试卷
        competitionCover: '', //封面
        competitionExplain: '', //说明
        competitionFrequency: '', //参加次数限制
        competitionName: '', //竞赛标题
        competitionSort: '', //竞赛分类
        competitionState: '', //竞赛状态。1答题阶段，2实操阶段 3专家评分阶段 4结束
        competitionTarget: {
          competitionTarget: '', //发布对象
          competitionTargetType: '' //发布对象分类 0机构1分组2用户3职业
        },
        competitionType: '', //竞赛类型 1,理论 2 实操 3 理论+实操
        expertEndTime: '', //专家打分开始时间
        expertStartTime: '', //专家打分结束时间
        fractionType: '', //分数定义 1使用题库试题分数 2指定题型分数
        leavePage: '', //离开页面次数
        operationEndTime: '', //实操开始时间
        operationStartTime: '', //operation_end_time
        randomSeveral: 0, //随机几份试卷，默认为一份（固定试卷不用填）
        releaseState: '', //发布状态 0未发布1已发布
        releaseTime: '', //发布时间
        timingEndTime: '', //答题开始时间
        timingStartTime: '' //答题结束时间
      },
      rules: {
        assignTopic: [
          {
            required: true,
            message: '出题方式不能为空',
            trigger: 'blur'
          }
        ],
        competitionCover: [
          {
            required: true,
            message: '封面不能为空',
            trigger: 'blur'
          }
        ],
        competitionExplain: [
          {
            required: true,
            message: '说明不能为空',
            trigger: 'blur'
          }
        ],
        competitionFrequency: [
          {
            required: true,
            message: '参赛次数不能为空',
            trigger: 'blur'
          }
        ],
        competitionName: [
          {
            required: true,
            message: '竞赛名称不能为空',
            trigger: 'blur'
          }
        ],
        competitionSort: [
          {
            required: true,
            message: '竞赛分类不能为空',
            trigger: 'blur'
          }
        ],
        competitionState: [
          {
            required: true,
            message: '竞赛状态不能为空',
            trigger: 'blur'
          }
        ],
        competitionTarget: [
          {
            required: true,
            message: '发布对象不能为空',
            trigger: 'blur'
          }
        ],
        competitionType: [
          {
            required: true,
            message: '竞赛模式类型不能为空',
            trigger: 'blur'
          }
        ],
        fractionType: [
          {
            required: true,
            message: '分数定义不能为空',
            trigger: 'blur'
          }
        ],
        releaseTime: [
          {
            required: true,
            message: '发布时间不能为空',
            trigger: 'blur'
          }
        ],
        releaseState: [
          {
            required: true,
            message: '发布状态不能为空',
            trigger: 'blur'
          }
        ],
        leavePage: [
          {
            required: true,
            message: '离开次数不能为空',
            trigger: 'blur'
          }
        ]
      },
      uploadUrl: this.$serverURL + 'common/uploadCover'
    }
  },
  created() {},
  methods: {
    /* 封面路径显示*/
    handleAvatarSuccess(res, file) {
      this.dataDetail.competitionCover = res.url
    },

    getOd(val) {
      this.competitionTarget.competitionTarget = val.organizationId
      this.twin.organizationName = val.organizationName
    },

    getOd2(val) {
      this.dataDetail.competitionSort = val.competitionSortId
      this.twin.competitionSortName = val.competitionSortName
    },

    getOd3(val) {
      this.competitionTarget.competitionTarget = val.groupingId.toString()
      this.twin.groupingName = val.groupingName
    },
    async submitCreation() {
      this.dataDetail.competitionTarget = this.competitionTarget
      const { data: res } = await this.$http.post(
        '/manager/competition/add',
        this.dataDetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('创建成功')
        this.dataDetail.competitionId = res.data
        this.$router.push({
          path: '/contestedit',
          query: {
            row: this.dataDetail,
            twin: this.twin,
            c: true
          }
        })

        //this.$router.go(-1)
      }
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
