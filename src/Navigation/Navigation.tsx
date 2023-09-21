import { DateInfo } from "../types";
import { SyntheticEvent } from "react";
import getDateToDisplay from "../Utils/dateDisplay";

function Navigation({
	className,
	dateInfo,
	type,
	setCurrFullDate,
}: {
	className: string;
	dateInfo: DateInfo;
	type: string;
	setCurrFullDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
	function handleClick(e: SyntheticEvent) {
		const startDateFull = dateInfo.currFullDate;
		const button = e.target as HTMLElement;
		if (button.className.includes("prev")) {
			type === "main" ? startDateFull.setDate(startDateFull.getDate() - 7) : startDateFull.setMonth(dateInfo.currMonth - 1);
			setCurrFullDate(new Date(startDateFull));
		} else {
			type === "main" ? startDateFull.setDate(startDateFull.getDate() + 7) : startDateFull.setMonth(dateInfo.currMonth + 1);
			setCurrFullDate(new Date(startDateFull));
		}
	}

	return (
		<>
			<div className={className}>
				<button
					onClick={handleClick}
					className="date-reg-icon prev"
				>
					&lt;
				</button>
				<button
					onClick={handleClick}
					className="date-reg-icon next"
				>
					&gt;
				</button>
			</div>
			<h2 className="current-date">{getDateToDisplay(dateInfo, type)}</h2>
		</>
	);
}

export default Navigation;
