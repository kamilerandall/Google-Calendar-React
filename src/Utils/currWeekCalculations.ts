import { WeekInfo } from "../types";

export default function calculateCurrWeek(currFullDate: Date): WeekInfo {
	const currDateOfTheMonth = currFullDate.getDate();
	const currDayOfTheWeek = currFullDate.getDay();

	const firstDateOfCurrWeekFull = new Date(
		currFullDate.getFullYear(),
		currFullDate.getMonth(),
		currDateOfTheMonth - currDayOfTheWeek
	);
	const lastDateOfCurrWeekFull = new Date(
		currFullDate.getFullYear(),
		currFullDate.getMonth(),
		currFullDate.getDate() + (6 - currDayOfTheWeek)
	);

	const currWeekInfo = getWeekInfo(firstDateOfCurrWeekFull, lastDateOfCurrWeekFull, currFullDate);
	currWeekInfo["firstDateOfCurrWeekFull"] = firstDateOfCurrWeekFull;
	currWeekInfo["lastDateOfCurrWeekFull"] = lastDateOfCurrWeekFull;
	return currWeekInfo;
}

function getWeekInfo(firstDateOfCurrWeekFull: Date, lastDateOfCurrWeekFull: Date, currFullDate: Date): WeekInfo {
	return firstDateOfCurrWeekFull.getDate() < lastDateOfCurrWeekFull.getDate()
		? getWeekInfoInOneMonth(firstDateOfCurrWeekFull, lastDateOfCurrWeekFull)
		: firstDateOfCurrWeekFull.getDate() > currFullDate.getDate()
		? getWeekInfoBetweenPrevAndCurrMonth(firstDateOfCurrWeekFull, lastDateOfCurrWeekFull)
		: getWeekInfoBetweenCurrAndNextMonth(firstDateOfCurrWeekFull, lastDateOfCurrWeekFull);
}

function getWeekInfoInOneMonth(firstDateOfCurrWeekFull: Date, lastDateOfCurrWeekFull: Date): WeekInfo {
	const currWeek: number[] = [];
	for (let i = firstDateOfCurrWeekFull.getDate(); i <= lastDateOfCurrWeekFull.getDate(); i++) {
		currWeek.push(i);
	}
	const weekInfo = {
		currWeek,
	};
	return addMonthAndYearOfCurrWeek(weekInfo, firstDateOfCurrWeekFull, lastDateOfCurrWeekFull);
}

function getWeekInfoBetweenPrevAndCurrMonth(firstDateOfCurrWeekFull: Date, lastDateOfCurrWeekFull: Date): WeekInfo {
	const currWeek: number[] = [];

	const lastDateOfPrevMonth = new Date(
		firstDateOfCurrWeekFull.getFullYear(),
		firstDateOfCurrWeekFull.getMonth() + 1,
		0
	).getDate();

	for (let i = firstDateOfCurrWeekFull.getDate(); i <= lastDateOfPrevMonth; i++) {
		currWeek.push(i);
	}
	for (let i = 1; i <= lastDateOfCurrWeekFull.getDate(); i++) {
		currWeek.push(i);
	}
	const weekInfo = {
		currWeek,
	};
	return addMonthAndYearOfCurrWeek(weekInfo, firstDateOfCurrWeekFull, lastDateOfCurrWeekFull);
}

function getWeekInfoBetweenCurrAndNextMonth(firstDateOfCurrWeekFull: Date, lastDateOfCurrWeekFull: Date): WeekInfo {
	const currWeek: number[] = [];

	const lastDateOfCurrMonth = new Date(
		firstDateOfCurrWeekFull.getFullYear(),
		firstDateOfCurrWeekFull.getMonth() + 1,
		0
	).getDate();

	for (let i = firstDateOfCurrWeekFull.getDate(); i <= lastDateOfCurrMonth; i++) {
		currWeek.push(i);
	}
	for (let i = 1; i <= lastDateOfCurrWeekFull.getDate(); i++) {
		currWeek.push(i);
	}
	const weekInfo = {
		currWeek,
	};
	return addMonthAndYearOfCurrWeek(weekInfo, firstDateOfCurrWeekFull, lastDateOfCurrWeekFull);
}

function addMonthAndYearOfCurrWeek(
	weekInfo: WeekInfo,
	firstDateOfCurrWeekFull: Date,
	lastDateOfCurrWeekFull: Date
): WeekInfo {
	weekInfo.firstMonth = firstDateOfCurrWeekFull.getMonth();
	weekInfo.firstMonthsYear = firstDateOfCurrWeekFull.getFullYear();
	weekInfo.lastMonth = lastDateOfCurrWeekFull.getMonth();
	weekInfo.lastMonthsYear = lastDateOfCurrWeekFull.getFullYear();
	return weekInfo;
}
