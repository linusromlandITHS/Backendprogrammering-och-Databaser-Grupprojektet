<template>
	<Navbar />
	<main class="w-full md:w-2/3 mx-auto">
		<form class="flex flex-col items-center text-center" @submit="search">
			<h2 class="text-4xl md:text-5xl font-semibold m-10">{{ title }}</h2>
			<p class="text-lg md:text-xl text-gray-500 mb-10">{{ subtitle }}</p>
			<div class="w-5/6 md:w-2/3 lg:w-1/2 flex justify-center">
				<input
					type="text"
					placeholder="Search..."
					class="w-4/6 md:w-5/6 bg-gray-200 p-2 rounded-l-lg focus:bg-gray-300 focus:outline-none"
					v-model="query"
				/><input
					type="submit"
					value="Search"
					:class="`bg-${type} py-2 px-4 rounded-r-md text-white focus:brightness-90 focus:outline-none hover:brightness-110 cursor-pointer transition ease-out duration-150`"
				/>
			</div>
		</form>
	</main>
</template>
<script>
	import Navbar from '../components/Navbar.vue';

	export default {
		name: 'Search',
		components: {
			Navbar,
		},
		data() {
			return {
				type: '',
				title: '',
				subtitle: '',
				query: '',
			};
		},
		watch: {
			type() {
				switch (this.type) {
					case 'land':
						this.title = 'Land Search. On the ground.';
						this.subtitle = 'Discover some of the best places to live in the world.';
						break;
					case 'sea':
						this.title = 'Sea Search. Into the deep.';
						this.subtitle = "Learn about the world's oceans and seas.";
						break;
					case 'space':
						this.title = 'Space Search. Close to the stars.';
						this.subtitle = 'Learn about the universe and its planets.';
						break;
					default:
						this.$router.push('/');
						break;
				}
			},
			$route() {
				this.type = this.$route.params.type;
			},
		},
		created() {
			this.type = this.$route.params.type;
		},
		methods: {
			search(e) {
				e.preventDefault();
				const query = this.query.trim();

				if (query != '') {
					this.$router.push(`/${this.type}/result/${query}`);
				}
			},
		},
	};
</script>
