import fs from "fs";
import {Employee} from "./Employee";

export class EmployeeFileRepository {
    constructor(private filename: string) {}

    getEmployees(): Array<Employee> {
        const data = fs.readFileSync(this.filename, {encoding: 'utf8'});
        const employees: Array<Employee> = [];
        data.split(/\r?\n/).forEach((str: string) => {
            let employeeData = str.split(", ");
            const employee = new Employee(employeeData[1], employeeData[0],
                employeeData[2], employeeData[3]);
            employees.push(employee);
        });
        return employees;
    }
}
