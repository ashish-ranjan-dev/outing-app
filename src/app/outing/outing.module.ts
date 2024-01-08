import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutingRoutingModule } from './outing-routing.module';
import { OutingsComponent } from './outings/outings.component';
import { OutingListComponent } from './outing-list/outing-list.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CreateOutingComponent } from './create-outing/create-outing.component';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OutingDetailComponent } from './outing-detail/outing-detail.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ExpensesComponent } from '../expenses/expenses/expenses.component';
import { ExpensesModule } from '../expenses/expenses.module';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { MenuModule } from 'primeng/menu';
import { UpdateOutingComponent } from './update-outing/update-outing.component';
import { AddFriendComponent } from './add-friend/add-friend.component';

@NgModule({
  declarations: [
    OutingsComponent,
    OutingListComponent,
    CreateOutingComponent,
    OutingDetailComponent,
    UpdateOutingComponent,
    AddFriendComponent,
    // ExpensesComponent
  ],
  imports: [
    CommonModule,
    OutingRoutingModule,
    ToastModule,
    ButtonModule,
    DynamicDialogModule,
    CalendarModule,
    MultiSelectModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    ChipModule,
    ConfirmDialogModule,
    SlideMenuModule,
    ExpensesModule,
    TableModule,
    TagModule,
    DataViewModule,
    MenuModule
  ]
})
export class OutingModule { }
