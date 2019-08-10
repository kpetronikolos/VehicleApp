import { Component, OnInit } from '@angular/core';
import { VehicleResource } from '../../resources/VehileResource';
import { VehicleService } from '../../services/vehicle.service';
import { Make } from '../../models/Make';

@Component( {
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
} )
export class VehicleListComponent implements OnInit {

  public vehicles: VehicleResource[];
  public allVehicles: VehicleResource[];
  public makes: Make[];

  public filter: any = {};

  constructor( private vehicleService: VehicleService ) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe( makes => {
        this.makes = makes
      } );

    this.vehicleService.getVehicles()
      .subscribe( data => {
        this.vehicles = this.allVehicles = data;
      } )
  }

  public onFilterChange(): void {
    var filteredVehicles = this.allVehicles;

    if ( this.filter.makeId ) {
      filteredVehicles = filteredVehicles.filter( v => v.make.id == this.filter.makeId )
    }

    this.vehicles = filteredVehicles;
  }

}
