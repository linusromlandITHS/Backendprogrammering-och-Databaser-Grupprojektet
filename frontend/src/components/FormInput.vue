<template>
	<textarea v-if="type == 'textarea'" v-model="input" />
	<VSelect
		v-else-if="type == 'select'"
		:options="options"
		:reduce="(option) => option[`${this.endpoint}ID`]"
		:label="endpoint + 'Name'"
		v-model="input"
	/>
	<VSelect
		multiple
		v-else-if="type == 'selectMany'"
		:options="options"
		:reduce="(option) => option[`${this.endpoint}ID`]"
		:label="endpoint + 'Name'"
		v-model="input"
	/>
	<input v-else :type="type" v-model="input" :maxlength="max" :minlength="min" :max="max" :min="min" />
</template>

<script>
	export default {
		name: 'FormInput',
		props: {
			type: {
				type: String,
				required: true,
				validator: (value) =>
					['text', 'textMany', 'number', 'textarea', 'select', 'selectMany'].includes(value),
			},
			// eslint-disable-next-line vue/require-prop-types
			value: {
				required: true,
			},
			max: {
				type: Number,
				required: false,
				default: Number.MAX_SAFE_INTEGER,
				validator: (value) => !isNaN(value),
			},
			min: {
				type: Number,
				required: false,
				default: Number.MIN_SAFE_INTEGER,
				validator: (value) => !isNaN(value),
			},
			endpoint: {
				type: String,
				required: false,
				default: '',
			},
		},
		emits: ['input'],
		data() {
			return {
				input: this.value,
				inputMany: '',
				options: [],
			};
		},
		watch: {
			input(value) {
				if (this.type == 'textMany') {
					this.$emit(
						'input',
						value.split(',').map((v) => v.trim()),
					);
				} else this.$emit('input', value);
			},
		},
		created() {
			if (this.type === 'select' || this.type === 'selectMany') {
				this.getOptions();
			}
		},
		methods: {
			async getOptions() {
				const request = await this.axios({
					method: 'get',
					url: this.endpoint,
				});

				const response = await request.data;

				if (response.success) {
					this.options = response.data;
				}
			},
		},
	};
</script>
