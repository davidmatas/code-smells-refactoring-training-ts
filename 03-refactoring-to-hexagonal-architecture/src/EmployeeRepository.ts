import fs from "fs";
import {Employee} from "./Employee";

export class EmployeeRepository {
    getEmployees(fileName: string): Array<Employee> {
        const data = fs.readFileSync(fileName, {encoding: 'utf8'});
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
