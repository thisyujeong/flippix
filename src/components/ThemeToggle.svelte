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

<div class="switch-box">
	<span class="switch-mode" class:on={theme === 'dark'}>Dark</span>
	<button class="switch" onclick={themeToggle} class:is-dark={theme === 'dark'}>
		<span class="switch-handle"></span>
	</button>
	<span class="switch-mode" class:on={theme === 'light'}>Light</span>
</div>

<style lang="scss" scoped>
	.switch-box {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.switch-mode {
		width: 40px;
		font-size: 16px;
		text-align: center;
		opacity: 0.5;
		&.on {
			opacity: 1;
			font-weight: bold;
		}
	}
	.switch {
		position: relative;
		display: block;
		width: 90px;
		height: 50px;
		padding: 4px;
		border-radius: 100px;
		border: 3px solid #e5ecf0;
		background: #d5dce0;
		box-shadow:
			inset 0px 1px 6px #b5c1c6,
			-2px -2px 6px #ffffff,
			2px 2px 5px #afbdc8;
		overflow: hidden;

		&-handle {
			position: absolute;
			top: 4px;
			right: 4px;
			display: inline-block;
			width: 36px;
			height: 36px;
			background: #e5ecf0;
			border-radius: 50%;
			box-shadow:
				-2px -2px 5px #ffffff70,
				2px 2px 5px #afbdc8;
			transition: 0.3s ease;
		}

		&.is-dark {
			background: #42de6c;
			border-color: #22262c;
			box-shadow:
				inset 0px 1px 6px #0e0e0e,
				-2px -2px 6px #4d566c,
				2px 2px 5px #000000;
			.switch-handle {
				right: calc(100% - 40px);
				box-shadow:
					-2px -2px 5px rgba(180, 192, 197, 0.44),
					2px 2px 5px #0e0e0e70;
				background: #d3d7db;
			}
		}
	}
</style>
