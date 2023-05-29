<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/questionlist' }">考题管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/uploadquestion' }">导入考题</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-link type="primary" :href="templateUrl">下载模板</el-link>
        </div>
        <div class="edit_lines">
          <el-upload :headers="myheader" :on-success="handleAvatarSuccess" class="avatar-uploader" :action="uploadUrl"
            :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="space"></div>
          <el-button size="small" type="primary" @click="uploadFile">上传考题</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  var token = window.sessionStorage.getItem('token')
  export default {
    data() {
      return {
        files: [],
        templateUrl: '',
        uploadUrl: '',
        excel: null,
        excelName: '',
        myheader: {
          token: token
        }
      }
    },
    created() {
      this.templateUrl = this.$serverURL + 'common/download?fileName=Tm'
      this.uploadUrl = this.$serverURL + 'manager/questions/uploadQuestionExcel'
      console.log(this.myheader)
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.files.push(file)
        this.$message.success('上传成功')
      },
      handleFileChange(e) {
        var file = e.target.files[0]
        this.excelName = file.name
        console.log(this.excelName)

        var reader = new FileReader()
        var t = this
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          t.excel = new Blob([e.target.result])
          // t.excel = this.result
        }
      },
      async uploadFile() {
        if (this.excel != null) {
          var fd = new FormData()
          fd.append('file', this.excel, this.excelName)
          const {
            data: res
          } = await this.$http.post(this.uploadUrl, fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('上传成功')
            // this.$router.go(-1)
          }
        }
      }
    },
    computed: {
      uploadHeaders() {
        return {
          'Authorization': window.sessionStorage.getItem('token')
        }
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
    border-color: #409EFF;
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
