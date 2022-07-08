<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/messagelist' }">消息管理</el-breadcrumb-item>
			<el-breadcrumb-item>消息编辑</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="card_detail">
			<el-card>
				<div slot="header" class="clearfix">
					<el-row>
						<el-col :span="20">编辑消息</el-col>
						<el-col :span="4">
							<el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
						</el-col>
					</el-row>
				</div>
				<div class="edit_lines">
					<el-container>
						<el-main>
							<el-form :model="messagedetail" :rules="rules" ref="messagedetail" label-width="100px"
								class="demo-ruleForm login_form">
								<el-row>
									<!-- <el-col :span="24">
										<el-form-item label="通知对象" prop="messageObject">
											<el-input v-model="messagedetail.messageObject"></el-input>
										</el-form-item>
									</el-col> -->
									<el-col :span="24">
										<el-form-item label="通知对象" prop="messageObject">
											<el-input v-model="twin.organizationName" @focus="showOd=true"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="内容" prop="messageContent">
											<el-input v-model="messagedetail.messageContent"></el-input>
											<!-- <quill-editor ref="text" v-model="messagedetail.messageContent"
												class="myQuillEditor" /> -->

										</el-form-item>
									</el-col>

								</el-row>
								<el-row>
								  <el-col :span="24">
								    <el-form-item label="消息类型" prop="messageType">
								      <el-radio v-model="messagedetail.messageType" label="1">系统通知</el-radio>
								      <el-radio v-model="messagedetail.messageType" label="2">重要通知</el-radio>
								      <el-radio v-model="messagedetail.messageType" label="3">考试通知</el-radio>
								      <el-radio v-model="messagedetail.messageType" label="4">竞赛通知</el-radio>
								    </el-form-item>
								  </el-col>
								</el-row>、
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

		<OrganizationPanel :show="showOd" @choose="getOd" @turnOff="(e) => showOd=e"></OrganizationPanel>

	</div>
</template>

<script>
	import {
		quillEditor
	} from 'vue-quill-editor'
	import OrganizationPanel from '../panel/OrganizationPanel.vue'
	export default {
		components: {
			OrganizationPanel
		},
		data() {
			return {
				showOd: false,
				showOp: false,
				twin: {
					organizationName: ''
				},
				messagedetail: {
					messageContent: '',
					messageObject: '1',
					messageType: '' // 类型 1系统通知 2重要通知 3考试通知 4竞赛通知

				},
				rules: {
					messageContent: [{
						required: true,
						message: '通知内容不能为空',
						trigger: 'blur'
					}],
					messageObject: [{
						required: true,
						message: '通知对象不能为空',
						trigger: 'blur'
					}],
					messageType: [{
						required: true,
						message: '类型不能为空',
						trigger: 'blur'
					}]

				}

			}
		},
		created() {
			this.messagedetail = this.$route.query.row
			console.log(this.$route.query.row)
			this.twin.organizationName = this.$route.query.row.messageObject
		},
		methods: {
			getOd(val) {
				this.messagedetail.messageObject = val.organizationId.toString()
				this.twin.organizationName = val.organizationName
			},
			modifyDetail() {
				this.modifymessage()
			},
			async modifymessage() {
				const {
					data: res
				} = await this.$http.post('/manager/message/edit', this.messagedetail)
				if (res.state !== 200) {
					return this.$message.error(res.msg)
				} else {
					this.$message.success('修改成功')
					this.$router.go(-1)
				}
			}

			/* handleSuccess (res) {
			        // 获取富文本组件实例
			        let quill = this.$refs.QuillEditor.quill
			        // 如果上传成功
			        if (res) {
			            // 获取光标所在位置
			            let length = quill.getSelection().index;
			            // 插入图片，res为服务器返回的图片链接地址
			            quill.insertEmbed(length, 'image', res)
			            // 调整光标到最后
			            quill.setSelection(length + 1)
			        } else {
			            // 提示信息，需引入Message
			            Message.error('图片插入失败')
			        }
			    }, */
		},
		filters: {
			truncateDate: function(date) {
				return date.split('T')[0]
			}
		}
	}
</script>

<style>
	.ivu-upload {
		display: none;
	}
</style>
