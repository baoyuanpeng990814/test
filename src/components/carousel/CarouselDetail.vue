<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/carousellist' }">轮播图管理</el-breadcrumb-item>
			<el-breadcrumb-item>轮播图详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="card_detail">
			<el-card>
				<div slot="header" class="clearfix">
					<el-row>
						<el-col :span="20">查看轮播图</el-col>
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
									序号
								</el-col>
								<el-col :span="20">
									{{carouseldetail.rotateId}}
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="2">
									封面
								</el-col>
								<el-col :span="20">
									{{carouseldetail.picturesUrl}}
								</el-col>
							</el-row>
              <el-row>
              	<el-col :span="2">
              		跳转路径
              	</el-col>
              	<el-col :span="20">
              		{{carouseldetail.jumpUrl}}
              	</el-col>
              </el-row>
							<el-row>
								<el-col :span="2">
									发布时间
								</el-col>
								<el-col :span="20">
									{{carouseldetail.createTime|transformDate}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									发布状态
								</el-col>
								<el-col :span="20">
									{{carouseldetail.rotateTop|transformState }}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									发布人
								</el-col>
								<el-col :span="20">
									{{carouseldetail.createUser}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="2">
									排序
								</el-col>
								<el-col :span="20">
									{{carouseldetail.rotateSeq}}
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

				carouseldetail: {}
			}
		},
		created() {
			this.carouseldetail = this.$route.query.row
		},
		filters: {
			transformDate: function(date) {
				if (date !== null) {
					return date.split('T')[0]
				}
			},
			transformState: function(state) {
				if (state === '1') return '已发布'
				else return '未发布'
			}
		}
	}
</script>
<style>
</style>
