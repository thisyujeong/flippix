<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getTimer } from '@/utils';
	import { playSound } from '@/lib/sounds';
	import type { Time } from '@/types';
	import {
		clear,
		startClock,
		startTimer,
		pauseTimer,
		resumeTimer,
		restartTimer,
		isTimer,
		isEnd
	} from '@/stores/timerStore';
	import { toastStore } from '@/stores/toastStore';
	import Controller from '@/components/Controller.svelte';
	import FlipDisplay from '@/components/FlipDisplay.svelte';
	import ToastContainer from '@/components/ToastContainer.svelte';
	import Header from '@/components/Header.svelte';
	import TimeOver from '@/components/TimeOver.svelte';

	let isRunning = true;
	let timerValue: Time | null = null;
	let initialTime = getTimer(page.url.search);

	onMount(() => {
		timerValue = getTimer(page.url.search);
		const isValidTimer = timerValue && Object.values(timerValue).some((v) => v > 0);

		if (isValidTimer && timerValue) {
			// 유효한 timer 값이 있을 경우 타이머 모드로 전환
			startTimer(timerValue, handleComplete);
		} else {
			// 그렇지 않으면 일반 시계 모드 유지
			startClock();
		}
	});

	function handleComplete() {
		isRunning = false;
	}

	function togglePauseResume() {
		if (!$isTimer) return;
		if (isRunning) {
			pauseTimer();
			toastStore.show({ text: 'Taking a break! Timer paused.', status: 'info' });
		} else {
			resumeTimer();
			toastStore.show({ text: "Let's keep going! Timer resumed.", status: 'success' });
		}
		playSound('button');
		isRunning = !isRunning;
	}

	function handleStartClock() {
		startClock();
		playSound('button');
		goto(page.url.pathname, { replaceState: true });
		toastStore.show({ text: 'Clock mode activated!', status: 'info' });
	}

	function handleRestart() {
		restartTimer();
		playSound('button');
		isRunning = true;
		toastStore.show({ text: 'Starting over! Timer restarted.', status: 'error' });
	}

	onDestroy(() => {
		clear();
	});
</script>

<Header />

<!-- Toast -->
<ToastContainer />

<!-- Content -->
<div class="container">
	<FlipDisplay />
</div>

<!-- 타이머 모드일 때만 컨트롤 버튼 표시 -->
{#if $isTimer && initialTime}
	<div class="controller">
		<Controller
			{initialTime}
			{isRunning}
			onPauseResume={togglePauseResume}
			onRestart={handleRestart}
		/>
	</div>
{/if}

{#if $isTimer && $isEnd}
	<TimeOver onRestart={handleRestart} onStartClock={handleStartClock} />
{/if}

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
		left: 0;
		right: 0;
		bottom: 0;
		padding: 40px 6rem;
	}
</style>
