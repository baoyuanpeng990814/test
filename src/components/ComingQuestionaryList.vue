<template>
	<div >
		<div v-if="datas.length>0">
		<div class="card_list list_place">
			 <v-card class="vc"  v-for=" d in datas">
		
				<div class="i-row margin-tb1-lr1-25 " style="width: calc(100% - 2.5rem);">
					<v-img maxHeight="6.625rem" maxWidth="6.625rem" :src="d.examineCover"></v-img>
					<div class="i-column marginl-1 i-with100" >
						<div class="font-292828-09 ">{{d.examineName}}</div>
						
						<span class="font-A9ADAD-0-9 margint-0-5">结束时间:{{d.failureTime | splitTime}}</span>
						<div class="btn-go" @click="goPurchase(d)">参与调研</div>
					</div>
				
				</div>
			 </v-card>
			
		
		</div>
		
			
			
			<div v-if="pagination">
				<v-pagination color="teal lighten-1" v-model="page" :length="total" prev-icon="mdi-menu-left"
					next-icon="mdi-menu-right">
				</v-pagination>
			</div>
		</div>
		<div class="nothing" v-else>本栏目暂无内容,请稍后再来</div>


	</div>
</template>

<script>
	export default {
		name: "BeingExamList",
		props: {
			themeId: 0,
			more: true,
			pagination: false
		},
		data() {
			return {
				datas: [],
				page: 1,
				rows: 4,
				total: 0
			}
		},
		created() {
			this.beingExamList()
		},
		methods: {
			checkMore() {



			},
			beingExamList() {
				this.$store.dispatch("getComingQuestionaryList").then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
						this.total = 0
						//this.total = Math.ceil(parseInt(res.data.count) / this.rows)
					} else {

					}
				}).catch((res) => {

				})
			}
		},
		watch: {
			page() {
				this.getProgramList()
			}


		},
		filters:{
			splitTime(val){
				return val.split(" ")[0]
			}
		}
	}
</script>

<style scoped>
	.nothing {
		text-align: center;
		color: #969696;
		font-weight: 500;
		margin-top: 10vh;
	}
	.btn-go {
		width: 6.5rem;
		height: 2.75rem;
		text-align: center;
		line-height: 2.75rem;
		border-radius: 0.5rem;
		background-color: #C1DFE3;
		color: #6C969C;
		margin-top: 1rem;
		margin-left: auto;
	}
</style>
