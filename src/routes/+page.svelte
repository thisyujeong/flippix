<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import { getTimer, formatDigit } from '@/utils';
	import FilpDigit from '@/components/FilpDigit.svelte';
	import type { Time } from '@/types/time';
	import {
		time,
		clear,
		startClock,
		startTimer,
		pauseTimer,
		resumeTimer,
		restartTimer
	} from '@/stores/timerStore';
	import Controller from '@/components/Controller.svelte';

	let isRunning = true;
	let isTimerMode = false;
	let timerValue: Time | null = null;

	const handleComplete = () => {
		alert('⏰ 타이머가 종료되었습니다!');
		isRunning = false;
	};

	onMount(() => {
		timerValue = getTimer(page.url.search);
		const isValidTimer = timerValue && Object.values(timerValue).some((v) => v > 0);

		// 유효한 timer 값이 있을 경우 타이머 모드로 전환
		if (isValidTimer && timerValue) {
			isTimerMode = true;
			startTimer(timerValue, handleComplete);
		}
		// 그렇지 않으면 일반 시계 모드 유지
		else {
			isTimerMode = false;
			startClock();
		}
	});

	function togglePauseResume() {
		if (!isTimerMode) return;
		if (isRunning) {
			pauseTimer();
		} else {
			resumeTimer();
		}
		isRunning = !isRunning;
	}

	function handleRestart() {
		restartTimer();
		isRunning = true;
	}

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

	<!-- 타이머 모드일 때만 컨트롤 버튼 표시 -->
	{#if isTimerMode}
		<div class="controller">
			<Controller {isRunning} onPauseResume={togglePauseResume} onRestart={handleRestart} />
		</div>
	{/if}
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
				font-size: 2rem;
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

	.controller {
		position: fixed;
		bottom: 4rem;
	}
</style>
