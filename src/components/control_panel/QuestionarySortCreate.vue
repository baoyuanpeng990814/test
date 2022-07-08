<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/questionarylist' }">问卷调查</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/questionarysortedit' }">添加问卷分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">添加分类</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form :model="datadetail" :rules="rules" ref="datadetail" label-width="100px"
                class="demo-ruleForm login_form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类名称" prop="examineSortName">
                      <el-input v-model="datadetail.examineSortName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="状态" prop="state">
                      <el-radio v-model="datadetail.state" label="1">启用</el-radio>
                      <el-radio v-model="datadetail.state" label="0">禁用</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreation">提交</el-button>
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
        showOd: false,
        twin: { organizationName: '' },
        datadetail: {
          examSortName: '',
          description: '',
          organizationId: 2,
          state: '1',
          parentNode: 0
        },
        rules: {
          examSortName: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      if (this.$route.query.parent == null) {
        this.datadetail.parentNode = 0
      } else {
        this.datadetail.parentNode = this.$route.query.parent
      }
    },
    methods: {
      async submitCreation() {
        const {
          data: res
        } = await this.$http.post('/manager/examineSort/add', this.datadetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.$message.success('创建成功')
          this.$router.go(-1)
        }
      }
    },
    filters: {
      truncateDate: function(date) {
        return date.split('T')[0]
      }
    }
  }
</script>

<style>

</style>
