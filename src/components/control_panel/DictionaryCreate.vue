<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dictionarylist' }"
        >数据字典</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/dictionaryedit' }"
        >编辑数据字典</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑功能</el-col>
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
                :model="dictionaryDetail"
                :rules="rules"
                ref="dictionaryDetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典名称" prop="dictName">
                      <el-input v-model="dictionaryDetail.dictName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典状态" prop="stutes">
                      <el-radio-group v-model="dictionaryDetail.stutes">
                        <el-radio label="1">启用</el-radio>
                        <el-radio label="0">禁用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典描述" prop="dictDescription">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="dictionaryDetail.dictDescription"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24" style="text-align: center;">
                    <el-button
                      type="primary"
                      @click="submitCreation('dictionaryDetail')"
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
      dictionaryDetail: {
        dictName: '',
        dictDescription: '',
        stutes: '1'
      },
      rules: {
        dictName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        stutes: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.dictionaryDetail.dictTypeId = this.$route.query.parent
  },
  methods: {
    submitCreation(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            '/manager/dict/add',
            this.dictionaryDetail
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
