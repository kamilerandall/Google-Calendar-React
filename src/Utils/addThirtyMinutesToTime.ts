export default function addThirtyMinutes(eventStart: string) {
	const [hour, min] = eventStart.split(":");
	const isLessThan60 = +min + 30 < 60;
	const addToMinutes = `${hour}:${+min + 30}`;
	const mins = +min - 30 === 0 ? "00" : +min - 30;
	const addToHoursAndMinutes = `${getFormatedHour(+hour + 1)}:${mins}`;
	return isLessThan60 ? addToMinutes : addToHoursAndMinutes;
}

export function getFormatedHour(hour: number) {
	return hour < 10 ? `0${hour}:00` : `${hour}:00`;
}