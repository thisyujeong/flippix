<script lang="ts">
	import { isTimer } from '@/stores/timerStore';
	import ThemeToggle from './ThemeToggle.svelte';
	import FullscreenButton from './FullscreenButton.svelte';
	import { isFullscreen } from '@/stores/fullscreenStore';
</script>

<header class="header">
	<div class="header-left">
		{#if !$isFullscreen}
			<h1 class="logo">Flippix</h1>
			<span class="mode-text">
				{#if $isTimer}Timer Mode{:else}Clock Mode{/if}
			</span>
		{/if}
	</div>

	<div class="header-right">
		<FullscreenButton />
		<ThemeToggle />
	</div>
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
		&-right {
			display: flex;
			align-items: center;
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
