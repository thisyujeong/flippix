import { SvelteDate, SvelteURLSearchParams } from 'svelte/reactivity';

export interface TimeData {
	hour: string;
	min: string;
	sec: string;
}

export interface Timer {
	hour: number;
	min: number;
	sec: number;
}

export const getTimeData = (date: Date = new SvelteDate()): TimeData => {
	return {
		hour: date.getHours().toString().padStart(2, '0'),
		min: date.getMinutes().toString().padStart(2, '0'),
		sec: date.getSeconds().toString().padStart(2, '0')
	};
};

/**
 * Query-string으로 timer 설정하기
 * @param url 현재 경로
 * @returns
 */
export const setTimer = (url: string): Timer | null => {
	const params = new SvelteURLSearchParams(url);
	const timer = params.get('timer')?.split(':').map(Number);

	if (!timer) return null;

	const timerObject: Timer = { hour: 0, min: 0, sec: 0 };

	if (timer.length >= 1) timerObject.sec = +timer.pop()!;
	if (timer.length >= 1) timerObject.min = +timer.pop()!;
	if (timer.length >= 1) timerObject.hour = +timer.pop()!;

	const startTime = new SvelteDate();
	startTime.setHours(startTime.getHours() + timerObject.hour);
	startTime.setMinutes(startTime.getMinutes() + timerObject.min);
	startTime.setMinutes(startTime.getSeconds() + timerObject.sec);
	const endTime = startTime;

	return timerObject;
};

export const updateTimer = (timer: Timer) => {
	const currentTime = new SvelteDate().getTime();
};
