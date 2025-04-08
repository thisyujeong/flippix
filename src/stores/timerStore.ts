import type { Time } from '@/types/time';
import { getDateTime, getEndTime, getRemainTime } from '@/utils';
import { writable } from 'svelte/store';

export const time = writable({ hour: 0, min: 0, sec: 0 });

let interval: ReturnType<typeof setInterval> | null = null;

export function startClock() {
	clear();
	time.set(getDateTime());
	interval = setInterval(() => {
		time.set(getDateTime());
	}, 500);
}

export function startTimer(initialTime: Time) {
	clear();

	const endTime = getEndTime(initialTime);
	const tick = () => {
		const { isOver, remainTime } = getRemainTime(endTime);
		time.set(remainTime);

		if (isOver && interval) {
			clear();
		}
	};

	tick();
	interval = setInterval(tick, 1000);
}

export function clear() {
	if (interval) {
		clearInterval(interval);
		interval = null;
	}
}
