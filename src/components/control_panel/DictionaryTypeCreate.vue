<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dictionarytypelist' }"
        >数据字典类型</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/dictionarytypeedit' }"
        >创建数据字典类型</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建数据字典类型</el-col>
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
                :model="dicTypeDetailForm"
                :rules="dicTypeDetailRules"
                ref="dicTypeDetailFormRef"
                label-width="120px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典类型名称" prop="dictTypeName">
                      <el-input
                        v-model.trim="dicTypeDetailForm.dictTypeName"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="字典类型状态" prop="dictTypeState">
                      <el-radio
                        v-model="dicTypeDetailForm.dictTypeState"
                        label="1"
                        >启用</el-radio
                      >
                      <el-radio
                        v-model="dicTypeDetailForm.dictTypeState"
                        label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="dicTypeData.dictTypeName !== 0">
                  <el-col :span="24">
                    <el-form-item label="字典类型分类" prop="parentNode">
                      <el-input
                        v-model.trim="dicTypeData.dictTypeName"
                        @focus="showDTP = true"
                      ></el-input>
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
                        v-model="dicTypeDetailForm.dictTypeDescription"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24" style="text-align: center;">
                    <el-button
                      type="primary"
                      @click="dicTypeCreateFn('dicTypeDetailFormRef')"
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
    <DictionaryTypePanel
      :show="showDTP"
      @turnOff="e => (showDTP = e)"
      :treeData="dicTypeTreeData"
      @choose="chooseDicTypeFn"
    ></DictionaryTypePanel>
  </div>
</template>

<script>
import DictionaryTypePanel from './DictionaryTypePanel.vue'
export default {
  components: {
    DictionaryTypePanel
  },
  data() {
    return {
      edit: false, // 分辩是添加还是编辑
      showDTP: false, // 父组件控制弹出字典类型面板
      dicTypeTreeData: [], // 字典类型树数据
      dicTypeDetailForm: {
        parentNode: '',
        dictTypeState: '1',
        dictTypeName: '',
        dictTypeDescription: ''
      },
      dicTypeData: {
        dictTypeName: ''
      },
      dicTypeDetailRules: {
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
    this.edit = this.$route.query.edit
    this.dicTypeTreeData = this.$route.query.dicTypeTreeData
    if (this.edit) {
      this.dicTypeDetailForm = this.$route.query.row
      this.dicTypeData.dictTypeName = this.dicTypeDetailForm.parentNode
      this.dicTypeTreeData.forEach(item => {
        if (item.dictTypeId === this.dicTypeDetailForm.parentNode) {
          this.dicTypeData.dictTypeName = item.dictTypeName
        }
      })
    }
  },
  methods: {
    // 点击子组件树
    chooseDicTypeFn(e) {
      this.dicTypeDetailForm.parentNode = e.dictTypeId
      this.dicTypeData.dictTypeName = e.dictTypeName
    },
    // 提交按钮
    dicTypeCreateFn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let str = ''
          if (this.edit) {
            str = '/manager/dtyp/edit'
          } else {
            str = '/manager/dtyp/add'
          }
          const { data: res } = await this.$http.post(
            str,
            this.dicTypeDetailForm
          )
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('提交成功')
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
