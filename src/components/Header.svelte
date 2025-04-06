<script lang="ts">
	import type { Action } from 'svelte/action';

	let theme = $state<'light' | 'dark'>('light');

	const themeToggle = () => {
		console.log('toggle theme');
		theme = theme === 'light' ? 'dark' : 'light';
	};

	const myaction: Action = (node) => {
		node.dataset.theme = theme;
		$effect(() => {
			node.dataset.theme = theme;
		});
	};
</script>

<svelte:body use:myaction />

<header class="header">
	<div class="header-id">
		<h1>Digital Flip Clock</h1>
		<p>ⓒ thisyujeong</p>
	</div>
	<div class="theme-switch">
		<button onclick={themeToggle}>Theme toggle {theme}</button>
	</div>
</header>

<style lang="scss" scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		text-align: center;
		padding: 24px 0;
	}

	.header-id {
		h1 {
			margin: 0;
			font-weight: 500;
			font-size: 20px;
		}
		p {
			margin-top: 0.4em;
			font-size: 14px;
			opacity: 0.75;
		}
	}

	.theme-switch {
		button {
			color: var(--text-color);
		}
	}
</style>
