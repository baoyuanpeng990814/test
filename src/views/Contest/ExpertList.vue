<template>
	<v-main>

		<v-app-bar color="white lighten-1" dark>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title">专家列表</div>
		</v-app-bar>
		<div class="body_height ofs">
			<div class="i-column">
				<div class="expert_item">
					<div class="i-row i-align-center">
						<v-avatar size="40" tile>
							<img src="../../images/pic_tx.png" />
						</v-avatar>
						<v-chip small label color="#DFF8FB" text-color="#28BBCE"
							style="margin-right: 0.5rem; margin-left: 1rem;">
							专家
						</v-chip>
						<v-chip small label color="#FCF3E1" text-color="#E4A01C">
							98分
						</v-chip>
					</div>
					<div :class="show?'expert_abstract2':'expert_abstract'">
						张航:1988年11月生。现任中国科学技术
							大学教授,博士生导师,国家杰出青年科学
							基金获得者。2000年6月在中国科学技术
							大学获得博士学位,现任中国科学技。						
					</div>
					<div @click="unfold()" class="unfold_abstract">
							<span v-if="!show">展开</span>
							<span v-else>闭合</span>
						</div>
					</div>
			</div>

		</div>
	</v-main>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

				data: [],
				show: true,

			}
		},
		created() {

		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			unfold() {
				
				this.show = !this.show
				
			},
		}
	}
</script>

<style scoped>
	.expert_item {
		display: flex;
		flex-direction: column;
		width: 100vw;
		padding: 1rem;
	}

	.expert_abstract {	
		width: calc(100vw - 7rem);	
		float: left;
		font-size: 0.85rem;
		line-height: 1rem;
		height: 1rem;
		overflow: hidden;
		padding: 0;
		margin-left: 4rem;
		
		color: #2A2928;
	}

	.expert_abstract2 {		
		width: calc(100vw - 7rem);
		float: left;
		font-size: 0.85rem;
		line-height: 1rem;
		padding: 0;
		margin-left: 4rem;		
		color: #2A2928;
	}
	.unfold_abstract{
		width: calc(100vw - 7rem);
		font-size: 1rem;
		padding: 0;
		margin-left: 4rem;
		text-align: end;
		color: #28BBCE;
		border-bottom: 1px solid #F2F2F2;
	}
</style>
