import checkEventTimeValidity from "../Utils/checkTimeValidity";
import { changeExistingEvent, deleteEventFromDB, saveEvents } from "../services/events";
import { EventDetails, SavedEvent } from "../types";

function CreateEventModal({
	isModalVisible,
	eventDetails,
	setEventDetails,
	setSelectedSpotId,
	setIsModalVisible,
	eventId,
	setSavedEvents,
	savedEvents,
	isEventNew,
	selectedEvent,
	setSelectedEvent,
}: {
	isModalVisible: boolean;
	isEventNew: boolean;
	eventDetails: EventDetails;
	savedEvents: SavedEvent[];
	setSavedEvents: React.Dispatch<React.SetStateAction<SavedEvent[]>>;
	eventId: React.MutableRefObject<number>;
	setEventDetails: React.Dispatch<
		React.SetStateAction<{
			eventDate: string;
			eventStartTime: string;
			eventEndTime: string;
			eventTitle: string;
		}>
	>;
	setIsModalVisible: (b: boolean) => void;
	setSelectedSpotId: React.Dispatch<React.SetStateAction<string>>;
	selectedEvent: SavedEvent | undefined;
	setSelectedEvent: React.Dispatch<React.SetStateAction<SavedEvent | undefined>>;
}) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (isEventNew) {
			const currDetails = { ...eventDetails, [e.target.name]: e.target.value };
			setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
			setSelectedSpotId(`${currDetails.eventDate} ${currDetails.eventStartTime}`);
		} else {
			if (selectedEvent) {
				const location =
					e.target.name === "eventDate"
						? `${e.target.value} ${selectedEvent.eventDetails.eventStartTime}`
						: e.target.name === "eventStartTime"
						? `${selectedEvent.eventDetails.eventDate} ${e.target.value}`
						: selectedEvent.location;

				const updatedEvent = {
					...selectedEvent,
					eventDetails: { ...selectedEvent.eventDetails, [e.target.name]: e.target.value },
					location,
				};

				setSelectedEvent(updatedEvent);
				setEventDetails(updatedEvent.eventDetails);
				const editedEvents = savedEvents.map((event) => {
					return event.id === selectedEvent.id ? updatedEvent : event;
				});
				setSavedEvents(editedEvents);
			}
		}
	}

	function exitModal() {
		setIsModalVisible(false);
	}

	function deleteEvent() {
		if (selectedEvent) {
			const eventsWithoutDeleted = savedEvents.filter((event) => {
				if (event.id !== selectedEvent.id) {
					return event;
				}
			});
			setSavedEvents(eventsWithoutDeleted);
			setIsModalVisible(false);
			deleteEventFromDB(selectedEvent);
		}
	}

	function saveEvent(e: React.FormEvent) {
		e.preventDefault();
		if (isEventNew) {
			eventId.current++;
			const newEvent: SavedEvent = {
				id: eventId.current.toString(),
				location: `${eventDetails.eventDate} ${eventDetails.eventStartTime}`,
				eventDetails: eventDetails,
			};
			saveEvents(newEvent);
			setSavedEvents([...savedEvents, newEvent]);
		} else {
			if (selectedEvent) {
				changeExistingEvent(selectedEvent);
			}
		}

		setIsModalVisible(!isModalVisible);
	}

	return (
		<div
			className="event-creation"
			style={{ display: isModalVisible ? "block" : "none" }}
		>
			<div className="event-create-header">
				{!isEventNew && (
					<button
						onClick={deleteEvent}
						className="delete-btn"
					>
						<img
							className="delete-icon"
							src="https://img.freepik.com/free-icon/delete_318-901546.jpg?t=st=1692185590~exp=1692186190~hmac=a429ecc8ebdd0a468312198db6e415bcbab3fdd6ef6f614f4ac6176bd4f1307f"
							alt=""
							width="14px"
						/>
					</button>
				)}
				<button
					onClick={exitModal}
					className="exit-event-modal"
				>
					✕
				</button>
			</div>
			<form
				className="event-info"
				onSubmit={saveEvent}
			>
				<input
					type="text"
					name="eventTitle"
					className="event-title"
					placeholder="Add title"
					onChange={handleChange}
					value={eventDetails.eventTitle}
				/>
				<input
					type="date"
					name="eventDate"
					className="event-date"
					onChange={handleChange}
					value={eventDetails.eventDate}
				/>
				<input
					type="time"
					name="eventStartTime"
					className="event-start-time"
					step="900"
					onChange={handleChange}
					value={eventDetails.eventStartTime}
				/>

				<span>-</span>
				<input
					type="time"
					name="eventEndTime"
					className={`event-end-time-${checkEventTimeValidity(eventDetails)}`}
					onChange={handleChange}
					value={eventDetails.eventEndTime}
					step="900"
				/>
				<p className={`non-valid-time-msg-${checkEventTimeValidity(eventDetails)}`}>
					The event can't end earlier than it starts
				</p>
				<div className="event-create-footer">
					<button
						type="submit"
						aria-label="Save event"
						className="save-event-btn"
						onClick={saveEvent}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreateEventModal;
