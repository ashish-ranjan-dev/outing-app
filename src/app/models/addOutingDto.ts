import { AddOutingDetailsDto } from './addOutingDetailsDto'

export interface AddOutingDto{
    description: string,
    // outingDetails: AddOutingDetailsDto[],
    userIds:string[],
    date: Date,
    outingName: string
}