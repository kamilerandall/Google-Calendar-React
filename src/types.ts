export interface DateInfo {
	currYear: number;
	currMonth: number;
	currDateOfMonth: number;
	currMonthInWords: string;
	lastDateOfPrevMonth: number;
	lastDayOfPrevMonth: number;
	lastDateOfTheMonth: number;
	lastDayOfTheMonth: number;
	currFullDate: Date;
	currWeek: number[];
	monthsAndYearsOfCurrWeek: {
		firstMonth?: number;
		firstMonthsYear?: number;
		lastMonth?: number;
		lastMonthsYear?: number;
	};
}

export interface WeekInfo {
	currWeek: number[];
	firstDateOfCurrWeekFull?: Date;
	firstMonth?: number;
	firstMonthsYear?: number;
	lastDateOfCurrWeekFull?: Date;
	lastMonth?: number;
	lastMonthsYear?: number;
}

export interface MonthsAndYearsOfCurrWeek {
	firstMonth: number;
	firstMonthsYear: number;
	lastMonth: number;
	lastMonthsYear: number;
}

export interface OptionalMonthsAndYearsOfCurrWeek {
	firstMonth?: number;
	firstMonthsYear?: number;
	lastMonth?: number;
	lastMonthsYear?: number;
}

export interface EventDetails {
	eventDate: string;
	eventStartTime: string;
	eventEndTime: string;
	eventTitle: string;
}

export interface SavedEvent {
	id: string;
	location: string;
	eventDetails: EventDetails;
}
