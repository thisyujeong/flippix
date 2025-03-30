<script lang="ts">
	import '../styles/global.scss';
	import Header from '../components/Header.svelte';

	let { children } = $props();
</script>

<Header />
<main>
	{@render children()}
</main>

<style lang="scss">
</style>
