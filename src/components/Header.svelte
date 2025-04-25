<script lang="ts">
	import { isTimer } from '@/stores/timerStore';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="header">
	<div class="mode">
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
	}

	.mode {
		color: #929aad;
		border-radius: 16px;

		&-text {
			font-size: 14px;
			color: inherit;
			font-weight: bold;
			font-style: italic;
		}
	}
</style>
