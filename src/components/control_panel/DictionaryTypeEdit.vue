<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dictionarytypelist' }"
        >数据字典类型</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/dictionarytypeedit' }"
        >编辑数据字典类型</el-breadcrumb-item
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
                :model="dictionartypedetail"
                :rules="rules"
                ref="dictionartypedetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典类型名称" prop="dictTypeName">
                      <el-input
                        v-model="dictionartypedetail.dictTypeName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典类型状态" prop="dictTypeState">
                      <el-radio
                        v-model="dictionartypedetail.dictTypeState"
                        label="1"
                        >启用</el-radio
                      >
                      <el-radio
                        v-model="dictionartypedetail.dictTypeState"
                        label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      label="字典类型描述"
                      prop="dictTypeDescription"
                    >
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="dictionartypedetail.dictTypeDescription"
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
      dictionartypedetail: {},
      rules: {
        dictTypeName: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        dictTypeDescription: [
          {
            required: true,
            message: '描述不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.dictionartypedetail = this.$route.query.row
  },
  methods: {
    modifyDetail() {
      this.modifyfunction()
    },
    async modifyfunction() {
      const { data: res } = await this.$http.post(
        '/manager/dtyp/edit',
        this.dictionartypedetail
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
