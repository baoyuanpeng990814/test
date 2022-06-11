<template>
	<v-dialog v-model="showDialog" width="500">
		<v-card>
			<v-card-title>
				<v-text-field v-model="query.organizationName" append-icon="mdi-magnify" label="搜索机构名" single-line
					hide-details></v-text-field>
			</v-card-title>
			<v-card-text>
				<v-data-table @click:row="choose" hide-default-footer :headers="headers" :items="datas">

				</v-data-table>
				<v-pagination color="teal lighten-1" v-model="query.page" :length="total" prev-icon="mdi-menu-left"
					next-icon="mdi-menu-right">
				</v-pagination>

			</v-card-text>
		</v-card>
	</v-dialog>




</template>

<script>
	export default {
		name: "OrganizationList",
		props: {
			show: Boolean
		},
		data() {
			return {
				headers: [{
					text: '机构编码',
					value: 'organizationCode'
				}, {
					text: '机构名称',
					value: 'organizationName'
				}],
				datas: [],
				query: {
					rows: 10,
					page: 1,
					organizationId: 0,
					organizationName: ""
				},
				total: 0,
				showDialog: false
			}
		},
		mounted() {
			this.getOrganizationList()
		},
		methods: {
			choose(row) {
				this.$emit('choose', row)
				this.showDialog = false
			},
			getOrganizationList() {
				this.$store.dispatch('getOrganizationList', this.query).then((res) => {
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
			showDialog: function(val) {
				if (val == false) this.$emit('turnOff', false)
			},
			show: function(val) {
				this.showDialog = val
			},
			'query.organizationName': {
				handler: function() {
					this.getOrganizationList()
				}
			},
			'query.page': {
				handler: function() {
					this.getOrganizationList()
				}
			}

		}
	}
</script>

<style>
</style>
