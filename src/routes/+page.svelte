<script>
	import FlipPanel from '@/components/FlipPanel.svelte';
</script>

<div class="container">
	<FlipPanel />
</div>

<style lang="scss" scoped>
	:global(body) {
		/* background: #1e1e1e; */
		background: linear-gradient(135deg, #e2e2e2, #ffffff);
	}
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
