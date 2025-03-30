<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getTimeData } from '@/utils';
	import FilpDigit from '@/components/FilpDigit.svelte';

	let time = getTimeData(new Date());
	let { hour, min, sec } = time;

	const updateTime = () => {
		const time = getTimeData(new Date());
		hour = time.hour;
		min = time.min;
		sec = time.sec;
	};

	const timer = setInterval(updateTime, 500);

	onDestroy(() => clearInterval(timer));
</script>

<div class="container">
	<div>
		<p>
			{#if time}
				{hour}:{min}:{sec}
			{/if}
		</p>
	</div>

	<FilpDigit type="second" time={sec} />
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
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
