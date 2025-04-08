<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getEndTime, getDateTime, getTimer, getRemainTime, formatDigit } from '@/utils';
	import FilpDigit from '@/components/FilpDigit.svelte';
	import { page } from '$app/state';

	let displayTime = { hour: 0, min: 0, sec: 0 };
	let interval: ReturnType<typeof setInterval>;
	let isTimerMode = false;

	/* Timer Mode */
	function setupTimerMode(timerValue: typeof displayTime) {
		const endTime = getEndTime(timerValue);
		isTimerMode = true;

		const updateTimer = () => {
			const { isOver, remainTime } = getRemainTime(endTime);
			displayTime = remainTime;

			if (isOver) clearInterval(interval);
		};

		updateTimer();
		interval = setInterval(updateTimer, 1000);
	}

	/* Clock Mode */
	function setupCLockMode() {
		isTimerMode = false;

		const updateClock = () => {
			displayTime = getDateTime();
		};

		updateClock();
		interval = setInterval(updateClock, 500);
	}

	onMount(() => {
		const timerValue = getTimer(page.url.search);
		const isValidTimer = timerValue && Object.values(timerValue).some((v) => v > 0);

		if (isValidTimer) {
			displayTime = timerValue;
			setupTimerMode(timerValue);
		} else {
			setupCLockMode();
		}
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="container">
	<div class="clock">
		<div class="clock-item">
			<span>Hour</span>
			<div class="clock-digit">
				<FilpDigit type="hour" time={formatDigit(displayTime.hour)} />
			</div>
		</div>
		<div class="clock-item">
			<span>Minute</span>
			<div class="clock-digit">
				<FilpDigit type="minute" time={formatDigit(displayTime.min)} />
			</div>
		</div>
		<div class="clock-item">
			<span>Seconds</span>
			<div class="clock-digit">
				<FilpDigit type="seconds" time={formatDigit(displayTime.sec)} />
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
