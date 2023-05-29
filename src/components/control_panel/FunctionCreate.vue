<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/functionlist' }"
        >功能菜单</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/functioncreate' }"
        >创建功能</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建功能</el-col>
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
                :model="functiondetail"
                :rules="rules"
                ref="functiondetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="菜单名称" prop="menuName">
                      <el-input v-model="functiondetail.menuName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="URL" prop="fireUrl">
                      <el-input v-model="functiondetail.fireUrl"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="菜单排序" prop="seq">
                      <el-input-number
                        v-model="functiondetail.seq"
                        :min="1"
                        :max="1000"
                        label="菜单排序"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="机构状态" prop="state">
                      <el-radio v-model="functiondetail.state" :label="1"
                        >启用</el-radio
                      >
                      <el-radio v-model="functiondetail.state" :label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreation"
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
      functiondetail: {
        menuName: '',
        parentId: '',
        fireUrl: '',
        state: 1,
        seq: '1'
      },
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
    this.functiondetail.parentId = this.$route.query.parent
  },
  methods: {
    async submitCreation() {
      const { data: res } = await this.$http.post(
        '/manager/item/add',
        this.functiondetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('创建成功')
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
