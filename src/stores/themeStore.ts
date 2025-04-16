import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type ThemeType = 'light' | 'dark';
const defaultTheme = 'light';

// 초기 테마 설정
const getInitialTheme = (): ThemeType => {
	if (!browser) return defaultTheme;

	const storedTheme = localStorage.getItem('data-theme') as ThemeType | null;
	if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;

	const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
	return prefersDark ? 'dark' : 'light';
};

const theme = writable<ThemeType>(getInitialTheme());

// DOM, localStorage 반영 (store가 변경될 때마다 실행)
theme.subscribe((value) => {
	if (!browser) return;
	document.documentElement.setAttribute('data-theme', value);
	localStorage.setItem('data-theme', value);
});

// 테마 토글 함수
const toggleTheme = () => {
	theme.update((prev) => (prev === 'light' ? 'dark' : 'light'));
};

export { theme, toggleTheme };
