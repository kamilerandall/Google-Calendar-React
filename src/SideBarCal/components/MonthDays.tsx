import { DateInfo } from "../../types";

function MonthOfSmallCal({ dateInfo }: { dateInfo: DateInfo }) {
	return <ul className="month-cal-days">{...DatesForSmallCal(dateInfo)}</ul>;
}

export default MonthOfSmallCal;

function DatesForSmallCal(dateInfo: DateInfo) {
	const monthDays = [];
	const {
		lastDateOfPrevMonth,
		lastDayOfPrevMonth,
		currDateOfMonth,
		currMonth,
		currYear,
		lastDayOfTheMonth,
		lastDateOfTheMonth,
	} = dateInfo;

	for (let i = lastDateOfPrevMonth - lastDayOfPrevMonth; i <= lastDateOfPrevMonth; i++) {
		monthDays.push(
			<li
				key={`${currYear}-${currMonth - 1}-${i}`}
				className="inactive"
			>
				{i}
			</li>
		);
	}
	// days of this month
	for (let i = 1; i <= lastDateOfTheMonth; i++) {
		if (i === currDateOfMonth) {
			monthDays.push(
				<li
					key={`${currYear}-${currMonth}-${i}`}
					className="active"
				>
					{i}
				</li>
			);
		} else {
			monthDays.push(<li key={`${currYear}-${currMonth}-${i}`}>{i}</li>);
		}
	}
	// visible inactive days of next month
	for (let i = 1; i < 7 - lastDayOfTheMonth; i++) {
		monthDays.push(
			<li
				key={`${currYear}-${currMonth + 1}-${i}`}
				className="inactive"
			>
				{i}
			</li>
		);
	}
	return monthDays;
}
