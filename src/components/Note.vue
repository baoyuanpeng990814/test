<template>
	<div class="acquisition_note">
		
		
		<!-- <v-text-field solo v-model="query.studyNotes" append-icon="mdi-arrow-up-bold" label="记笔记" filled         
			@click:append="setNote">
		</v-text-field> -->
		
		<div class="i-row i-align-center">
			<textarea class="note_input" v-model="query.studyNotes"> </textarea>
			<div class="note_btn" @click="setNote" style="color: #28BBCE;">发送</div>
		</div>

		<v-snackbar v-model="show" :color="color">
			{{ text }}
		</v-snackbar>

	</div>
</template>

<script>
	export default {
		name: 'Note',
		props: {
			courseId: "",
			chapterId: "",
			studyNotesTime: ""
		},
		data() {
			return {
				query: {
					studyNotes: ""
				},
				text: "",
				show: false,
				color: "red lighten-1",
				
			}
		},
		methods: {
			created() {
				
			},
			setNote() {
				/* 发送笔记 */
				this.query.chapterId = this.chapterId
				this.query.courseId = this.courseId
				this.query.studyNotesTime = this.studyNotesTime
				this.$store.dispatch('addNote', this.query).then((res) => {
					if (res.data.state == 200) {
						this.query = {
							studyNotes: ""
						}
						this.show = true
						this.text = "记录成功"
						this.color = "green lighten-1"
						this.$emit("add")
					} else {
						this.show = true
						this.text = "记录失败"
						this.color = "red lighten-1"
					}
				}).catch((res) => {})

			}
		},
		watch: {

		}
	}
</script>

<style>
	.acquisition_note {
		margin: 0;
		padding: 5px 0;
		height: 90px;		
		width: 100%;
		background-color: #FFFFFF;
		box-shadow: 0px -2px 6px 0px rgba(122, 122, 122, 0.15);
		
	}
	.note_input{
		width: 80%;
		height: 78px;
		margin: auto 2.5%;		
		border: 0.1rem solid #28BBCE;
		border-radius: 4px;
		
	}
</style>
