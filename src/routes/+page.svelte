<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import { getTimer, formatDigit } from '@/utils';
	import { time, clear, startClock, startTimer } from '@/stores/timerStore';
	import FilpDigit from '@/components/FilpDigit.svelte';

	let timerValue = getTimer(page.url.search);

	onMount(() => {
		const isValidTimer = timerValue && Object.values(timerValue).some((v) => v > 0);
		if (isValidTimer) {
			startTimer(timerValue);
		} else {
			startClock();
		}
	});

	onDestroy(() => {
		clear();
	});
</script>

<div class="container">
	<div class="clock">
		<div class="clock-item">
			<span>Hour</span>
			<div class="clock-digit">
				<FilpDigit type="hour" time={formatDigit($time.hour)} />
			</div>
		</div>
		<div class="clock-item">
			<span>Minute</span>
			<div class="clock-digit">
				<FilpDigit type="minute" time={formatDigit($time.min)} />
			</div>
		</div>
		<div class="clock-item">
			<span>Seconds</span>
			<div class="clock-digit">
				<FilpDigit type="seconds" time={formatDigit($time.sec)} />
			</div>
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.clock {
		display: flex;
		align-items: center;
		gap: 6rem;

		&-item {
			display: flex;
			align-items: center;
			flex-direction: column;
			gap: 3rem;

			span {
				font-size: 2.4rem;
				text-transform: uppercase;
				opacity: 0.85;
			}
		}

		&-item + &-item {
			.clock-digit::before {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				left: -3rem;
				width: 4px;
				height: 5rem;
				transform: translate(-50%, -50%);
				background: var(--divider-color);
				border-radius: 10rem;
			}
		}

		&-digit {
			position: relative;
		}
	}
</style>
