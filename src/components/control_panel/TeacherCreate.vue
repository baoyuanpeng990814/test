<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacherlist' }"
        >讲师管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/teachercreate' }"
        >编辑讲师</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑讲师</el-col>
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
                :model="teacherdetail"
                :rules="rules"
                ref="teacherdetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="主讲人姓名" prop="teacherName">
                      <el-input v-model="teacherdetail.teacherName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="主讲人分类" prop="teacherType">
                      <el-radio v-model="teacherdetail.teacherType" label="1"
                        >内部</el-radio
                      >
                      <el-radio v-model="teacherdetail.teacherType" label="2"
                        >外部</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="性别" prop="teacherSex">
                      <el-radio v-model="teacherdetail.teacherSex" label="1"
                        >男</el-radio
                      >
                      <el-radio v-model="teacherdetail.teacherSex" label="2"
                        >女</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="工作单位" prop="teacherCompany">
                      <el-input
                        v-model="teacherdetail.teacherCompany"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="专业" prop="teacherMajor">
                      <el-input v-model="teacherdetail.teacherMajor"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="职称" prop="teacherTitle">
                      <el-input v-model="teacherdetail.teacherTitle"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="职务" prop="teacherJob">
                      <el-input v-model="teacherdetail.teacherJob"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="手机号" prop="teacherMobile">
                      <el-input
                        v-model="teacherdetail.teacherMobile"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="	邮箱" prop="teacherEmail">
                      <el-input v-model="teacherdetail.teacherEmail"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="出生日" prop="teacherBirthTime">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        type="date"
                        v-model="teacherdetail.teacherBirthTime"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="地址" prop="teacherAddress">
                      <el-input
                        v-model="teacherdetail.teacherAddress"
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
                        v-model="teacherdetail.description"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="状态" prop="stutes">
                      <el-radio v-model="teacherdetail.stutes" label="1"
                        >启用</el-radio
                      >
                      <el-radio v-model="teacherdetail.stutes" label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreationReady()"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacherdetail: {
        teacherName: '',
        teacherType: '1',
        teacherSex: '1',
        teacherCompany: '',
        teacherMajor: '',
        teacherTitle: '',
        teacherJob: '',
        teacherMobile: '',
        teacherEmail: '',
        teacherBirthTime: '',
        teacherAddress: '',
        description: '',
        stutes: '1'
      },
      rules: {
        teacherName: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }
        ],
        teacherTitle: [
          {
            required: true,
            message: '职称不能为空',
            trigger: 'blur'
          }
        ],
        teacherMobile: [
          {
            pattern: /^-?\d+\.?\d*$/,
            message: '手机号不正确',
            trigger: 'blur'
          },
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '手机号长度不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    submitCreationReady() {
      console.log(this.teacherdetail.teacherBirthTime)
      // this.teacherdetail.teacherBirthTime = this.teacherdetail.teacherBirthTime.split('T')[0]
      this.submitCreation()
    },
    async submitCreation() {
      const { data: res } = await this.$http.post(
        '/manager/teacher/add',
        this.teacherdetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('创建成功')
        this.$router.go(-1)
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

<style></style>
