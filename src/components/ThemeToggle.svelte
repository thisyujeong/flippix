<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { Action } from 'svelte/action';

	type ThemeType = 'light' | 'dark';

	let theme = $state<ThemeType>('light');

	const themeToggle = () => {
		console.log('toggle theme');
		theme = theme === 'light' ? 'dark' : 'light';
	};

	const myaction: Action = (node) => {
		$effect(() => {
			node.dataset.theme = theme;
			localStorage.setItem('data-theme', theme);
		});
	};

	onMount(() => {
		if (browser) {
			const storedTheme = localStorage.getItem('data-theme');
			theme = storedTheme === 'dark' ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', theme);
		}
	});
</script>

<svelte:body use:myaction />

<div class="theme-switch">
	<button onclick={themeToggle}>Theme toggle {theme}</button>
</div>

<style lang="scss" scoped>
	.theme-switch {
		button {
			color: var(--text-color);
		}
	}
</style>
