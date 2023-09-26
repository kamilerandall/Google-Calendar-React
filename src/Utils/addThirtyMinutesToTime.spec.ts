import { it ,expect } from 'vitest'
import { getFormatedHour } from './addThirtyMinutesToTime';

it('returns 01:00 for 1', () => {
  // Arrange
  const hour = 1;

  // Act
  const formatted = getFormatedHour(hour);

  // Assert
  expect(formatted).toBe('01:00')

})

it('returns 10:00 for 10', () => {
  // Arrange
  const hour = 10;

  // Act
  const formatted = getFormatedHour(hour);

  // Assert
  expect(formatted).toBe('10:00')
})
