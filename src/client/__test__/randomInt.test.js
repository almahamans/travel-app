import { randomInt } from '../js/generateTripCard'

describe('Testing randomInt function', () => {
 test('Check the randomInt function', () => {
  expect(randomInt(10) < 10).toBe(true)
 })
})