<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import Button from './Button.svelte';
	import { time } from '@/stores/timerStore';
	import { formatDigit, getTimer } from '@/utils';
	import { page } from '$app/state';

	interface ControllerProps {
		isRunning: boolean;
		onPauseResume: () => void;
		onRestart: () => void;
	}

	let initialTime = getTimer(page.url.search);

	const { isRunning, onPauseResume, onRestart }: ControllerProps = $props();
</script>

<div class="controls">
	<div class="buttons">
		<Button onclick={onPauseResume}>
			{isRunning ? 'Pause' : 'Resume'}
		</Button>
		<Button onclick={onRestart}>Restart</Button>
	</div>
	{#if initialTime}
		<div class="time">
			<p class="time-label">You set the timer:</p>
			<p class="time-value">
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
</div>

<style lang="scss">
	.controls {
		// background: linear-gradient(to bottom, #eff2f8 2%, #d5e5d6 150%);
		border-radius: 2.4rem;
		padding: 2rem;
		// box-shadow: 0px 6px 10px #9eafad7c;
		border: 1px solid #f9fafb4c;
	}
	.buttons {
		display: flex;
		gap: 2rem;
	}
	.time {
		&-label {
			font-size: 2rem;
			opacity: 0.4;
		}
		&-value {
			text-align: center;
			font-size: 3rem;
			// color: var(--text-reverse-color);
			font-weight: 700;
		}
	}
</style>
