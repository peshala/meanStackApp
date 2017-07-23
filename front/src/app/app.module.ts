import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from '../../src/app/components/navbar/navbar.component';
import { HomeComponent } from '../../src/app/components/home/home.component';
import { DashboardComponent } from '../../src/app/components/dashboard/dashboard.component';
import { RegisterComponent } from '../../src/app/components/register/register.component';
import { LoginComponent } from '../../src/app/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
