<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getTimeData, setTimer } from '@/utils';
	import FilpDigit from '@/components/FilpDigit.svelte';
	import { page } from '$app/state';

	let { hour, min, sec } = getTimeData();

	const updateTime = () => {
		const time = getTimeData();
		hour = time.hour;
		min = time.min;
		sec = time.sec;
	};

	const clock = setInterval(updateTime, 500);

	onDestroy(() => clearInterval(clock));

	// TODO: 타이머 구현
	// const timer = setTimer(page.url.search);
	// console.log(timer);
</script>

<div class="container">
	<div class="clock" style:display="flex" style:gap="">
		<dif class="clock-item">
			<span>Hour</span>
			<div class="clock-digit">
				<FilpDigit type="hour" time={hour} />
			</div>
		</dif>
		<div class="clock-item">
			<span>Minute</span>
			<div class="clock-digit">
				<FilpDigit type="minute" time={min} />
			</div>
		</div>
		<div class="clock-item">
			<span>Seconds</span>
			<div class="clock-digit">
				<FilpDigit type="seconds" time={sec} />
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
				opacity: 0.7;
			}
		}

		&-item + &-item {
			.clock-digit::before {
				content: '';
				position: absolute;
				display: block;
				height: 5rem;
				width: 4px;
				position: absolute;
				left: -3rem;
				top: 50%;
				transform: translate(-50%, -50%);
				background: var(--divider-color);
			}
		}

		&-digit {
			position: relative;
		}
	}
</style>
