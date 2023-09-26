import { useState, useEffect, useRef } from "react";
import CreateEventModal from "../EventCreateModal";
import CalHours from "./components/CalHours";
import WeekViewHeader from "./components/WeekViewHeader";
import WeekViewGrid from "./components/WeekViewGrid";
import { DateInfo, EventDetails, SavedEvent } from "../types";
import addThirtyMinutes from "../Utils/addThirtyMinutesToTime";
import { getEvents } from "../services/events";

function MainCal({ dateInfo }: { dateInfo: DateInfo }) {
	const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
	const [isEventNew, setIsEventNew] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedSpotId, setSelectedSpotId] = useState("");
	const [selectedEvent, setSelectedEvent] = useState<SavedEvent>();
	const [eventDetails, setEventDetails] = useState<EventDetails>({
		eventDate: "",
		eventStartTime: "",
		eventEndTime: "",
		eventTitle: "",
	});
	const eventId = useRef(0);

	useEffect(() => {
		async function retrieveEvents() {
			const retrievedEvents = await getEvents();
			setSavedEvents(retrievedEvents);
			eventId.current = Math.max(...retrievedEvents.map((event: SavedEvent) => +event.id));
		}
		retrieveEvents();
	}, []);

	function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
		setEventDetails(getEventDateAndTimeFromId(e.target.id));
		setIsModalVisible(!isModalVisible);
		if (isModalVisible) {
			setSelectedSpotId("");
		} else {
			setSelectedSpotId(e.target.id);
		}
		if (e.target.id.includes("event")) {
			setIsEventNew(false);
			const currEvent = savedEvents.find((event) => `${event.location} event` === e.target.id);
			setSelectedEvent(currEvent);
			if (currEvent) {
				setEventDetails(currEvent.eventDetails);
			}
		} else {
			setIsEventNew(true);
		}
	}

	return (
		<div className="main-part">
			<CalHours />
			<div className="week-view">
				<WeekViewHeader dateInfo={dateInfo} />
				<WeekViewGrid
					savedEvents={savedEvents}
					eventDetails={eventDetails}
					onClick={handleClick}
					dateInfo={dateInfo}
					isModalVisible={isModalVisible}
					selectedSpotId={selectedSpotId}
				/>
			</div>
			<CreateEventModal
				setSelectedEvent={setSelectedEvent}
				selectedEvent={selectedEvent}
				isEventNew={isEventNew}
				savedEvents={savedEvents}
				setSavedEvents={setSavedEvents}
				eventId={eventId}
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
