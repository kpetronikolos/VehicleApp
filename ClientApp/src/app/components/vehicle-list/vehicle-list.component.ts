import { Component, OnInit } from '@angular/core';
import { VehicleResource } from '../../resources/VehileResource';
import { VehicleService } from '../../services/vehicle.service';
import { Make } from '../../models/Make';
import { Filter } from '../../dtos/Filter';

@Component( {
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
} )
export class VehicleListComponent implements OnInit {

  // Client side filtering
  // public allVehicles: VehicleResource[];

  public vehicles: VehicleResource[];
  public makes: Make[];

  public filter: Filter = {
    makeId: null,
    modelId: null,
    sortBy: null,
    isSortAscending: true
  };

  public columns = [
    { title: 'Id' },
    { title: 'ContactName', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true }
  ];

  constructor( private vehicleService: VehicleService ) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe( makes => {
        this.makes = makes
      } );

    this.populateVehicles();
  }

  public onFilterChange(): void {

    // Server side filtering
    this.populateVehicles();

    // Client side filtering
    /* var filteredVehicles = this.allVehicles;

    if ( this.filter.makeId ) {
      filteredVehicles = filteredVehicles.filter( v => v.make.id == this.filter.makeId )
    }

    this.vehicles = filteredVehicles; */
  }

  public resetFilter(): void {
    this.filter = {
      makeId: null,
      modelId: null,
      sortBy: null,
      isSortAscending: true
    };

    this.populateVehicles();
  }

  public sortBy( column: string ) {
    if ( column === this.filter.sortBy ) {
      this.filter.isSortAscending = !this.filter.isSortAscending;
    } else {
      this.filter.sortBy = column;
      this.filter.isSortAscending = true;
    }

    this.populateVehicles();
  }

  private populateVehicles(): void {
    this.vehicleService.getVehicles( this.filter )
      .subscribe( data => {
        this.vehicles = data;

        // Client side filtering
        // this.vehicles = this.allVehicles = data;
      } )
  }

}
