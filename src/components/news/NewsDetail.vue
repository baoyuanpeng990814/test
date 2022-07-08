<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/newslist' }">新闻管理</el-breadcrumb-item>
			<el-breadcrumb-item >新闻详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="card_detail">
			<el-card>
				<div slot="header" class="clearfix">
					<el-row>
						<el-col :span="20">查看新闻</el-col>
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
									标题
								</el-col>
								<el-col :span="20">
									{{newsdetail.newTitle}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									内容
								</el-col>
								<el-col :span="20" :rows="4" v-html="newsdetail.newText">

								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									封面
								</el-col>
								<el-col :span="20">
									{{newsdetail.newCover}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									发布时间
								</el-col>
								<el-col :span="20">
									{{newsdetail.releaseTime|truncateDate}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									发布状态
								</el-col>
								<el-col :span="20">
									{{newsdetail.releaseState|transfermState }}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									发布人
								</el-col>
								<el-col :span="20">
									{{newsdetail.createUser}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									发布人名称
								</el-col>
								<el-col :span="20">
									{{newsdetail.userName}}
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
				newsdetail: {}
			}
		},
		created() {
			this.newsdetail = this.$route.query.row
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
