<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/coursetypelist' }"
        >课件分类管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/coursetypeedit' }"
        >编辑课件分类</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑课件分类</el-col>
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
                :model="typedetail"
                :rules="rules"
                ref="typedetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类名称" prop="coursewareTypeName">
                      <el-input
                        v-model="typedetail.coursewareTypeName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="描述" prop="description">
                      <el-input
                        type="textarea"
                        :rows="5"
                        v-model="typedetail.description"
                      ></el-input>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      typedetail: {},
      rules: {
        menuName: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        state: [
          {
            required: true,
            message: '状态不能为空',
            trigger: 'blur'
          }
        ],
        seq: [
          {
            required: true,
            message: '排序不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.typedetail = this.$route.query.row
  },
  methods: {
    modifyDetail() {
      this.modifyfunction()
    },
    async modifyfunction() {
      const { data: res } = await this.$http.post(
        '/manager/ctyp/edit',
        this.typedetail
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
