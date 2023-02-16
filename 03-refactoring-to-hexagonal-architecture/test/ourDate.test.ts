import {OurDate} from "../src/OurDate";
import {DateRepresentation} from "./DateRepresentation";

describe('OurDate', () => {

  it('getters', () => {
    const ourDate = DateRepresentation.toOurDate("1789/01/24");

    expect(1).toEqual(ourDate.getMonth())
    expect(24).toEqual(ourDate.getDay())
  });

  it('is same date', () => {
    const ourDate = DateRepresentation.toOurDate("1789/01/24");
    const sameDay = DateRepresentation.toOurDate("2001/01/24");
    const notSameDay = DateRepresentation.toOurDate("1789/01/25");
    const notSameMonth = DateRepresentation.toOurDate("1789/02/25");

    expect(ourDate.isSameDay(sameDay)).toBeTruthy(); //"same"
    expect(ourDate.isSameDay(notSameDay)).toBeFalsy(); //"not same day"
    expect(ourDate.isSameDay(notSameMonth)).toBeFalsy(); //"not same month"
  });

});
