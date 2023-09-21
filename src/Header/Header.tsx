import Navigation from "../Navigation/Navigation";
import { DateInfo } from "../types";

function Header({
	dateInfo,
	setCurrFullDate,
}: {
	dateInfo: DateInfo;
	setCurrFullDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
	return (
		<header>
			<img
				src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_7_2x.png"
				alt=""
				className="google-cal-logo"
			/>
			<h1>Calendar</h1>
			<button
				className="today"
				onClick={() => setCurrFullDate(new Date())}
			>
				Today
			</button>
			<Navigation
				type="main"
				dateInfo={dateInfo}
				setCurrFullDate={setCurrFullDate}
				className="icons"
			/>
		</header>
	);
}

export default Header;
