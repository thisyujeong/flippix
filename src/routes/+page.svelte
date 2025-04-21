<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import { getTimer } from '@/utils';
	import type { Time } from '@/types/time';
	import {
		clear,
		startClock,
		startTimer,
		pauseTimer,
		resumeTimer,
		restartTimer
	} from '@/stores/timerStore';
	import Controller from '@/components/Controller.svelte';
	import FlipDisplay from '@/components/FlipDisplay.svelte';
	import Toast from '@/components/Toast.svelte';

	let isRunning = true;
	let isTimerMode = false;
	let timerValue: Time | null = null;
	let initialTime = getTimer(page.url.search);

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
	<FlipDisplay />

	<!-- 타이머 모드일 때만 컨트롤 버튼 표시 -->
	{#if isTimerMode && initialTime}
		<div class="controller">
			<Controller
				{initialTime}
				{isRunning}
				onPauseResume={togglePauseResume}
				onRestart={handleRestart}
			/>
		</div>
	{/if}
</div>

<Toast message="Taking a break! Timer paused." />

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.controller {
		position: fixed;
		bottom: 40px;
		width: calc(100vw - 12rem);
	}
</style>
