import { OutingDetailsDto } from "./outingDetailsDto";

export interface ResponseOutingDto{
    id:string
    description: string,
    outingDetails: OutingDetailsDto[],
    date: Date,
    outingName: string,
    creatorId:string
}