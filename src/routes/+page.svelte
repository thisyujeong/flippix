<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import { getTimer } from '@/utils';
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
	import { goto } from '$app/navigation';

	let isRunning = true;
	let timerValue: Time | null = null;
	let initialTime = getTimer(page.url.search);

	const handleComplete = () => {
		isRunning = false;

		// optionally stop the ticking sound or any animations here
	};

	onMount(() => {
		timerValue = getTimer(page.url.search);
		const isValidTimer = timerValue && Object.values(timerValue).some((v) => v > 0);

		// 유효한 timer 값이 있을 경우 타이머 모드로 전환
		if (isValidTimer && timerValue) {
			startTimer(timerValue, handleComplete);
		}
		// 그렇지 않으면 일반 시계 모드 유지
		else {
			startClock();
		}
	});

	function togglePauseResume() {
		if (!$isTimer) return;
		if (isRunning) {
			pauseTimer();
			toastStore.show({ text: 'Taking a break! Timer paused.', status: 'info' });
		} else {
			resumeTimer();
			toastStore.show({ text: "Let's keep going! Timer resumed.", status: 'success' });
		}
		isRunning = !isRunning;
	}

	function handleStartClock() {
		startClock();
		goto(page.url.pathname, { replaceState: true });
		toastStore.show({ text: 'Clock mode activated!', status: 'info' });
	}

	function handleRestart() {
		restartTimer();
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
