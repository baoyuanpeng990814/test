<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/grouptreelist' }"
        >群组管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>创建群组</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建群组树</el-col>
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
                :model="groupDetail"
                :rules="rules"
                ref="groupDetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <!-- 班级名称 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="班级名称" prop="groupingName">
                      <el-input v-model="groupDetail.groupingName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 所属班级 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属班级" prop="parentNode">
                      <el-input
                        v-model.trim="groupData.groupingName"
                        @focus="showGroupDialogFn()"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 班级管理详情 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="班级管理详情" prop="groupingExplain">
                      <el-input
                        type="textarea"
                        v-model="groupDetail.groupingExplain"
                        placeholder="请输入班级管理详情"
                        :rows="4"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" style="text-align: center;">
                    <el-button
                      type="primary"
                      @click="createCarouselFn('groupDetail')"
                      >新增</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>
    <GroupPanel
      :show="showGroupDialog"
      :treeData="groupTreeData"
      :groupData="defaultGroupData"
      @turnOff="e => (showGroupDialog = e)"
      @choose="chooseGroupFn"
    ></GroupPanel>
  </div>
</template>
<script>
import GroupPanel from '../group/GroupPanel.vue'
export default {
  components: {
    GroupPanel
  },
  data() {
    return {
      showGroupDialog: false, // 控制群组面板
      groupData: { groupingName: '' },
      groupTreeData: [], // 班级树
      defaultGroupData: {}, // 默认班级树属性
      groupDetail: {
        groupingExplain: '',
        groupingName: '', // 标题
        parentNode: '' // 所属班级
      },

      rules: {
        groupingName: [
          {
            required: true,
            message: '群组名不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.groupTreeData = this.$route.query.groupData
    this.defaultGroupData = this.$route.query.defaultGroupProps
  },
  methods: {
    chooseGroupFn(e) {
      this.groupDetail.parentNode = e.groupingId
      this.groupData.groupingName = e.groupingName
    },
    showGroupDialogFn() {
      this.showGroupDialog = true
    },
    createCarouselFn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            '/manager/grouping/add',
            this.groupDetail
          )
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('添加成功')
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
