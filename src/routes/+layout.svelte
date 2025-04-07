<script lang="ts">
	import '../styles/global.scss';
	import Header from '../components/Header.svelte';
	import { browser } from '$app/environment';

	let { children } = $props();
</script>

{#if browser}
	<Header />
	<main>
		{@render children()}
	</main>
{/if}

<style lang="scss">
</style>
