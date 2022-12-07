<template>
	<v-main class="list_place body_no_top ofs">
		
		<v-container>
			<div class="mt10 i-row i-between">
				<div class="nameInput">
					<input @keydown="keydown" dense solo v-model="query.likeParameter" label="搜索" color="teal" placeholder="请输入搜索内容" >
						
						<img src="../../images/icon/icon_search.png" />
					</input>
				</div>
				<div class="btn_search" @click="getCourseList()">搜索</div>
			</div>
			<v-card @click="goStudy(d)" class="vc" elevation="2"  light  v-for=" d in datas" style="margin: 1rem 0; padding: 1.25rem;">
				<div >
					<v-img height="6.625rem" width="6.625rem"  content :src="d.courseCover"></v-img>
				</div>
				<div class="i-column">
					<div class="card_title">{{d.courseName}}</div>
					<span>课程类型:{{d.courseSortName}}</span>
					<span>类型:{{d.teacherName}}</span>
				</div>
				

			</v-card>
		</v-container>
		<v-pagination v-if="total>1" color="teal lighten-1" v-model="query.page" :length="total" prev-icon="mdi-menu-left"
			next-icon="mdi-menu-right">
		</v-pagination>
		
		<v-snackbar v-model="show" color="red">
			尚未开班
		</v-snackbar>
	</v-main>
</template>

<script>
	export default {
		data() {
			return {
				query: {
					page: 1,
					rows: 10,
					likeParameter:undefined
				},
				total: 0,
				datas: [],
				show:false
			}
		},
		created() {
			if(this.$route.params.likeParameter!=null){
				this.query.likeParameter = this.$route.params.likeParameter
			}
			this.getCourseList()
		},
		methods: {
			keydown(val){
				
				if(val.key=="Enter"){
					this.getCourseList()
				}
			},
			goStudy(val) {
				if(val.recommendStutes=='2'){
					this.$router.push({
						name: 'Acquisition',
						params: {
							id: val.courseId,
							enrollId: val.enrollId
							
						}
					})
				}else{
					console.log("尚未开班")
					this.show = true;
				}
				
			},
			getCourseList() {
				this.$store.dispatch('getCourseList', this.query).then((res) => {
					if (res.data.state == 200) {
						this.total = Math.ceil(res.data.count / this.query.rows)
						this.datas = res.data.data
					} else {
						this.datas = []
					}
				}).catch((res) => {
					this.datas = []
				})
			}
		},
		watch: {
			'query.page'(val) {
				this.getCourseList()
			}
		}
	}
</script>

<style>
	.nameInput{
	    width: 17.5rem;
		height: 2rem;
		background-color: #F2F2F2;
		border-radius: 2rem;
	    position: relative;
	  }
	  .nameInput>input{
	    margin: 0.5rem  0rem 0.5rem 2.5rem;
		height: 1rem;
		width: 14rem;
	  }
	  .nameInput>img{
	    position: absolute;
	    left: 1rem;
	    top: 0.5rem;
		height: 1rem;			
		object-fit: contain;
	  }
	 .btn_search{		 
		 font-weight: bold;
		 color: #19B6CA;
		 line-height: 2rem;
		 width: 2.5rem;
		 text-align: end;
	 }
	 
	 
	 input{
	     outline-color: invert ;
	 	outline-style: none ;
	 	outline-width: 0px ;
	 	border: none ;
	 	border-style: none ;
	 	text-shadow: none ;
	 	-webkit-appearance: none ;
	 	-webkit-user-select: text ;
	 	outline-color: transparent ;
	 	box-shadow: none;
	}	
	.class{
		height: 6.625rem;
	}
	.card_title{
		color: #333535;
		font-size: 1.2rem;
		line-height: 2rem;
		font-weight: bold;
	}
	span{
		color: #535656;
		line-height: 1.5rem;
	}
</style>
