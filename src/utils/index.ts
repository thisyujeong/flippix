export interface TimeData {
	hour: string;
	min: string;
	sec: string;
}

export const getTimeData = (date: Date): TimeData => {
	return {
		hour: date.getHours().toString().padStart(2, '0'),
		min: date.getMinutes().toString().padStart(2, '0'),
		sec: date.getSeconds().toString().padStart(2, '0')
	};
};
