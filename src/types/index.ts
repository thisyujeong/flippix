/**
 * time
 */
export interface Time {
	hour: number;
	min: number;
	sec: number;
}

/**
 * toast
 */
export type ToastStatus = 'success' | 'error' | 'info';

export interface ToastOption {
	text: string;
	status?: ToastStatus;
	timeout?: number;
}

export interface Toast extends ToastOption {
	id: number;
}

export interface ToastProps {
	text: string;
	status?: ToastStatus;
}
