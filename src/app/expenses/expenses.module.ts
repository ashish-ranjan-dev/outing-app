import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {FormsModule} from "@angular/forms";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {InputTextModule} from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuModule } from 'primeng/menu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [ExpensesComponent, AddExpenseComponent, UpdateExpenseComponent, ExpenseDetailsComponent],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    HttpClientModule,
    DataViewModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    InputNumberModule,
    MenuModule,
    InputTextareaModule,
    ConfirmDialogModule,
    TagModule,
    TooltipModule,
    PaginatorModule,
    ChipModule
  ],
  exports:[
    ExpensesComponent
  ]
})
export class ExpensesModule { }
