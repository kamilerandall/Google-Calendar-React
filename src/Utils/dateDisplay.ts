import { DateInfo } from "../types";

export default function getDateToDisplay(dateInfo: DateInfo, type: string) {
	const { currFullDate } = dateInfo;
	const { firstMonth, firstMonthsYear, lastMonth, lastMonthsYear } = dateInfo.monthsAndYearsOfCurrWeek;

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
	if (firstMonth !== undefined && lastMonth !== undefined) {
		if (type === "main") {
			const isTwoYearsAndMonths = firstMonth !== lastMonth && firstMonthsYear !== lastMonthsYear;
			const isTwoMonthsOneYear = firstMonth !== lastMonth && firstMonthsYear === lastMonthsYear;

			const twoMonthsAndYears = `${months[firstMonth]} ${firstMonthsYear} - ${months[lastMonth]} ${lastMonthsYear}`;
			const twoMonthsOneYear = `${months[firstMonth]} - ${months[lastMonth]} ${currFullDate.getFullYear()}`;
			const oneMonthOneYear = `${months[currFullDate.getMonth()]} ${currFullDate.getFullYear()}`;
			return isTwoYearsAndMonths ? twoMonthsAndYears : isTwoMonthsOneYear ? twoMonthsOneYear : oneMonthOneYear;
		} else {
			return `${months[firstMonth]} ${firstMonthsYear}`;
		}
	}
}
