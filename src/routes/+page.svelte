<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getEndTime, getDateTime, getTimer, getRemainTime, formatDigit } from '@/utils';
	import FilpDigit from '@/components/FilpDigit.svelte';
	import { page } from '$app/state';

	let displayTime = { hour: 0, min: 0, sec: 0 };

	/* Timer Mode */
	let timer: ReturnType<typeof setInterval>;
	let timerValue = getTimer(page.url.search);

	if (timerValue) {
		displayTime = timerValue;

		const endTime = getEndTime(timerValue);
		const updateTimer = () => {
			const { isOver, remainTime } = getRemainTime(endTime);

			if (isOver) clearInterval(timer);

			displayTime = remainTime;
		};

		timer = setInterval(updateTimer, 1000);
	}

	/* Basic Time Mode */
	let clock: ReturnType<typeof setInterval>;

	if (!timerValue) {
		displayTime = getDateTime();

		clock = setInterval(() => {
			displayTime = getDateTime();
		}, 500);
	}

	onDestroy(() => {
		clearInterval(clock);
		clearInterval(timer);
	});
</script>

<div class="container">
	<div class="clock" style:display="flex" style:gap="">
		<dif class="clock-item">
			<span>Hour</span>
			<div class="clock-digit">
				<FilpDigit type="hour" time={formatDigit(displayTime.hour)} />
			</div>
		</dif>
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
