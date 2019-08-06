import { Component, OnInit } from '@angular/core';
import { VehicleResource } from '../../resources/VehileResource';
import { VehicleService } from '../../services/vehicle.service';

@Component( {
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
} )
export class VehicleListComponent implements OnInit {

  public vehicles: VehicleResource[];

  constructor( private vehicleService: VehicleService ) { }

  ngOnInit() {
    this.vehicleService.getVehicles()
      .subscribe( data => {
        this.vehicles = data;
      } )
  }

}
