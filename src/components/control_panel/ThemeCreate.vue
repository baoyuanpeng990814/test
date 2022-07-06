<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/themelist' }">学习主题</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/themecreate' }">创建主题</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建主题</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
          <el-form :model="themedetail" :rules="rules" ref="themedetail" label-width="100px"
            class="demo-ruleForm login_form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="主题名称" prop="themeName">
                  <el-input v-model="themedetail.themeName"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">

                <el-form-item label="说明" prop="description">
                  <el-input type="textarea" :rows="4" v-model="themedetail.description"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">

                <el-form-item label="状态" prop="themeState">
                  <el-radio v-model="themedetail.themeState" label="1">启用</el-radio>
                  <el-radio v-model="themedetail.themeState" label="0">禁用</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <!--  机构    -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="组织机构" prop="createOrg">
                  <el-input v-model="themedetail.createOrg" @focus="organizationDialog=true"
                    suffix-icon="el-icon-search" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-dialog title="组织机构" :visible.sync="organizationDialog" class="protrusion">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <el-row>
                    <el-col :span="3">机构名称</el-col>
                    <el-col :span="6">
                      <el-input v-model="tq.organizationCode" placeholder="机构名称"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">机构编码</el-col>
                    <el-col :span="6">
                      <el-input v-model="tq.organizationName" placeholder="机构编码"></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="buttons">
                    <el-col :span="2" :offset="0">
                      <el-button icon="el-icon-search" @click="getThemeList" type="primary">查询</el-button>
                    </el-col>
                    <el-col :span="2" :offset="3">
                      <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>
                    </el-col>

                  </el-row>
                </div>
                <div>
                  <el-table :data="organizations">
                    <el-table-column property="organizationId" label="序号" width="50"></el-table-column>
                    <el-table-column property="organizationCode" label="机构编码" width="150"></el-table-column>
                    <el-table-column property="organizationName" label="机构名称" width="150"></el-table-column>

                    <el-table-column fixed="right" label="操作" width="50">
                      <template slot-scope="scope">
                        <el-button @click="choose(scope.row)" type="text" size="small">确定</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :page-sizes="[1, 2, 5, 8]" :page-size="drow" layout="total, prev, pager, next"
                    :total="dtotal">
                  </el-pagination>
                </div>
              </el-card>
            </el-dialog>
            <!--  机构    -->
            <el-row>
              <el-col :span="20" :offset="4">
                <el-button type="primary" @click="submitCreation()">提交</el-button>
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
        dpage: 1,
        drow: 5,
        dtotal: 0,
        organizationDialog: false,
        tq: {},
        organizations: [],
        themedetail: {
          themeName: '',
          parentNode: '0',
          themeState: '1',
          description: ''
        },
        rules: {
          themeName: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getThemeList()
      this.themedetail.parentNode = this.$route.query.parent
      console.log(this.themedetail.parentNode)
    },
    methods: {
      async submitCreation() {
        const {
          data: res
        } = await this.$http.post('/manager/theme/add', this.themedetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.$message.success('创建成功')
          this.$router.go(-1)
        }
      },
      async getThemeList() {
        var param = this.tq
        param.page = this.dpage
        param.rows = this.drow
        param.organizationId = 0
        const {
          data: res
        } = await this.$http.post('/manager/org/list', param)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.organizations = res.data
          this.dtotal = res.count
        }
      },
      reset() {
        this.tq = {}
        this.getThemeList()
      },
      choose(row) {
        if (this.organizationDialog) {
          this.organizationDialog = false
          this.themedetail.createOrg = row.organizationId
        }
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.drow = newSize
        if (this.theacherDialog) this.getTeacherList()
        // elseif (this.theacherDisalog) this.getTeacherList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.dpage = newPage
        if (this.theacherDialog) this.getTeacherList()
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
