<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/questioncategorylist' }"
        >试题分类</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/questioncategorycreate' }"
        >创建分类</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建题型</el-col>
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
                :model="quesCateForm"
                :rules="quesCateFormRules"
                ref="questionRef"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类名称" prop="questionsSortName">
                      <el-input
                        v-model="quesCateForm.questionsSortName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属机构" prop="organizationId">
                      <el-input
                        @focus="showOP = true"
                        v-model="quesCateForm.organizationId"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属题库" prop="parentNode">
                      <el-input
                        @focus="showQCP = true"
                        v-model="quesCateData.questionsSortName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="简介" prop="description">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="quesCateForm.description"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="状态" prop="state">
                      <el-radio v-model="quesCateForm.state" label="1"
                        >启用</el-radio
                      >
                      <el-radio v-model="quesCateForm.state" label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col style="text-align: center;">
                    <el-button
                      type="primary"
                      @click="submitCreatedFn('questionRef')"
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
      :show="showOP"
      @choose="e => (quesCateForm.organizationId = e.organizationId)"
      @turnOff="opSwitch"
    >
    </OrganizationPanel>
    <QuestionCategoryPanel
      :show="showQCP"
      :treeData="quesCateTreeData"
      @turnOff="e => (showQCP = e)"
      @choose="chooseQuesCateFn"
    >
    </QuestionCategoryPanel>
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
import QuestionCategoryPanel from '../control_panel/QuestionCategoryPanel.vue'
export default {
  components: {
    OrganizationPanel,
    QuestionCategoryPanel
  },
  data() {
    return {
      showOP: false,
      showQCP: false,
      quesCateTreeData: [],
      quesCateForm: {
        questionsSortName: '',
        organizationId: '',
        description: '',
        state: '1',
        parentNode: ''
      },
      quesCateData: {
        questionsSortName: ''
      },
      quesCateFormRules: {
        questionsSortName: [
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
        description: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.quesCateTreeData = this.$route.query.quesCateTreeData
  },
  methods: {
    chooseQuesCateFn(e) {
      this.quesCateForm.parentNode = e.questionsSortId
      this.quesCateData.questionsSortName = e.questionsSortName
    },
    opSwitch(val) {
      this.showOP = val
    },
    submitCreatedFn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            '/manager/qsort/add',
            this.quesCateForm
          )
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('创建成功')
            this.$router.go(-1)
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

<style></style>
