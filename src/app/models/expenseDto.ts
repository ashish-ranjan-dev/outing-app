import { ExpenseDetailsDto } from "./expenseDetailsDto"

export interface ExpenseDto{
    id: string,
    description: string,
    totalAmount: number,
    expenseDetails: ExpenseDetailsDto[],
    date: Date,
    creatorId: string
    outingId:string
}
