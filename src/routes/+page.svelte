<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getTimeData } from '@/utils';
	import FilpDigit from '@/components/FilpDigit.svelte';

	let { hour, min, sec } = getTimeData();

	const updateTime = () => {
		const time = getTimeData();
		hour = time.hour;
		min = time.min;
		sec = time.sec;
	};

	const clock = setInterval(updateTime, 500);

	onDestroy(() => clearInterval(clock));
</script>

<div class="container">
	<div class="flip-clock" style:display="flex" style:gap="">
		<FilpDigit type="hour" time={hour} />
		<div class="flip-colon">
			<span class="flip-colon__dot"></span>
			<span class="flip-colon__dot"></span>
		</div>
		<FilpDigit type="minute" time={min} />
		<div class="flip-colon">
			<span class="flip-colon__dot"></span>
			<span class="flip-colon__dot"></span>
		</div>
		<FilpDigit type="seconds" time={sec} />
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

	.flip-clock {
		display: flex;
		align-items: center;
	}

	.flip-colon {
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8rem;
		animation: blinking 2s infinite;
		transition: 0;

		&__dot {
			display: block;
			width: 2rem;
			height: 2rem;
			background-color: #111;
			line-height: 1;
		}

		@keyframes blinking {
			0% {
				opacity: 0;
			}
			33% {
				opacity: 0;
			}
			34% {
				opacity: 1;
			}
			100% {
				opacity: 1;
			}
		}
	}
</style>
