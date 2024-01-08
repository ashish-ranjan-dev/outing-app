export interface ExpenseDetailsDto{
    id:string,
    expenseId: string,
    userId: string,
    name: string,
    bearerAmount:number,
    beneficiaryAmount:number,
    status: string
}