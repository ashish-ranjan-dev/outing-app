export interface AddExpenseDetailsDto{
    userId: string,
    name: string,
    bearerAmount: number,
    beneficiaryAmount: number,
    status : string
}