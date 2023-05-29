<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/organizationlist' }"
        >机构管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/organizationcreate' }"
        >创建机构</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建机构</el-col>
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
                :model="orgForm"
                :rules="orgFormRules"
                ref="orgFormRef"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <!--<el-row>
              <el-col :span="24">
                <el-form-item label="机构编码" prop="organizationCode">
                  <el-input v-model="orgForm.organizationCode"></el-input>
                </el-form-item>
              </el-col>
          
            </el-row>-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="机构名称" prop="organizationName">
                      <el-input v-model="orgForm.organizationName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属机构" prop="parentNode">
                      <el-input
                        v-model.trim="orgData.organizationName"
                        @focus="showOrgDialog = true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="机构电话" prop="organizationPhone">
                      <el-input v-model="orgForm.organizationPhone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="机构简介" prop="description">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="orgForm.description"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="机构状态" prop="organizationType">
                      <el-radio v-model="orgForm.organizationType" label="1"
                        >启用</el-radio
                      >
                      <el-radio v-model="orgForm.organizationType" label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col style="text-align: center;">
                    <el-button
                      type="primary"
                      @click="organizationAddFn('orgFormRef')"
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
      :show="showOrgDialog"
      @turnOff="e => (showOrgDialog = e)"
      @choose="chooseOrganization"
    ></OrganizationPanel>
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
export default {
  components: {
    OrganizationPanel
  },
  data() {
    return {
      edit: false,
      orgForm: {
        organizationCode: '',
        organizationName: '',
        organizatiomPhone: '',
        discreption: '',
        organizationType: '1',
        parentNode: ''
      },
      showOrgDialog: false, // 弹出机构组件面板
      orgData: {
        organizationName: ''
      },
      orgTableData: [],
      orgFormRules: {
        /* organizationCode: [{
            required: true,
            message: '机构编码不能为空',
            trigger: 'blur'
          }], */
        organizationName: [
          {
            required: true,
            message: '机构名不能为空',
            trigger: 'blur'
          }
        ],
        organizationPhone: [
          {
            pattern: /^-?\d+\.?\d*$/,
            message: '电话号不正确',
            trigger: 'blur'
          },
          {
            required: true,
            message: '机构电话不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.orgForm.parentNode = this.$route.query.parent
    if (this.$route.query.edit === true) {
      this.orgForm = this.$route.query.row
      this.orgTableData = this.$route.query.orgTableData
      this.edit = this.$route.query.edit
      this.orgTableData.forEach(item => {
        console.log(item, this.orgForm.parentNode, '342')
        if (item.organizationId === this.orgForm.parentNode) {
          this.orgData.organizationName = item.organizationName
        }
      })
    }
  },
  methods: {
    chooseOrganization(e) {
      this.orgForm.parentNode = e.organizationId
      this.orgData.organizationName = e.organizationName
    },
    // 提交按钮
    organizationAddFn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let str = ''
          if (this.edit === true) {
            str = '/manager/org/edit'
          } else {
            str = '/manager/org/add'
          }
          const { data: res } = await this.$http.post(str, this.orgForm)
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('创建成功')
            this.$router.push({
              path: 'organizationlist'
            })
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
