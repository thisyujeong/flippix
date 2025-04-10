import type { Time } from '@/types/time';
import { getDateTime, getEndTime, getRemainTime, toSeconds, toTimeObject } from '@/utils';
import { writable } from 'svelte/store';

export const time = writable<Time>({ hour: 0, min: 0, sec: 0 });

let interval: ReturnType<typeof setInterval> | null = null;
let currentSeconds: number = 0;
let remainingAtPause: Time | null = null;
let onCompleteCallback: (() => void) | null = null;
let initialTimerValue: Time | null = null;

/**
 * 일반 시계모드 시작
 */
export function startClock() {
	clear();
	time.set(getDateTime());
	interval = setInterval(() => {
		time.set(getDateTime());
	}, 500);
}

/**
 * 타이머모드 시작
 * @param initialTime - 시작 시간(시, 분, 초)
 * @param onComplete - 타이머 종료 시 호출되는 콜백함수 (선택사항)
 */
export function startTimer(initialTime: Time, onComplete?: () => void) {
	clear();
	initialTimerValue = initialTime;
	onCompleteCallback = onComplete ?? null;

	// 초 단위로 환산
	currentSeconds = toSeconds(initialTime);

	// 초기 시간 표시
	time.set(toTimeObject(currentSeconds));

	interval = setInterval(() => {
		currentSeconds--;
		time.set(toTimeObject(currentSeconds));

		if (currentSeconds <= 0) {
			clear();
			onCompleteCallback?.();
		}
	}, 1000);
}

/**
 * - 타이머모드 일시정지
 * - 현재 남은 시간을 저장하고 setIntervald을 중단
 */
export function pauseTimer() {
	if (interval) {
		clearInterval(interval);
		interval = null;
		remainingAtPause = toTimeObject(currentSeconds);
	}
}

/**
 * - 일시정지된 타이머를 재개
 * - 저장된 시간에서 다시 카운트다운을 시작
 */
export function resumeTimer() {
	if (remainingAtPause) {
		startTimer(remainingAtPause, onCompleteCallback ?? undefined);
		remainingAtPause = null;
	}
}

/**
 * - 타이머를 초기 상태로 돌리고 재시작
 */
export function restartTimer() {
	if (initialTimerValue) {
		startTimer(initialTimerValue, onCompleteCallback ?? undefined);
	}
}

/**
 * - 현재 실행 중인 시계나 타이머를 정리
 * - interval을 중지하고 내부 상태를 초기화
 */
export function clear() {
	if (interval) {
		clearInterval(interval);
		interval = null;
	}

	currentSeconds = 0;
	remainingAtPause = null;
	onCompleteCallback = null;
	initialTimerValue = null;
}
