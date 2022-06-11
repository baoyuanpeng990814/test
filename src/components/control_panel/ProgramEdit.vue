<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/programlist' }">课程分类</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/programedit' }"> 编辑课程分类</el-breadcrumb-item>
    </el-breadcrumb>



    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑课程分类</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
          <el-form :model="programdetail" :rules="rules" ref="programdetail" label-width="100px"
            class="demo-ruleForm login_form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="分类名称" prop="courseSortName">
                  <el-input v-model="programdetail.courseSortName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="简介" prop="description">
                  <el-input type="textarea" :rows="4" v-model="programdetail.description"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>
              <el-col :span="24">
                <el-form-item label="分类状态" prop="stutes">
                  <el-radio v-model="programdetail.stutes" label="1">启用</el-radio>
                  <el-radio v-model="programdetail.stutes" label="0">禁用</el-radio>
                </el-form-item>
              </el-col>
            </el-row>-->

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
        programdetail: {},
        rules: {
          courseSortName: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.programdetail = this.$route.query.row
      //console.log(this.programdetail)
    },
    methods: {
      modifyDetail() {
        this.modifyorganization()
      },
      async modifyorganization() {
        const {
          data: res
        } = await this.$http.post("/manager/csort/edit", this.programdetail)
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
