import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetSittingComponent } from './pet-sitting.component';
import { SlistComponent } from './components/slist/slist.component';
import{ SdetailsComponent } from './components/sdetails/sdetails.component';
import { BnewComponent } from '../pet-boarding/components/bnew/bnew.component';


const routes: Routes = [
  {path:'',component:PetSittingComponent},
  {path:'sittinglist',component:SlistComponent},
  {path:'sittinglist/:id', component:SdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetSittingRoutingModule { }
