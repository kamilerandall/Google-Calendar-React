import { useState } from "react";
import Header from "./Header";
import Body from "./Body";
import getDateCalculations from "./Utils/dateCalculations";

function App() {
	const [currFullDate, setCurrFullDate] = useState(new Date());
	const calculated = getDateCalculations(currFullDate);

	return (
		<>
			<Header
				dateInfo={calculated}
				setCurrFullDate={setCurrFullDate}
			/>
			<Body
				dateInfo={calculated}
				setCurrFullDate={setCurrFullDate}
			/>
		</>
	);
}

export default App;
