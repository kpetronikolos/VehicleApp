import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastaModule } from 'ngx-toasta';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FormVehicleComponent } from './components/form-vehicle/form-vehicle.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from './services/vehicle.service';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

@NgModule( {
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    FormVehicleComponent,
    VehicleListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ToastaModule.forRoot(),
    RouterModule.forRoot( [
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles', component: VehicleListComponent },
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
