import { test, expect, vi } from 'vitest';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '.'

test('loads and displays greeting', async () => {
  // ARRANGE
  const setCurrFullDate = vi.fn();
  const date = new Date();
  date.setHours(0, 0, 0, 0)

  render(<Navigation className="main" dateInfo={{
	currYear: 2023,
	currMonth: 9,
	currDateOfMonth: 21,
	currMonthInWords: "September",
	lastDateOfPrevMonth: 31,
	lastDayOfPrevMonth: 4,
	lastDateOfTheMonth: 30,
	lastDayOfTheMonth: 6,
	currFullDate: date,
	currWeek: [18, 19, 20, 21, 22, 23, 24, 25],
	monthsAndYearsOfCurrWeek: {
	}

  }}
  type="main"
  setCurrFullDate={setCurrFullDate}

  />)

  // ACT
  await userEvent.click(screen.getByText('>'))

  // ASSERT
  expect(setCurrFullDate ).toBeCalledTimes(1);
  expect(setCurrFullDate ).toBeCalledWith(new Date('2023-09-27T21:00:00.000Z'));

  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // expect(screen.getByRole('button')).toBeDisabled()
})
