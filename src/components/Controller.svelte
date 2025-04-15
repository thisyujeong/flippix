<script lang="ts">
	import TimeProgress from './TimeProgress.svelte';
	import type { Time } from '@/types/time';

	interface ControllerProps {
		initialTime: Time;
		isRunning: boolean;
		onPauseResume: () => void;
		onRestart: () => void;
	}

	const { initialTime, isRunning, onPauseResume, onRestart }: ControllerProps = $props();
	const { hour, min, sec } = initialTime;

	console.log(hour, min, sec);
</script>

<div class="control-wrapper">
	<!-- <div class="control-buttons">
		<Button onclick={onPauseResume}>
			{isRunning ? 'Pause' : 'Resume'}
		</Button>
		<Button onclick={onRestart}>Restart</Button>
	</div> -->

	<div class="time-status">
		<div class="time-set">
			<p class="label">Set the timer</p>
			<p class="value">
				<!-- Hour -->
				{#if hour > 0}
					{hour + 'h'}
				{/if}

				<!-- Minuites -->
				{#if (hour > 0 && sec > 0) || min > 0}
					{min + 'm'}
				{/if}

				<!-- Secconds -->
				{#if sec > 0}
					{sec + 's'}
				{/if}
			</p>
		</div>

		<TimeProgress />
	</div>
</div>

<style lang="scss">
	.control-wrapper {
		border-radius: 2.4rem;
		padding: 2rem;
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

	.time-status {
		padding: 12px 12px 12px 32px;
		border-radius: 100px;
		display: flex;
		align-items: center;
		gap: 24px;
		background: var(--controller-bg);
		border-top: 1px solid var(--controller-border-color);
		box-shadow: var(--controller-shadow);

		.time-set {
			.label {
				font-size: 16px;
				color: var(--text-reverse-color);
				opacity: 0.8;
			}
			.value {
				font-size: 24px;
				font-weight: bold;
				color: var(--text-reverse-color);
			}
		}
	}
</style>
