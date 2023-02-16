import {FileEmployeeRepository} from "../src/FileEmployeeRepository";
import {DateRepresentation} from "./DateRepresentation";

describe('FileEmployeeRepository', () => {
    it('returns employees with the birhtday date', () => {
        const filename = "test/resources/employee_data.txt";
        const employeeRepository = new FileEmployeeRepository(filename);
        const employees = employeeRepository.getAll();
        const employee = employees[0];
        const givenBirthday = DateRepresentation.toOurDate('1982/10/08');

        expect(employee.isBirthday(givenBirthday)).toBe(true);
    });

    it('raises an error if the birthday date is invalid', () => {
        const employeeRepository = new FileEmployeeRepository('test/resources/employee_data_invalid.txt');

        expect(() => employeeRepository.getAll()).toThrowError(new Error("ParseException"));
    })

})
