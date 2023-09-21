import checkEventTimeValidity from "../Utils/checkTimeValidity";
import { saveEvents } from "../services/events";
import { EventDetails, SavedEvent } from "../types";

function CreateEventModal({
	isModalVisible,
	eventDetails,
	setEventDetails,
	setSelectedSpotId,
	setIsModalVisible,
}: {
	isModalVisible: boolean;
	eventDetails: EventDetails;
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
}) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const currDetails = { ...eventDetails, [e.target.name]: e.target.value };
		setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
		setSelectedSpotId(`${currDetails.eventDate} ${currDetails.eventStartTime}`);
	}

	function exitModal() {
		console.log("exit");
	}

	function saveEvent(e: React.FormEvent) {
		e.preventDefault();
		const newEvent: SavedEvent = {
			id: Math.random().toString(),
			location: `${eventDetails.eventDate} ${eventDetails.eventStartTime}`,
			eventDetails: eventDetails,
		};
		saveEvents(newEvent);
		setIsModalVisible(!isModalVisible);
	}

	return (
		<div
			className="event-creation"
			style={{ display: isModalVisible ? "block" : "none" }}
		>
			<div className="event-create-header">
				<button className="delete-btn">
					<img
						className="delete-icon"
						src="https://img.freepik.com/free-icon/delete_318-901546.jpg?t=st=1692185590~exp=1692186190~hmac=a429ecc8ebdd0a468312198db6e415bcbab3fdd6ef6f614f4ac6176bd4f1307f"
						alt=""
						width="14px"
					/>
				</button>
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
