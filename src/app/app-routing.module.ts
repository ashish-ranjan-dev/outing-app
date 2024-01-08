import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from "./services/auth.service";


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  //TODO: for outing/*
  {
    path: 'user',
    canActivate: [() => inject(AuthService).isNotLoggedInOrElseNavigateToHome()],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'friendship', 
    canActivate: [() => inject(AuthService).isLoggedInOrElseNavigateToSignin()],
    loadChildren: () => import('./friendship/friendship.module').then(m=> m.FriendshipModule) // Load the 'friendship' module
  },{
    path: 'outing',
    canActivate: [() => inject(AuthService).isLoggedInOrElseNavigateToSignin()],
    loadChildren: () => import('./outing/outing.module').then(m => m.OutingModule),
  }
  ,{
    path: 'home',
    canActivate: [() => inject(AuthService).isLoggedInOrElseNavigateToSignin()],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  } ,{
    path: 'expenses',
    canActivate: [() => inject(AuthService).isLoggedInOrElseNavigateToSignin()],
    loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
