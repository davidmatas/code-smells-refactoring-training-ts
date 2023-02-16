import {BirthdayService} from "../src/BirthdayService";
import {OurDate} from "../src/OurDate";
import {Transporter} from "nodemailer";
import {MailOptions} from "nodemailer/lib/smtp-transport";
import {FileEmployeeRepository, EmployeeRepository} from "../src/FileEmployeeRepository";

describe('Acceptance', () => {

    const SMTP_PORT: number = 25;
    const fileName = "test/resources/employee_data.txt";
    let messagesSent: Array<MailOptions>;
    let service: BirthdayService;
    let employeeRepository: EmployeeRepository;

    beforeEach(() => {
        messagesSent = new Array<MailOptions>();
        employeeRepository = new FileEmployeeRepository(fileName);

        service = new class extends BirthdayService {
            protected sendMessage(msg: MailOptions, transport: Transporter) {
                messagesSent.push(msg);
            }
        }(employeeRepository);
    })

    it('base scenario', () => {
        service.sendGreetings(new OurDate("2008/10/08"), "localhost", SMTP_PORT);

        expect(messagesSent.length).toEqual(1);
        const message = messagesSent[0];
        expect(message.text).toEqual("Happy Birthday, dear John!",);
        expect(message.subject).toEqual("Happy Birthday!");
        expect(message.to).toEqual("john.doe@foobar.com");
    });

    it('will not send emails when nobodys birthday', () => {
        service.sendGreetings(new OurDate("2008/01/01"), "localhost", SMTP_PORT);

        expect(messagesSent.length).toEqual(0);
    });
});
