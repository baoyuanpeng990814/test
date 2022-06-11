<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/organizationlist' }">组织机构</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/organizationedit' }">编辑机构</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑机构</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
          <el-form :model="organizationdetail" :rules="rules" ref="organizationdetail" label-width="100px"
            class="demo-ruleForm login_form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="机构编码" prop="organizationCode">
                  <el-input v-model="organizationdetail.organizationCode"></el-input>
                </el-form-item>
              </el-col>
          
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="机构名称" prop="organizationName">
                  <el-input v-model="organizationdetail.organizationName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="机构电话" prop="organizationPhone">
                  <el-input v-model="organizationdetail.organizationPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="机构简介" prop="description">
                  <el-input type="textarea" :rows="4" v-model="organizationdetail.description"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="机构状态" prop="organizationType">
                  <el-radio v-model="organizationdetail.organizationType" label="1">启用</el-radio>
                  <el-radio v-model="organizationdetail.organizationType" label="0">禁用</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          
            <el-row>
              <el-col :span="20" :offset="4">
                <el-button type="primary" @click="modifyDetail()">修改</el-button>
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
        organizationdetail: {},
        rules: {
          organizationCode: [{
            required: true,
            message: '机构编码不能为空',
            trigger: 'blur'
          }],
          organizationName: [{
            required: true,
            message: '机构名不能为空',
            trigger: 'blur'
          }],
          organizationPhone: [{
            pattern: /^-?\d+\.?\d*$/,
            message: "电话号不正确",
            trigger: 'blur'
          }, {
            required: true,
            message: '机构电话不能为空',
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.organizationdetail = this.$route.query.row
    },
    methods: {
      modifyDetail() {
        this.modifyorganization()
      },
      async modifyorganization() {
        const {
          data: res
        } = await this.$http.post("/manager/org/edit", this.organizationdetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {

          this.$message.success('修改成功')
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
