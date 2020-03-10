import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { InformationComponent } from './components/profile/information/information.component';
import { PetlistComponent } from './components/profile/petlist/petlist.component';
import { PostsComponent } from './components/profile/posts/posts.component';
import { AddComponent } from './components/profile/petlist/add/add.component';
import { EditComponent } from './components/profile/posts/edit/edit.component';
import { ListComponent } from './components/profile/petlist/list/list.component';
import { PlistComponent } from './components/profile/posts/plist/plist.component';
import { PeteditComponent } from './components/profile/petlist/petedit/petedit.component';

import { AuthGuard } from './../../auth.guard';


const routes: Routes = [
  {path:'',component:UserComponent},
  {path:'profile/:uid',component:ProfileComponent, canActivate: [AuthGuard],
  children: [
    {path:'information',component:InformationComponent},
    {path:'',component:InformationComponent},
    {path:'petlist',component:PetlistComponent,
    children: [
      {path:'',component:ListComponent},
      {path:'add',component:AddComponent},
      {path:'edit/:id',component:PeteditComponent},
      {path:'list',component:ListComponent}
    ]
    },
    {path:'posts',component:PostsComponent,
    children: [
      {path:'',component:PlistComponent},
      {path:'plist',component:PlistComponent},
      {path:'edit/:id',component:EditComponent}
    ]
    },
    
   ]
},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
