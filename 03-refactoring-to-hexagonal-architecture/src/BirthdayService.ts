import {OurDate} from "./OurDate";
import nodemailer, {Transporter} from "nodemailer";
import {MailOptions} from "nodemailer/lib/smtp-transport";
import {FileEmployeeRepository, EmployeeRepository} from "./FileEmployeeRepository";
import {Employee} from "./Employee";

export class BirthdayService {
    constructor(private employeeRepository: EmployeeRepository) {}

    public sendGreetings(ourDate: OurDate, smtpHost: string, smtpPort: number) {
        const employees = this.employeeRepository.getAll();

        employees.forEach(employee => {
            if (employee.isBirthday(ourDate)) {
                const {body, subject, recipient} = this.buildMessage(employee);
                this.sendTheMessage(smtpHost, smtpPort, "sender@here.com", subject,
                    body, recipient);
            }
        })

    }

    private buildMessage(employee: Employee) {
        const recipient = employee.getEmail();
        const body = "Happy Birthday, dear %NAME%!".replace("%NAME%",
            employee.getFirstName());
        const subject = "Happy Birthday!";
        return {body, subject, recipient};
    }

    private sendTheMessage(smtpHost: string, smtpPort: number, sender: string,
                           subject: string, body: string, recipient: string) {
        // Create a mail session
        const transport = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
        })

        // Construct the message
        const msg = {
            from: sender,
            to: recipient,
            subject: subject,
            text: body
        };

        // Send the message
        this.sendMessage(msg, transport);
    }

    // made protected for testing :-(
    protected sendMessage(msg: MailOptions, transport: Transporter) {
        transport.sendMail(msg, (err) => {
            if (err) throw new Error("not send");
        });
    }

    public main(args: string) {
        const employeeRepository = new FileEmployeeRepository("employee_data.txt");
        const service = new BirthdayService(employeeRepository);
        try {
            service.sendGreetings(new OurDate(new Date("2008/10/08")), "localhost", 25);
        } catch (e) {
            console.log(e);
        }
    }
}
