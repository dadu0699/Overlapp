import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Libraries
import { TimeAgoPipe } from 'time-ago-pipe';

// Routes
import { appRouting, appRoutingProviders } from './app.routes';

// Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PublicationService } from './services/publication.service';
import { ChannelService } from './services/channel.service';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { EditProfileComponent } from './components/dashboard/editProfile/editProfile.component';
import { GroupComponent } from './components/dashboard/group/group.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    EditProfileComponent,
    GroupComponent,
    MessagesComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    UserService,
    PublicationService,
    ChannelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
