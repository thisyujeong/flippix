<script lang="ts">
	import type { ToastStatus } from '@/types';
	import { fade, fly } from 'svelte/transition';

	interface ToastProps {
		status?: ToastStatus;
		text: string;
	}

	let { status = 'info', text }: ToastProps = $props();
</script>

<div
	class={['toast', 'toast-' + status]}
	in:fly={{ y: 45, duration: 200 }}
	out:fade={{ duration: 300 }}
>
	<div class="toast-status"></div>
	<p class="toast-text">{text}</p>
</div>

<style lang="scss">
	.toast {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 12px 20px;
		border-radius: 16px;
		border: 1px solid var(--toast-border);
		background-color: var(--toast-bg);
		box-shadow: var(--toast-shadow);

		&-status {
			position: relative;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: var(--info-color);

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				width: 100%;
				height: 100%;
				border-radius: 100%;
				background-color: inherit;
				transform: translate(-50%, -50%);
				animation: pinned 1s infinite 1s;
			}
		}

		&-text {
			font-size: 16px;
		}

		&:hover {
			.toast-close {
				display: block;
			}
		}

		/* status (default: info) */
		&-success .toast-status {
			background-color: var(--active-color);
		}
		&-error .toast-status {
			background-color: var(--error-color);
		}
	}

	@keyframes pinned {
		from {
			width: 100%;
			height: 100%;
			opacity: 0.8;
		}
		to {
			width: 200%;
			height: 200%;
			opacity: 0;
		}
	}
</style>
