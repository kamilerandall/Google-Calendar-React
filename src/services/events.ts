import { SavedEvent } from "../types";

const url = "http://localhost:3000/events";

export async function getEvents() {
	try {
		const response = await fetch(url);
		if (response.ok) {
			return response.json();
		}
	} catch (error) {
		console.log(error);
	}
}

export async function saveEvents(newEvent: SavedEvent) {
	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(newEvent),
			headers: {
				"Content-type": "application/json",
			},
		});
		if (response.ok) {
			return response.json();
		}
	} catch (error) {
		console.log(error);
	}
}

export async function changeExistingEvent(updatedEvent: SavedEvent) {
	try {
		const response = await fetch(`${url}/${updatedEvent.id}`, {
			method: "PUT",
			body: JSON.stringify(updatedEvent),
			headers: {
				"Content-type": "application/json",
			},
		});
		if (response.ok) {
			return response.json();
		}
	} catch (error) {
		console.log(error);
	}
}

export async function deleteEventFromDB(selectedEvent: SavedEvent) {
	try {
		const response = await fetch(`${url}/${selectedEvent.id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
		if (response.ok) {
			return response.json();
		}
	} catch (error) {
		console.log(error);
	}
}
