import { EventDetails } from "../types";
import addThirtyMinutes from "./addThirtyMinutesToTime";

export default function addTitleToCreatedEvent(eventDetails: EventDetails) {
	const { eventEndTime, eventStartTime, eventTitle } = eventDetails;
	const title = eventTitle === "" ? "(no title)" : eventTitle;

	if (eventEndTime !== addThirtyMinutes(eventStartTime)) {
		return `${title} |\n ${eventStartTime} - ${eventEndTime}`;
	} else {
		return `${title} | ${eventStartTime}`;
	}
}
