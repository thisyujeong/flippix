<script lang="ts">
	import { toastStore } from '@/stores/toastStore';
	import Toast from './Toast.svelte';
	import type { Toast as ToastType } from '@/types';

	import { flip } from 'svelte/animate';

	let toasts: ToastType[] = [];

	toastStore.subscribe((val) => (toasts = val));
</script>

<div class="toast-container">
	{#each toasts as toast (toast.id)}
		<div animate:flip={{ duration: 200 }}>
			<Toast text={toast.text} status={toast.status} />
		</div>
	{/each}
</div>

<style lang="scss">
	.toast-container {
		position: fixed;
		left: 50%;
		bottom: 40px;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		z-index: 100;
	}
</style>
