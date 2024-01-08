import { AddExpenseDetailsDto } from "./addExpenseDetailsDto";

export interface AddExpenseDto{
    description: string,
    totalAmount: number,
    expenseDetails: AddExpenseDetailsDto[],
    date: Date
    outingId:string
}