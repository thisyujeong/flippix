import type { Toast, ToastOption } from '@/types';
import { writable } from 'svelte/store';

let id = 0;

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	const show = ({ text, status = 'info', timeout = 2000 }: ToastOption) => {
		const toastId = ++id;
		const toast: Toast = { id: toastId, status, text, timeout };

		update((toasts) => [...toasts, toast]);

		setTimeout(() => {
			update((toasts) => toasts.filter((t) => t.id !== toastId));
		}, timeout);
	};

	return {
		subscribe,
		show
	};
}

export const toastStore = createToastStore();
