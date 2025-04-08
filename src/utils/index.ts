import type { Time } from '@/types/time';
import { SvelteURLSearchParams } from 'svelte/reactivity';

export const getDateTime = (date: Date = new Date()): Time => {
	return {
		hour: date.getHours(),
		min: date.getMinutes(),
		sec: date.getSeconds()
	};
};

export const formatDigit = (value: number) => {
	return value.toString().padStart(2, '0');
};

/**
 * Query string 타이머 설정값 추출
 * @param url timer params를 포함한 경로 ex) domain.com/?timer=hh:mm:ss
 * @returns 설정 값 객체로 변환 { hour: number, min: number, sec: number }
 */
export const getTimer = (url: string): Time | null => {
	const params = new SvelteURLSearchParams(url).get('timer');

	if (!params) return null;

	const time = params.split(':').map(Number).reverse();
	const timeObj = { hour: 0, min: 0, sec: 0 };

	timeObj.sec = time[0];
	timeObj.min = time[1] || 0;
	timeObj.hour = time[2] || 0;

	return timeObj;
};

/**
 * 타이머 설정값을 기준으로 타이머 종료 계산
 * @param timer 타이머 설정값 { hour: number, min: number, sec: number }
 * @returns 타이머가 끝나는 시간 반환
 */
export const getEndTime = (timer: Time): Date => {
	const endTime = new Date();
	endTime.setHours(endTime.getHours() + timer.hour);
	endTime.setMinutes(endTime.getMinutes() + timer.min);
	endTime.setSeconds(endTime.getSeconds() + timer.sec);
	return endTime;
};

/**
 * 현재 시간을 기준으로, 종료 시간까지 남은 시간 계산
 * @param endTime Date 타입의 종료 시간
 * @returns
 * - `isOver`: 타이머 상태
 * - `remainTime`: 남은 시간
 */
export const getRemainTime = (endTime: Date) => {
	const currentTime = new Date().getTime();
	const remaining = endTime.getTime() - currentTime;
	let remainingTime = { hour: 0, min: 0, sec: 0 };

	// 타이머 종료
	if (remaining <= 0) {
		return { isOver: true, remainTime: { hour: 0, min: 0, sec: 0 } };
	}

	// 남은시간 계산
	remainingTime.hour = Math.floor(remaining / (1000 * 60 * 60));
	remainingTime.min = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
	remainingTime.sec = Math.floor((remaining % (1000 * 60)) / 1000);

	return {
		isOver: remaining <= 0,
		remainTime: remainingTime
	};
};
