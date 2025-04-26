import { browser } from '$app/environment';

const buttonAudio = browser ? new Audio('/assets/sounds/button-click.mp3') : null;
const swipeAudio = browser ? new Audio('/assets/sounds/swipe.mp3') : null;

export const sounds = {
	button: buttonAudio,
	swipe: swipeAudio
};

export const playSound = (sound: keyof typeof sounds) => {
	const audio = sounds[sound];
	if (!audio) return;
	audio.currentTime = 0;
	audio.play();
};
