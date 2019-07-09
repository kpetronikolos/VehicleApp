import { Component, OnInit } from '@angular/core';
import { Make } from '../../models/Make';
import { Model } from '../../models/Model';
import { Feature } from '../../models/Feature';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component( {
  selector: 'form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
} )
export class FormVehicleComponent implements OnInit {

  public makes: Make[];
  public models: Model[];
  public vehicle: any = {
    vehicleFeatures: [],
    contact: {}
  };
  public selectedMake: Make;

  public features: Feature[];

  constructor( private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService ) {
    route.params.subscribe( p => {
      this.vehicle.id = +p['id'];
    } )
  }

  ngOnInit() {
    this.vehicleService.getVehicle( this.vehicle.id ).subscribe( v => {
      this.vehicle = v;
    }, err => {
      if ( err.status == 404 ) {
        this.router.navigate( ['/home'] );
      }
    } );

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
      this.vehicle.vehicleFeatures.push( featureId );
    } else {
      var index = this.vehicle.vehicleFeatures.indexOf( featureId );
      this.vehicle.vehicleFeatures.splice( index, 1 );
    }
  }

  submit() {
    this.vehicleService.createVehicle( this.vehicle ).subscribe( x => console.log( x ) );
  }

}
