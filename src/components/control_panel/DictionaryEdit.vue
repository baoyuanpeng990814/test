<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dictionarylist' }"
        >数据字典</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/dictionaryedit' }"
        >编辑数据字典</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑功能</el-col>
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
                :model="dictionarydetail"
                :rules="rules"
                ref="dictionarydetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典名称" prop="dictName">
                      <el-input v-model="dictionarydetail.dictName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典状态" prop="stutes">
                      <el-radio v-model="dictionarydetail.stutes" label="1"
                        >启用</el-radio
                      >
                      <el-radio v-model="dictionarydetail.stutes" label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典描述" prop="dictDescription">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="dictionarydetail.dictDescription"
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
      dictionarydetail: {},
      rules: {
        dictName: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.dictionarydetail = this.$route.query.row
  },
  methods: {
    modifyDetail() {
      this.modifyfunction()
    },
    async modifyfunction() {
      const { data: res } = await this.$http.post(
        '/manager/dict/edit',
        this.dictionarydetail
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
