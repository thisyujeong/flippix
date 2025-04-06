import { SvelteDate, SvelteURLSearchParams } from 'svelte/reactivity';

export interface TimeData {
	hour: string;
	min: string;
	sec: string;
}

export interface Timer {
	hour?: string | null;
	min?: string | null;
	sec?: string | null;
}

export const getTimeData = (date: Date = new SvelteDate()): TimeData => {
	return {
		hour: date.getHours().toString().padStart(2, '0'),
		min: date.getMinutes().toString().padStart(2, '0'),
		sec: date.getSeconds().toString().padStart(2, '0')
	};
};

export const setTimer = (url: string): Timer | null => {
	const params = new SvelteURLSearchParams(url);
	const timer = params.get('timer')?.split(':');

	if (!timer) return null;

	const timerObject: Timer = {};

	if (timer.length >= 1) timerObject.sec = timer.pop()!;
	if (timer.length >= 1) timerObject.min = timer.pop()!;
	if (timer.length >= 1) timerObject.hour = timer.pop()!;

	return Object.keys(timerObject).length > 0 ? timerObject : null;
};
