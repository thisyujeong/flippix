<script lang="ts">
	import { theme } from '@/stores/themeStore';
	import TimeProgress from './TimeProgress.svelte';
	import type { Time } from '@/types';

	interface ControllerProps {
		initialTime: Time;
		isRunning: boolean;
		onPauseResume: () => void;
		onRestart: () => void;
	}

	const { initialTime, isRunning, onPauseResume, onRestart }: ControllerProps = $props();
	const { hour, min, sec } = initialTime;
</script>

<div class="control-wrapper">
	<div class="control-info">
		<div class="time">
			<p class="time-label">Set the timer:</p>
			<p class="time-value">
				<!-- Hour -->
				{#if hour > 0}
					<strong>{hour}</strong>hour
				{/if}

				<!-- Minuites -->
				{#if (hour > 0 && sec > 0) || min > 0}
					<strong>{min}</strong>min
				{/if}

				<!-- Secconds -->
				{#if sec > 0}
					<strong>{sec}</strong>sec
				{/if}
			</p>
		</div>

		<div class={['control-buttons', $theme]}>
			<button class={isRunning ? 'pause' : 'resume'} onclick={onPauseResume}>
				<span>{isRunning ? 'Pause' : 'Resume'}</span>
			</button>
			<button class="restart" onclick={onRestart}>
				<span>Restart</span>
			</button>
		</div>
	</div>

	<TimeProgress />
</div>

<style lang="scss">
	.control-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 24px;
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

	.control-info {
		display: flex;
		flex-direction: column;
		gap: 12px;

		.time {
			padding-left: 8px;
			&-label {
				font-size: 16px;
				color: var(--text-color);
				opacity: 0.8;
			}
			&-value {
				font-size: 20px;
				font-weight: 400;
				strong {
					margin: 0 3px;
					font-size: 24px;
					font-weight: bold;
				}
			}
		}
	}

	.control-buttons {
		display: flex;
		gap: 1.2rem;
		button {
			width: 120px;
			padding: 12px;
			color: var(--text-color);
			font-size: 16px;
			background: var(--controller-bg);
			border-radius: 999px;
			span {
				padding-left: 28px;
				background-size: 20px;
				background-position: left center;
				background-repeat: no-repeat;
			}
			&:hover {
				background: var(--active-color);
			}
			&:active {
				transform: scale(0.95);
			}
		}

		&.light button,
		&.dark button:hover {
			span {
				color: var(--basic-black);
			}

			&.pause span {
				background-image: url('/static/assets/icon/ic-pause_bk.svg');
			}
			&.resume span {
				background-image: url('/static/assets/icon/ic-play_bk.svg');
				padding-left: 28px;
			}
			&.restart span {
				background-image: url('/static/assets/icon/ic-replay_bk.svg');
			}
		}

		&.dark {
			button.pause span {
				background-image: url('/static/assets/icon/ic-pause_wh.svg');
			}
			button.resume span {
				background-image: url('/static/assets/icon/ic-play_wh.svg');
			}
			button.restart span {
				background-image: url('/static/assets/icon/ic-replay_wh.svg');
			}
		}
	}
</style>
