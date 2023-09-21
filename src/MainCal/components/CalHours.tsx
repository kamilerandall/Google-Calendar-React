function CalHours() {
	const hours = [];
	for (let i = 1; i <= 12; i++) {
		const value = i < 12 ? i + "AM" : i + "PM";
		hours.push(
			<li
				className="hour"
				key={value}
			>
				{value}
			</li>
		);
	}
	for (let i = 1; i < 12; i++) {
		const value = i + "PM";
		hours.push(
			<li
				className="hour"
				key={value}
			>
				{value}
			</li>
		);
	}

	return <ul className="cal-hours">{...hours}</ul>;
}

export default CalHours;
