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
