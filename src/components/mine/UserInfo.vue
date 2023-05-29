<template>
  <div>
    <el-form
      :model="datadetail"
      :rules="rules"
      ref="datadetail"
      label-width="100px"
      class="demo-ruleForm login_form"
    >
      <el-row>
        <el-col :span="20">
          <el-row>
            <el-col :span="12">
              <el-form-item label="账号" prop="userName">
                <el-input
                  :readonly="true"
                  v-model="datadetail.userName"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio v-model="datadetail.sex" :label="1">男</el-radio>
                <el-radio v-model="datadetail.sex" :label="2">女</el-radio>
              </el-form-item>
              <el-form-item label="身份证号" prop="cardId">
                <el-input
                  :readonly="datadetail.cardId != ''"
                  v-model="datadetail.cardId"
                ></el-input>
              </el-form-item>

              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="datadetail.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="datadetail.name"></el-input>
              </el-form-item>

              <el-form-item label="所属单位" prop="organizationName">
                <el-input
                  :readonly="true"
                  @focus="turnShowOp"
                  v-model="datadetail.organizationName"
                ></el-input>
              </el-form-item>

              <el-form-item label="入职时间" prop="cardId">
                <el-date-picker
                  :readonly="datadetail.entryTime != ''"
                  value-format="yyyy-MM-dd"
                  type="date"
                  v-model="datadetail.entryTime"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="datadetail.mobile"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="modifyDetail()"
                  >保存修改</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="upload_avatar" :span="4">
          <p>上传头像</p>
          <div>
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="datadetail.userCover"
                :src="datadetail.userCover"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <OrganizationPanel
      :show="showOp"
      @choose="choseOrganization"
      @turnOff="e => (showOp = e)"
    >
    </OrganizationPanel>
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
export default {
  components: {
    OrganizationPanel
  },
  data() {
    return {
      showOp: false,
      datadetail: {
        userCover: null
      },
      uploadUrl: this.$serverURL + 'common/uploadCover',
      rules: {
        name: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '手机号不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    turnShowOp() {
      if (this.datadetail.organizationName === '') {
        this.showOp = true
      }
    },
    choseOrganization(e) {
      this.datadetail.organizationId = e.organizationId
      this.datadetail.organizationName = e.organizationName
    },
    async modifyDetail() {
      var varification = false
      await this.$refs.datadetail.validate(async valid => {
        varification = valid
      })
      if (!varification) return false
      const { data: res } = await this.$http.post(
        '/learn/user/edit',
        this.datadetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        return this.$message.success('修改成功')
      }
    },
    async getInfo() {
      const { data: res } = await this.$http.get(
        '/learn/user/info?id=' + this.$store.getters.userinfo.userId
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.datadetail = res.data
        this.datadetail.sex = this.datadetail.sex === '男' ? 1 : 2
        console.log(this.datadetail)
      }
    },
    handleAvatarSuccess(res, file) {
      this.datadetail.userCover = res.url
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
