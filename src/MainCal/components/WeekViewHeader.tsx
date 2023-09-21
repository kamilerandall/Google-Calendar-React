import { DateInfo } from "../../types";

function WeekViewHeader({ dateInfo }: { dateInfo: DateInfo }) {
	return (
		<div className="week-view-header">
			<WeekDays dateInfo={dateInfo} />
			<NumWeekDays dateInfo={dateInfo} />
		</div>
	);
}

export default WeekViewHeader;

function WeekDays({ dateInfo }: { dateInfo: DateInfo }) {
	const namesOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const daysOfWeek = namesOfDays.map((dayName, i) => {
		if (
			i === new Date().getDay() &&
			dateInfo.currFullDate.getDate() === new Date().getDate() &&
			dateInfo.currFullDate.getMonth() === new Date().getMonth() &&
			dateInfo.currFullDate.getFullYear() === new Date().getFullYear()
		) {
			return (
				<li
					key={dayName}
					className="active"
				>
					{dayName}
				</li>
			);
		} else {
			return <li key={dayName}>{dayName}</li>;
		}
	});

	return <ul className="weekday">{...daysOfWeek}</ul>;
}

function NumWeekDays({ dateInfo }: { dateInfo: DateInfo }) {
	const daysOfMonth = dateInfo.currWeek.map((dayNum) => {
		if (
			dayNum === new Date().getDate() &&
			dateInfo.currFullDate.getMonth() === new Date().getMonth() &&
			dateInfo.currFullDate.getFullYear() === new Date().getFullYear()
		) {
			return (
				<li
					key={dayNum}
					className="active"
				>
					{dayNum}
				</li>
			);
		} else {
			return <li key={dayNum}>{dayNum}</li>;
		}
	});
	return <ul className="day-of-the-month">{...daysOfMonth}</ul>;
}
