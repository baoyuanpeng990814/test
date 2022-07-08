<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/messagelist' }">消息管理</el-breadcrumb-item>
			<el-breadcrumb-item >消息详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="card_detail">
			<el-card>
				<div slot="header" class="clearfix">
					<el-row>
						<el-col :span="20">查看消息</el-col>
						<el-col :span="4">
							<el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
						</el-col>
					</el-row>
				</div>
				<div class="detail_lines detail1_lines">
					<el-container>
						<el-main>
						
							<el-row>
								<el-col :span="2">
									消息内容
								</el-col>
								<el-col :span="20" :rows="4" v-html="messagedetail.messageContent">
				
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									消息对象
								</el-col>
								<el-col :span="20">
									{{messagedetail.messageObject}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									消息时间
								</el-col>
								<el-col :span="20">
									{{messagedetail.createTime|truncateDate}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									消息状态
								</el-col>
								<el-col :span="20">
									{{messagedetail.messageState|transfermState }}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									消息类型
								</el-col>
								<el-col :span="20">
									{{messagedetail.messageType}}
								</el-col>
							</el-row>
				
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
				messagedetail: {}
			}
		},
		created() {
			this.messagedetail = this.$route.query.row
			console.log(this.$route.query.row)
		},
		filters: {
			truncateDate: function(date) {
				if (date != null) {
					return date.split('T')[0]
				}
			},
			transfermState: function(state) {
				if (state == '1') return '已发布'
				else return '未发布'
			}
		}
	}
</script>

<style>

</style>
