import MainCal from "../MainCal";
import SideBarCal from "../SideBarCal/SideBarCal";
import { DateInfo } from "../types";

function Body({
	dateInfo,
	setCurrFullDate,
}: {
	dateInfo: DateInfo;
	setCurrFullDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
	return (
		<main>
			<SideBarCal
				setCurrFullDate={setCurrFullDate}
				dateInfo={dateInfo}
			/>
			<MainCal dateInfo={dateInfo} />
		</main>
	);
}

export default Body;
