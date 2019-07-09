import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FormVehicleComponent } from './components/form-vehicle/form-vehicle.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from './services/vehicle.service';

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
    FormsModule,
    RouterModule.forRoot( [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'vehicle/new', component: FormVehicleComponent },
      { path: 'vehicles/:id', component: FormVehicleComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home' }
    ] )
  ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
} )
export class AppModule { }
