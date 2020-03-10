import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetBoardingComponent } from './pet-boarding.component';
import { BlistComponent } from './components/blist/blist.component';
import { BdetailsComponent } from './components/bdetails/bdetails.component';
import { BnewComponent } from './components/bnew/bnew.component';
import { AuthGuard } from 'src/app/auth.guard';


const routes: Routes = [
  {path:'',component:PetBoardingComponent},
  {path:'boardinglist',component:BlistComponent},
  {path:'boardingdetails/:id',component:BdetailsComponent},
  {path:'new',component:BnewComponent, canActivate: [AuthGuard]},
  // {path:'boardingdetails/:id/confirm',component:BdetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetBoardingRoutingModule { }
