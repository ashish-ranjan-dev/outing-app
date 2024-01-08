import { UserProfile } from "./userProfile";

export interface OutingDetailsDto{
    id:string,
    outingId:string,
    user:UserProfile,
    status:string
}