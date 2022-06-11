<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userlist' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/userdetail' }">用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">查看用户</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="detail_lines">
          <el-container>
            <el-main>
              <el-row>
                <el-col :span="4">
                  账号
                </el-col>
                <el-col :span="20">
                  {{userdetail.userName}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  姓名
                </el-col>
                <el-col :span="20">
                  {{userdetail.name}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  性别
                </el-col>
                <el-col :span="20">
                  {{userdetail.sex}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  出生日
                </el-col>
                <el-col :span="20">
                  {{userdetail.birthTime|truncateDate}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  入职时间
                </el-col>
                <el-col :span="20">
                  {{userdetail.entryTime |truncateDate}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  证件号
                </el-col>
                <el-col :span="20">
                  {{userdetail.cardId}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  手机号
                </el-col>
                <el-col :span="20">
                  {{userdetail.mobile}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  邮箱
                </el-col>
                <el-col :span="20">
                  {{userdetail.email}}
                </el-col>
              </el-row>

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
        userdetail: {}
      }
    },
    created() {
      this.userdetail = this.$route.query.row
    },
    filters: {
      truncateDate: function(date) {
        if (date != null) {
          return date.split('T')[0]
        }

      }
    }
  }
</script>

<style>

</style>
