<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/newslist' }">新闻管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/newsedit' }">新闻编辑</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="card_detail">
			<el-card>
				<div slot="header" class="clearfix">
					<el-row>
						<el-col :span="20">编辑新闻</el-col>
						<el-col :span="4">
							<el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
						</el-col>
					</el-row>
				</div>
				<div class="edit_lines">
					<el-container>
						<el-main>
              <el-row>
                上传图片到阿里云，如果不用则不填 复制图片到新闻内容
                <el-input v-model="picturesUrl"></el-input>
                <el-upload :on-success="handleAvatarSuccess" class=" mt15 avatar-uploader" :action="uploadUrl"
                  :show-file-list="false">
                  <img v-if="picturesUrl" :src="picturesUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"  style="display:flex;justify-content: center;align-items: center;"></i>
                </el-upload>
              </el-row>
							<el-form :model="newsdetail" :rules="rules" ref="newsdetail" label-width="100px"
								class="demo-ruleForm login_form">
								<el-row>
									<el-col :span="24">
										<el-form-item label="标题" prop="newTitle">
											<el-input v-model="newsdetail.newTitle"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="内容" prop="newText">

											<Button icon="ios-cloud-upload-outline"></Button>
											<quill-editor ref="QuillEditor" v-model="newsdetail.newText"
												class="myQuillEditor" />
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="封面" prop="newCover">
											<el-input v-model="newsdetail.newCover"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="发布人" prop="createUser">
											<el-input v-model="newsdetail.createUser"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="发布时间" prop="releaseTime">
											<el-date-picker value-format="yyyy-MM-dd" type="date"
												v-model="newsdetail.releaseTime">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">

										<el-form-item label="状态" prop="releaseState">
											<el-radio v-model="newsdetail.releaseState" label="1">已发布</el-radio>
											<el-radio v-model="newsdetail.releaseState" label="0">未发布</el-radio>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="20" :offset="4">
										<el-button type="primary" @click="modifyDetail()">修改</el-button>
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
				showRp: false,
				showOp: false,
        uploadUrl: this.$serverURL + 'common/uploadCover',
        picturesUrl: '',
				twin: {
					organizationName: ''
				},
				newsdetail: {},
				rules: {
					newTitle: [{
						required: true,
						message: '标题不能为空',
						trigger: 'blur'
					}],
					newText: [{
						required: true,
						message: '内容不能为空',
						trigger: 'blur'
					}],
					newCover: [{
						required: true,
						message: '图片不能为空',
						trigger: 'blur'
					}],
					createUser: [{
						required: true,
						message: '作者不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.newsdetail = this.$route.query.row
		},
		methods: {
      handleAvatarSuccess(res, file) {
        this.picturesUrl = res.url
      },
			modifyDetail() {
				this.modifynews()
			},
			async modifynews() {
				const {
					data: res
				} = await this.$http.post('/manager/new/edit', this.newsdetail)
				if (res.state !== 200) {
					return this.$message.error(res.msg)
				} else {
					this.$message.success('修改成功')
					this.$router.go(-1)
				}
			},
			handleSuccess (res) {
			        // 获取富文本组件实例
			        let quill = this.$refs.QuillEditor.quill
			        // 如果上传成功
			        if (res) {
			            // 获取光标所在位置
			            let length = quill.getSelection().index
			            // 插入图片，res为服务器返回的图片链接地址
			            quill.insertEmbed(length, 'image', res)
			            // 调整光标到最后
			            quill.setSelection(length + 1)
			        } else {
			            // 提示信息，需引入Message
			            Message.error('图片插入失败')
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
<style scoped>
/deep/.el-form-item__label{
  text-align: left;
}
	.ivu-upload {
		display: none;
	}
</style>
