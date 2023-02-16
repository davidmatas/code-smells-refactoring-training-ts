import {OurDate} from "../src/OurDate";

export class DateRepresentation {
    static toOurDate(dateString: string) {
        return new OurDate(new Date(dateString))
    }
}
