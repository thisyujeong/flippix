<script lang="ts">
	import Header from '../components/Header.svelte';

	let { children } = $props();
</script>

<Header />
<main>
	{@render children()}
</main>

<style lang="scss">
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(body, html) {
		font-family: 'Outfit';
	}
</style>
