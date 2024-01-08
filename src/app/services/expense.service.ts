import { Injectable } from '@angular/core';
import { ExpenseDto } from '../models/expenseDto';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AddExpenseDto } from '../models/AddExpenseDto';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpenseDetailsDto } from '../models/expenseDetailsDto';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  responseExpenseMock!:ExpenseDto;
  expenseMock!:AddExpenseDto;
  responseExpenseDetailsMock:ExpenseDetailsDto[]=[];
  responseExpenses:ExpenseDto[]=[];
  private sharedData: any;

  constructor(private http: HttpClient){}

  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }

  getAllExpenses(): Observable<ExpenseDto[]>{

    const url = `${environment.expensesUrl}/`;
    return this.http.get<ExpenseDto[]>(url);
  }

  getAllExpensesWithOutingId(outingId:string){
    console.log(this.responseExpenses.length);
    
      return this.responseExpenses;
  }

  getSingleExpenseWithOutingId(outingId:string){
    return this.responseExpenseMock;
  }

  setExpenseWithOutingId(result:AddExpenseDto){
    console.log(this.responseExpenses);
    console.log("ex service")
    this.expenseMock = result;
    for(let data of result.expenseDetails){
    this.responseExpenseDetailsMock.push({
      id:(Math.random()*10).toString(),
      expenseId:"1",
      userId:data.userId,
      name:data.name,
      bearerAmount:data.bearerAmount,
      beneficiaryAmount:data.beneficiaryAmount,
      status:data.status
    })
    }
    console.log(this.responseExpenses);
    // this.responseExpenseMock = {
    //   id:(Math.random()*10).toString(),
    //   description:result.description,
    //   totalAmount:result.totalAmount,
    //   date:result.date,
    //   expenseDetails:this.responseExpenseDetailsMock,
    //   creatorId:(Math.random()*10).toString()
    // }
    console.log(this.responseExpenses);
    this.responseExpenses.push(this.responseExpenseMock);
    console.log(this.responseExpenses);
    
  }
 
  addExpense(data: AddExpenseDto): Observable<any> {
    const url = `${environment.expensesUrl}/add`;
  console.log("::::::::::::::::::");
    return this.http.post<any>(url, data).pipe(
      tap((response : any) => {
        console.log('Response from the server:', response);
      },
      (error)=>{
        console.log('Error from the server:', error);
      })
    );
  }

  updateExpense(expenseId: string, expenseDto: ExpenseDto): Observable<ExpenseDto> {
    const url = `${environment.expensesUrl}/${expenseId}/update`;
    return this.http.put<ExpenseDto>(url, expenseDto);
  }

  deleteExpenseById(expenseId: string): Observable<void> {
    const url = `${environment.expensesUrl}/${expenseId}/delete`;
    return this.http.delete<void>(url);
  }

  approveStatus(expenseId: string, userId : string, acceptanceStatus: string){
    const approvalData = {
       expenseId , userId, acceptanceStatus
    }
    const url = `${environment.expensesUrl}/approve`;
    return this.http.post<any>(url, approvalData);
  }

  getAllExpensesInOuting(outingId:string):Observable<ExpenseDto[]>{
    const url =`${environment.expensesUrl}/outing/${outingId}`
    return this.http.get<ExpenseDto[]>(url);
  }
}
