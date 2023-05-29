<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/rolelist' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/rolecreate' }">创建角色</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建角色</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
          <el-form :model="roledetail" :rules="rules" ref="roledetail" label-width="100px"
            class="demo-ruleForm login_form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="roledetail.roleName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="treedata_role">
                <el-tree :default-expand-all="true"  all="true" :data="treedata" :props="defaultProps" :default-checked-keys="rights" ref="rightsTree"
                  :current-node-key="currentRights" node-key="menuId" show-checkbox @check-change="handleCheckChange">
                </el-tree>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="排序" prop="seq">
                  <el-input-number v-model="roledetail.seq" :min="1" :max="1000" label="菜单排序"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="状态" prop="state">
                  <el-radio v-model="roledetail.state" :label="1">启用</el-radio>
                  <el-radio v-model="roledetail.state" :label="0">禁用</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述" prop="roleDescription">
                  <el-input type="textarea" rows="5" v-model="roledetail.roleDescription"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

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
        rights: [],
        currentRights: '',
        defaultProps: {
          children: 'chilLItem',
          label: 'menuName'
        },
        treedata: [],
        roledetail: {
          roleName: '',
          state: 1,
          seq: 1,
          roleDescription: '',
          roleItem: ''
        },
        rules: {
          roleName: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }]

        }
      }
    },
    created() {
      this.getFunctionTree()
    },
    methods: {
      async submitCreation() {
        const {
          data: res
        } = await this.$http.post('/manager/role/add', this.roledetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.$message.success('创建成功')
          this.$router.go(-1)
        }
      },
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
        var res = this.$refs.rightsTree.getCheckedNodes()
        this.rights = res

        var rawRights = ''
        for (var i = 0; i < this.rights.length; i++) {
          rawRights += this.rights[i].menuId + ','
        }
        this.roledetail.roleItem = rawRights
      },

      async getFunctionTree() {
        const {
          data: res
        } = await this.$http.post('/manager/item/tree')
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.treedata = res.data

          var rawRights = this.roledetail.roleItem.split(',')
          for (var i = 0; i < rawRights.length; i++) {
            this.rights.push(parseInt(rawRights[i]))
          }

          this.$refs.rightsTree.setCheckedKeys(this.rights)
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

<style>
  .treedata_role{
    padding-left: 115px;
  }
</style>
