import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd'; //input ngzorro module

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

import { InformationComponent } from './components/profile/information/information.component';
import { PetlistComponent } from './components/profile/petlist/petlist.component';
import { PostsComponent } from './components/profile/posts/posts.component';
import { AddComponent } from './components/profile/petlist/add/add.component';
import { ListComponent } from './components/profile/petlist/list/list.component';
import { PlistComponent } from './components/profile/posts/plist/plist.component';
import { EditComponent } from './components/profile/posts/edit/edit.component';
import { PeteditComponent } from './components/profile/petlist/petedit/petedit.component';


@NgModule({
  declarations: [UserComponent, ProfileComponent, SignupComponent, LoginComponent, InformationComponent, PetlistComponent, PostsComponent, AddComponent, ListComponent, PlistComponent, EditComponent, PeteditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class UserModule { }
