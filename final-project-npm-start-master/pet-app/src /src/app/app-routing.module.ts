import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path:'home',loadChildren:'./module/home/home.module#HomeModule'
},
{
  path:'user',loadChildren:'./module/user/user.module#UserModule'
},
{
  path:'petboarding',loadChildren:'./module/pet-boarding/pet-boarding.module#PetBoardingModule'
},
{
  path:'petsitting',loadChildren:'./module/pet-sitting/pet-sitting.module#PetSittingModule'
},
  {path:'', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
