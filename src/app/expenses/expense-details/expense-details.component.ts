import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
  providers: [DatePipe]
})

export class ExpenseDetailsComponent {

   currentExpense: any;
   beautifyDate!: string;

   constructor(private datePipe: DatePipe, public config: DynamicDialogConfig, private dialogConfig: DynamicDialogConfig
    ,private dialogRef: DynamicDialogRef){
     this.currentExpense = this.config.data.data;
     this.beautifyDate = this.datePipe.transform(this.config.data.data.date, 'dd MMM yyyy HH:mm')!;
     console.log(this.beautifyDate);
   }
}
