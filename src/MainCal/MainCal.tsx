import { useState } from "react";
import CreateEventModal from "../EventCreateModal";
import CalHours from "./components/CalHours";
import WeekViewHeader from "./components/WeekViewHeader";
import WeekViewGrid from "./components/WeekViewGrid";
import { DateInfo } from "../types";
import addThirtyMinutes from "../Utils/addThirtyMinutesToTime";

function MainCal({ dateInfo }: { dateInfo: DateInfo }) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedSpotId, setSelectedSpotId] = useState("");
	const [eventDetails, setEventDetails] = useState({
		eventDate: "",
		eventStartTime: "",
		eventEndTime: "",
		eventTitle: "",
	});

	function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
		setEventDetails(getEventDateAndTimeFromId(e.target.id));
		setIsModalVisible(!isModalVisible);
		if (isModalVisible) {
			setSelectedSpotId("");
		} else {
			setSelectedSpotId(e.target.id);
		}
	}

	return (
		<div className="main-part">
			<CalHours />
			<div className="week-view">
				<WeekViewHeader dateInfo={dateInfo} />
				<WeekViewGrid
					eventDetails={eventDetails}
					onClick={handleClick}
					dateInfo={dateInfo}
					isModalVisible={isModalVisible}
					selectedSpotId={selectedSpotId}
				/>
			</div>
			<CreateEventModal
				setIsModalVisible={setIsModalVisible}
				setSelectedSpotId={setSelectedSpotId}
				eventDetails={eventDetails}
				isModalVisible={isModalVisible}
				setEventDetails={(eventDetails) => setEventDetails(eventDetails)}
			/>
		</div>
	);
}

export default MainCal;

function getEventDateAndTimeFromId(id: string) {
	const [date, time] = id.split(" ");
	return {
		eventTitle: "",
		eventDate: date,
		eventStartTime: time,
		eventEndTime: addThirtyMinutes(time),
	};
}
