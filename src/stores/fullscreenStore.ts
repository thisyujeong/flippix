import { writable } from 'svelte/store';

const isFullscreen = writable<boolean>(false);

const initializeFullscreenListener = () => {
	document.addEventListener('fullscreenchange', () => {
		isFullscreen.set(!!document.fullscreenElement);
	});
};

const toggleFullscreen = () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
		isFullscreen.set(true);
	} else {
		document.exitFullscreen();
		isFullscreen.set(false);
	}
};

export { isFullscreen, toggleFullscreen, initializeFullscreenListener };
