<script lang="ts">
	import FlipPanel from './FlipPanel.svelte';

	interface DigitProps {
		type: 'hour' | 'minute' | 'second';
		time: string;
	}

	let { type, time }: DigitProps = $props();
</script>

<div class={`flip-digit`}>
	<FlipPanel value={+time.charAt(0)} />
	<FlipPanel value={+time.charAt(1)} />
</div>

<style lang="scss" scoped>
	.flip-digit {
		display: flex;
		gap: 6px;
	}
</style>
