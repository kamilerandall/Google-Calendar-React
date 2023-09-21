import { OptionalMonthsAndYearsOfCurrWeek } from "../types";

export default function getFormatedDateForId(
	monthsAndYearsOfCurrWeek: OptionalMonthsAndYearsOfCurrWeek,
	day: number,
	hour: number
) {
	const { firstMonthsYear, firstMonth, lastMonthsYear, lastMonth } = monthsAndYearsOfCurrWeek;
	if (firstMonth && lastMonth) {
		return firstMonth === lastMonth
			? `${firstMonthsYear}-${getFormatedMonth(firstMonth)}-${getFormatedDay(day)} ${getFormatedHour(hour)}`
			: day < 10
			? `${lastMonthsYear}-${getFormatedMonth(lastMonth)}-${getFormatedDay(day)} ${getFormatedHour(hour)}`
			: `${firstMonthsYear}-${getFormatedMonth(firstMonth)}-${getFormatedDay(day)} ${getFormatedHour(hour)}`;
	}
}

function getFormatedMonth(month: number): string {
	return month < 9 ? `0${month + 1}` : `${month + 1}`;
}

function getFormatedDay(day: number): string {
	return day < 10 ? `0${day}` : `${day}`;
}

function getFormatedHour(hour: number): string {
	return hour < 10 ? `0${hour}:00` : `${hour}:00`;
}
