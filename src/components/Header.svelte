<script lang="ts">
	import { isTimer } from '@/stores/timerStore';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="header">
	<div class="header-left">
		<h1 class="logo">Flippix</h1>
		<span class="mode-text">
			{#if $isTimer}Timer Mode{:else}Clock Mode{/if}
		</span>
	</div>

	<ThemeToggle />
</header>

<style lang="scss" scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		text-align: center;
		padding: 32px 6rem;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 3rem;

		&-left {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}
	}

	.logo {
		font-size: 18px;
	}

	.mode-text {
		color: var(--basic-shallow);
		font-size: 14px;
	}
</style>
