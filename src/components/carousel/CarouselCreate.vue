<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/carousellist' }">轮播图管理</el-breadcrumb-item>
			<el-breadcrumb-item >创建轮播图</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="card_detail">
			<el-card>
				<div slot="header" class="clearfix">
					<el-row>
						<el-col :span="20">创建轮播图</el-col>
						<el-col :span="4">
							<el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
						</el-col>
					</el-row>
				</div>
				<div class="edit_lines">
					<el-container>
						<el-main>
							<el-form :model="carouseldetail" :rules="rules" ref="carouseldetail" label-width="100px"
								class="demo-ruleForm login_form">
								<el-row>
								<!-- 	<el-col :span="24">
										<el-form-item label="图片路径" prop="picturesUrl">
											<el-input v-model="carouseldetail.picturesUrl"></el-input>
										</el-form-item>
									</el-col> -->

                  <el-form-item label="图片路径" prop="picturesUrl">
                    <el-input v-model="carouseldetail.picturesUrl"></el-input>
                    <el-upload :on-success="handleAvatarSuccess" class=" mt15 avatar-uploader" :action="uploadUrl"
                      :show-file-list="false">
                      <img v-if="carouseldetail.picturesUrl" :src="carouseldetail.picturesUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" style="display:flex;justify-content: center;align-items: center;"></i>
                    </el-upload>
                  </el-form-item>

								</el-row>

                <el-row>
                	<el-col :span="24">
                		<el-form-item label="跳转路径" prop="jumpUrl">
                			<el-input v-model="carouseldetail.jumpUrl"></el-input>
                		</el-form-item>
                	</el-col>
                </el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="排序" prop="rotateSeq">
											<el-input v-model="carouseldetail.rotateSeq"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col :span="24">
										<el-form-item label="状态" prop="rotateTop">
											<el-radio v-model="carouseldetail.rotateTop" label="1">已发布</el-radio>
											<el-radio v-model="carouseldetail.rotateTop" label="2">未发布</el-radio>
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
				showOp: false,
				twin: {
					organizationName: ''
				},
        uploadUrl: this.$serverURL + 'common/uploadCover',
				carouseldetail: {
					jumpUrl: '',
					picturesUrl: '',
					rotateSeq: '1',
					rotateTop: '1'

				},
				rules: {
					/* jumpUrl: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					}], */
					picturesUrl: [{
						required: true,
						message: '图片路径不能为空',
						trigger: 'blur'
					}],
					rotateSeq: [{
						required: true,
						message: '排序不能为空',
						trigger: 'blur'
					}]

				}
			}
		},
		created() {},
		methods: {
      handleAvatarSuccess(res, file) {
        this.carouseldetail.picturesUrl = res.url
      },
			modifyDetail() {
				this.createcarousel()
			},
			async createcarousel() {
				const {
					data: res
				} = await this.$http.post('/manager/rotate/add', this.carouseldetail)
				if (res.state !== 200) {
					return this.$message.error(res.msg)
				} else {
					this.$message.success('添加成功')
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
