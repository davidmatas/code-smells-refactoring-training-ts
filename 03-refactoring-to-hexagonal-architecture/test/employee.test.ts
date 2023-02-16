import {Employee} from "../src/Employee";
import {DateRepresentation} from "./DateRepresentation";

describe('Employee', () => {

  it('birthday', () => {
    const employee = new Employee("foo", "bar", DateRepresentation.toOurDate("1990/01/31"), "a@b.c");

    expect(employee.isBirthday(DateRepresentation.toOurDate("2008/01/30"))).toBeFalsy();
    expect(employee.isBirthday(DateRepresentation.toOurDate("2008/01/31"))).toBeTruthy();
  });

});

