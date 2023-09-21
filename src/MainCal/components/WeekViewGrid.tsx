import { SyntheticEvent, useEffect, useState } from "react";
import { DateInfo, EventDetails, SavedEvent } from "../../types";
import getFormatedDateForId from "../../Utils/dateFormationForId";
import addTitleToCreatedEvent from "../../Utils/addTitleToEventSlot";
import changeEventHeight from "../../Utils/changeEventSlotHeight";
import { getEvents } from "../../services/events";

function WeekViewGrid({
	dateInfo,
	onClick,
	eventDetails,
	isModalVisible,
	selectedSpotId,
}: {
	dateInfo: DateInfo;
	onClick(e: SyntheticEvent): void;
	eventDetails: EventDetails;
	isModalVisible: boolean;
	selectedSpotId: string;
}) {
	const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);

	useEffect(() => {
		async function retrieveEvents() {
			const retrievedEvents = await getEvents();

			setSavedEvents(retrievedEvents);
		}
		retrieveEvents();
	}, []);
	console.log(savedEvents);

	const grid = [];

	for (let hour = 0; hour < 24; hour++) {
		for (const day of dateInfo.currWeek) {
			const id = getFormatedDateForId(dateInfo.monthsAndYearsOfCurrWeek, day, hour);

			grid.push(
				<div
					id={id}
					key={id}
					className="cell"
				>
					{selectedSpotId === id && isModalVisible && (
						<div
							className="created-event"
							key={`${selectedSpotId} event`}
							id={`${selectedSpotId} event`}
							style={{ height: `${changeEventHeight(eventDetails)}` }}
						>
							{addTitleToCreatedEvent(eventDetails)}
						</div>
					)}
					{savedEvents.map(
						(event) => {        
							return (
								event.location === id && (
									<div
										className="created-event"
										key={`${event.location} event`}
										id={`${event.location} event`}
										style={{ height: `${changeEventHeight(event.eventDetails)}` }}
									>
										{addTitleToCreatedEvent(event.eventDetails)}
									</div>
								)
							);
						}
					)}
				</div>
			);
		}
	}

	return (
		<div
			onClick={onClick}
			className="by-the-hour"
		>
			{...grid}
		</div>
	);
}

export default WeekViewGrid;
