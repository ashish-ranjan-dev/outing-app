import { OutingDetailsDto } from "./outingDetailsDto";
import { UserProfile } from "./userProfile";

export interface OutingDto{
    id:string,
    description: string,
    userIds:string[],
    date: Date,
    outingName: string,
    creatorId:UserProfile
}