<script lang="ts">
	import '../styles/global.scss';
	import { browser } from '$app/environment';

	let { children } = $props();
</script>

{#if browser}
	<main>
		{@render children()}
	</main>
{/if}

<style lang="scss">
</style>
