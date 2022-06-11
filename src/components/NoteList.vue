<template>
	<div class="tabs_item_bottom_height ofs">
		<v-list>
			<!-- 笔记列表 -->
			<v-list-item-group >
				<v-list-item @click="showNote(d)" v-for="d in datas" three-line>
					
					<v-list-item-content style="background-color: #F7FEFF; border-radius: 0.25rem; max-height: 5rem; padding: 1rem;" >
						<v-list-item-title v-text="d.studyNotes"></v-list-item-title>
						<v-list-item-subtitle v-text="d.studyNotesTime" style="text-align: end;"></v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>

		<v-pagination color="teal lighten-1" v-model="query.page" :length="total" prev-icon="mdi-menu-left"
			next-icon="mdi-menu-right" @onChange="turnPage">
		</v-pagination>
		<!-- 笔记列表修改展开 -->
		<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card >
				<v-toolbar color="#F9FAFD" style="box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.06);">
					<v-btn icon @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>我的笔记</v-toolbar-title>
					<v-spacer></v-spacer>
					<!--<v-toolbar-items>
						<v-btn dark text @click="dialog = false">
							删除
						</v-btn>
					</v-toolbar-items>-->
				</v-toolbar>
				<div class="dialog_note" >
					<v-textarea solo label="笔记" v-model="currentNote.studyNotes"></v-textarea>
					<v-btn class="note_btn" @click="edit" color="#28BBCE"  dark>修改</v-btn>
					<v-btn class="note_btn" @click="del" color="#28BBCE"  outlined style="border: #28BBCE 1px solid; color: #28BBCE;" >删除</v-btn>
				</div>

			</v-card>
		</v-dialog>


	</div>
</template>

<script>
	export default {
		name: "NoteList",
		props: {
			courseId: "",
			chapterId: "",
			director: 0
		},
		data() {
			return {
				query: {
					userId: 0,
					page: 1,
					rows: 6
				},
				total: 0,
				datas: [],
				userinfo: {},
				currentNote: {},
				dialog: false
			}
		},
		created() {
			this.query.userId = this.$store.getters.userinfo.userId
			this.getNoteList()
		},
		methods: {
			showNote(val) {
				console.log(val)
				this.currentNote = val
				this.dialog = true
			},
			edit() {

				this.$store.dispatch('editNote', this.currentNote).then((res) => {
					if (res.data.state == 200) {
						this.dialog = false
						this.getNoteList()
					} else {
						//this.snackbar = true
					}
				}).catch((res) => {})

			},
			del() {

				this.$store.dispatch('delNote', {
					studyNotesId: this.currentNote.studyNotesId
				}).then((res) => {
					if (res.data.state == 200) {
						this.dialog = false
						this.getNoteList()
					} else {
						//this.snackbar = true
					}
				}).catch((res) => {})

			},
			getNoteList() {
				this.query.courseId = this.courseId
				this.query.chapterId = this.chapterId
				this.$store.dispatch('getNoteList', this.query).then((res) => {
					if (res.data.state == 200) {
						this.total = Math.ceil(parseInt(res.data.count) / this.query.rows)
						this.datas = res.data.data
						//this.query.page = 1
					} else {
						//this.snackbar = true
					}
				}).catch((res) => {})
			},
			turnPage(e){
				console.log(e)
			}
		},
		watch: {
			'query.page'(val) {
				console.log(val)
				this.query.page = val
				this.getNoteList()
			},
			director() {
				this.getNoteList()
			}
		}
	}
</script>

<style>
</style>
