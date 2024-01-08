import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OutingsComponent} from "./outings/outings.component";
import { OutingListComponent } from './outing-list/outing-list.component';
import { OutingDetailComponent } from './outing-detail/outing-detail.component';

const routes: Routes = [
  {path:'', component:OutingListComponent},
  {path:':id',component:OutingDetailComponent}
  //TODO
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutingRoutingModule { }
