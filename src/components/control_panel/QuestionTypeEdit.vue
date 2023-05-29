<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/questiontypelist' }"
        >题型管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/questiontypeedit' }"
        >编辑题型</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">修改题型</el-col>
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
                :model="datadetail"
                :rules="rules"
                ref="datadetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="题型名称" prop="questionsTypeName">
                      <el-input
                        v-model="datadetail.questionsTypeName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="排序" prop="questionsTypeSeq">
                      <el-input-number
                        v-model="datadetail.questionsTypeSeq"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分数" prop="questionsTypeFraction">
                      <el-input-number
                        v-model="datadetail.questionsTypeFraction"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="简介" prop="description">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="datadetail.description"
                      ></el-input>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      datadetail: {},
      rules: {
        questionsTypeName: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        questionsTypeSeq: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        questionsTypeFraction: [
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
    this.datadetail = this.$route.query.row
  },
  methods: {
    async submitCreation() {
      const { data: res } = await this.$http.post(
        '/manager/qtyp/edit',
        this.datadetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('修改成功')
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
