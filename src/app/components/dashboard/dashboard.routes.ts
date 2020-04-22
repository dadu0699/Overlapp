import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './editProfile/editProfile.component';
import { GroupComponent } from './group/group.component';
import { MessagesComponent } from './messages/messages.component';

export const dashboardRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'messages', component: MessagesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
