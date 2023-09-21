import { EventDetails } from "../types";

export default function checkEventTimeValidity(eventDetails: EventDetails) {
	const { eventStartTime, eventEndTime } = eventDetails;
	// const nonValidTimeMsg = document.querySelector(".non-valid-time-msg");
	// const saveBtn = document.querySelector(".save-event-btn");
	const nonValidEndTime = eventStartTime > eventEndTime;
	if (nonValidEndTime) {
		// nonValidTimeMsg.style.display = "block";
		// eventEndTime.classList.add("non-valid");
		return "non-valid";
		// saveBtn.classList.add("disabled");
		// saveBtn.disabled = true;
	}
	else {
        return "valid";
	// nonValidTimeMsg.style.display = "none";
	// eventEndTime.classList.remove("non-valid");
	// saveBtn.classList.remove("disabled");
	// saveBtn.disabled = false;
	}
}
