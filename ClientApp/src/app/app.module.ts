import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FormVehicleComponent } from './components/form-vehicle/form-vehicle.component';
import { MakeService } from './services/make.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule( {
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    FormVehicleComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot( [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'vehicle/new', component: FormVehicleComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home' }
    ] )
  ],
  providers: [MakeService],
  bootstrap: [AppComponent]
} )
export class AppModule { }
