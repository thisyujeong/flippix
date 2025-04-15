<script lang="ts">
	import { progress } from '@/stores/timerStore';
	import { getTimer } from '@/utils';
	import { page } from '$app/state';
	import Button from './Button.svelte';
	import TimeProgress from './TimeProgress.svelte';

	interface ControllerProps {
		isRunning: boolean;
		onPauseResume: () => void;
		onRestart: () => void;
	}

	let initialTime = getTimer(page.url.search);

	const { isRunning, onPauseResume, onRestart }: ControllerProps = $props();
</script>

<div class="control-wrapper">
	<div class="control-buttons">
		<Button onclick={onPauseResume}>
			{isRunning ? 'Pause' : 'Resume'}
		</Button>
		<Button onclick={onRestart}>Restart</Button>
	</div>
	{#if initialTime}
		<div class="control-timer">
			<p class="label">You set the timer:</p>
			<p class="value">
				{#if initialTime.hour > 0}
					{initialTime.hour + 'h'}
				{/if}
				{#if initialTime.min > 0}
					{initialTime.hour + 'm'}
				{/if}
				{#if initialTime.sec > 0}
					{initialTime.sec + 's'}
				{/if}
			</p>
		</div>
	{/if}

	<TimeProgress />
</div>

<style lang="scss">
	.control-wrapper {
		border-radius: 2.4rem;
		padding: 2rem;
		border: 1px solid #f9fafb4c;
	}

	.control-buttons {
		display: flex;
		gap: 2rem;
	}

	.control-timer {
		.label {
			font-size: 2rem;
			opacity: 0.4;
		}
		.value {
			text-align: center;
			font-size: 3rem;
			font-weight: 700;
		}
	}
</style>
