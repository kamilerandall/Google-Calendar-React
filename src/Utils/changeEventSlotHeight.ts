import { EventDetails } from "../types";

export default function changeEventHeight(eventDetails: EventDetails) {
	const percentage = (100 * calculateEventTimeInMin(eventDetails)) / 60;
	return `${percentage}%`;
}

function calculateEventTimeInMin(eventDetails: EventDetails) {
	const { eventStartTime, eventEndTime } = eventDetails;
	const [startHour, startMin] = eventStartTime.split(":");
	const [endHour, endMin] = eventEndTime.split(":");
	const hourDif = +endHour - +startHour;
	const minDif = +endMin - +startMin;
	const eventTimeInMins = hourDif * 60 + minDif;
	return eventTimeInMins;
}
