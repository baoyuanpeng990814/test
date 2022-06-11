<template>
	<div>
		<v-app-bar color="teal lighten-1" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title></v-toolbar-title>
		</v-app-bar>


		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list>
				<v-list-item-group active-class="teal--text">
					<v-list-item to="/MyCourses">
						<v-list-item-icon>
						          <v-icon>mdi-book</v-icon>
						        </v-list-item-icon>
						<v-list-item-title>我的学习</v-list-item-title>
					</v-list-item>
					<v-list-item to="/MyExams">
						<v-list-item-icon>
						          <v-icon>mdi-clipboard-text</v-icon>
						        </v-list-item-icon>
						<v-list-item-title>我的考试</v-list-item-title>
					</v-list-item>
					<v-list-item to="/MyArchives">
						<v-list-item-icon>
						          <v-icon>mdi-clipboard-text</v-icon>
						        </v-list-item-icon>
						<v-list-item-title>学习档案</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				drawer:false
			}
		}
	}
</script>

<style>
</style>
