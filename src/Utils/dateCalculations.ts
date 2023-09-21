import calculateCurrWeek from "./currWeekCalculations";

export default function getDateCalculations(currFullDate: Date) {
	const currYear = currFullDate.getFullYear();
	const currMonth = currFullDate.getMonth();
	const currDateOfMonth = currFullDate.getDate();
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
	const lastDayOfPrevMonth = new Date(currYear, currMonth - 1, lastDateOfPrevMonth).getDay();
	const lastDateOfTheMonth = new Date(currYear, currMonth + 1, 0).getDate();
	const lastDayOfTheMonth = new Date(currYear, currMonth, lastDateOfTheMonth).getDay();
	const currWeek = calculateCurrWeek(currFullDate).currWeek;
	const monthsAndYearsOfCurrWeek = {
		firstMonth: calculateCurrWeek(currFullDate).firstMonth,
		firstMonthsYear: calculateCurrWeek(currFullDate).firstMonthsYear,
		lastMonth: calculateCurrWeek(currFullDate).lastMonth,
		lastMonthsYear: calculateCurrWeek(currFullDate).lastMonthsYear,
	};

	return {
		currYear,
		currMonth,
		currDateOfMonth,
		currMonthInWords: months[currMonth],
		lastDateOfPrevMonth,
		lastDayOfPrevMonth,
		lastDateOfTheMonth,
		lastDayOfTheMonth,
		currFullDate,
		currWeek,
		monthsAndYearsOfCurrWeek,
	};
}
