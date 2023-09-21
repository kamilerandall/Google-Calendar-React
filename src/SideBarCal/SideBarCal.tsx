import { DateInfo } from "../types";
import Navigation from "../Navigation";
import MonthOfSmallCal from "./components/MonthDays";

function SideBarCal({
	dateInfo,
	setCurrFullDate,
}: {
	dateInfo: DateInfo;
	setCurrFullDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
	return (
		<div className="side-bar">
			<div className="month-view">
				<div className="side-calendar-header">
					<Navigation
						setCurrFullDate={setCurrFullDate}
						type="side"
						dateInfo={dateInfo}
						className="icons small-cal-icons"
					/>
				</div>
				<div className="side-bar-calendar">
					<WeekDays />
					<MonthOfSmallCal dateInfo={dateInfo} />
				</div>
			</div>
		</div>
	);
}

export default SideBarCal;

function WeekDays() {
	const namesOfDays = ["S", "M", "T", "W", "T", "F", "S"];
	const daysOfWeek = namesOfDays.map((dayName, i) => {
		return <li key={`${dayName}${i}`}>{dayName}</li>;
	});

	return <ul className="weekday">{...daysOfWeek}</ul>;
}
