<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/contesttypelist' }">竞赛分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">添加分类</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form :model="dataDetail" :rules="rules" ref="dataDetail" label-width="100px"
                class="demo-ruleForm login_form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类名称" prop="competitionSortName">
                      <el-input v-model="dataDetail.competitionSortName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="封面" prop="competitionSortCover">
                      <el-input v-model="dataDetail.competitionSortCover"></el-input>
                      <el-upload :on-success="handleAvatarSuccess" class=" mt15 avatar-uploader" :action="uploadUrl"
                        :show-file-list="false">
                        <img v-if="dataDetail.competitionSortCover" :src="dataDetail.competitionSortCover	"
                          class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreation">提交</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>

        </div>
      </el-card>
    </div>

    <OrganizationPanel :show="showOd" @choose="getOd" @turnOff="(e) => showOd=e"></OrganizationPanel>

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
        showOd: false,
        twin: {
          organizationName: ''
        },
        uploadUrl: this.$serverURL + 'common/uploadCover',
        dataDetail: {
          competitionSortName: '',
          description: '',
          organizationId: 2,
          state: '1',
          parentNode: 0,
          competitionSortCover: ''
        },
        rules: {
          competitionSortName: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.dataDetail.parentNode = this.$route.query.parent
    },
    methods: {
      /* 封面路径显示 */
      handleAvatarSuccess(res, file) {
        console.log('上传')
        this.dataDetail.competitionSortCover = res.url
      },
      getOd(val) {
        this.dataDetail.organizationId = val.organizationId
        this.twin.organizationName = val.organizationName
      },
      async submitCreation() {
        const {
          data: res
        } = await this.$http.post('/manager/competitionSort/add', this.dataDetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.$message.success('创建成功')
          this.$router.go(-1)
        }
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
