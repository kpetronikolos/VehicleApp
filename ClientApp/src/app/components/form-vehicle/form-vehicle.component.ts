import { Component, OnInit } from '@angular/core';
import { Make } from '../../models/Make';
import { Model } from '../../models/Model';
import { Feature } from '../../models/Feature';
import { VehicleService } from '../../services/vehicle.service';

@Component( {
  selector: 'form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
} )
export class FormVehicleComponent implements OnInit {

  public makes: Make[];
  public models: Model[];
  public vehicle: any = {
    features: [],
    contact: {}
  };
  public selectedMake: Make;

  public features: Feature[];

  constructor( private vehicleService: VehicleService ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe( ( makes: Make[] ) => {
      this.makes = makes
    } );

    this.vehicleService.getFeatures().subscribe( ( features: Feature[] ) => {
      this.features = features;
    } )
  }

  public onMakeChanges(): void {
    // console.log( "Vehicle", this.vehicle );
    this.selectedMake = this.makes.find( m => m.id == this.vehicle.makeId );
    this.models = this.selectedMake ? this.selectedMake.models : [];
    if ( this.vehicle && this.vehicle.modelId ) {
      delete this.vehicle.modelId;
    }
  }

  public onFeatureToggle( featureId, $event ): void {
    if ( $event.target.checked ) {
      this.vehicle.features.push( featureId );
    } else {
      var index = this.vehicle.features.indexOf( featureId );
      this.vehicle.features.splice( index, 1 );
    }
  }

}
