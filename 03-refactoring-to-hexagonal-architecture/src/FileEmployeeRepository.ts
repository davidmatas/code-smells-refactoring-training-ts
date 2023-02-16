import fs from "fs";
import {Employee} from "./Employee";
import {OurDate} from "./OurDate";

export interface EmployeeRepository {
    getAll(): Array<Employee>;
}

export class FileEmployeeRepository implements EmployeeRepository {
    constructor(private filename: string) {}

    getAll(): Array<Employee> {
        const data = fs.readFileSync(this.filename, {encoding: 'utf8'});
        const employees: Array<Employee> = [];

        data.split(/\r?\n/).slice(1).forEach((str: string) => {
            let [lastname, firstname, dateStr, email ] = str.split(", ");
            const birthDate = this.parseDate(dateStr);
            const employee = new Employee(firstname, lastname,
                birthDate, email);
            employees.push(employee);
        });

        return employees;
    }

    private parseDate(yyyyMMdd: string): OurDate {
        const [year, month, day] = yyyyMMdd.split("/");
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        if (date.toString() === 'Invalid Date') {
            throw new Error("ParseException");
        }
        return new OurDate(date);
    }
}
