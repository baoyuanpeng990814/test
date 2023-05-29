<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/grouptreelist' }"
        >群组管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>编辑群组</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑群组</el-col>
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
                :model="groupTreeDetail"
                :rules="rules"
                ref="groupTreeDetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="班级名称" prop="groupingName">
                      <el-input
                        v-model="groupTreeDetail.groupingName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
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
                        v-model="groupTreeDetail.groupingExplain"
                        :rows="4"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" style="text-align: center;">
                    <el-button
                      type="primary"
                      @click="updateCarouselFn('groupTreeDetail')"
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
      groupTreeDetail: {
        groupingExplain: '', // 班级管理详情
        groupingName: '', // 班级名称
        parentNode: '' // 所属班级
      },
      groupTreeData: [], // 班级树
      defaultGroupData: {}, // 默认班级树属性
      showGroupDialog: false,
      groupData: { groupingName: '' },
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
    this.groupTreeDetail = this.$route.query.row
    this.groupTreeData = this.$route.query.groupData
    // 父节点名字
    this.groupTreeData.forEach(item => {
      if (item.groupingId === this.groupTreeDetail.parentNode) {
        this.groupData.groupingName = item.groupingName
      }
    })
    this.defaultGroupData = this.$route.query.defaultGroupProps
  },
  methods: {
    // 修改班组方法
    updateCarouselFn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post(
            '/manager/grouping/edit',
            this.groupTreeDetail
          )
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('班组修改成功')
            this.$router.go(-1)
          }
        } else {
          return false
        }
      })
    },
    // 群组面板展开
    showGroupDialogFn() {
      this.showGroupDialog = true
    },
    chooseGroupFn(e) {
      this.groupTreeDetail.parentNode = e.groupingId
      this.groupData.groupingName = e.groupingName
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
