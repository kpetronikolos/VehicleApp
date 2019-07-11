import { Component, OnInit } from '@angular/core';
import { Make } from '../../models/Make';
import { Model } from '../../models/Model';
import { Feature } from '../../models/Feature';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

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
      if ( p.id ) {
        this.vehicle.id = +p['id'];
      }
    } )
  }

  ngOnInit() {
    forkJoin( [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
      this.vehicle.id ? this.vehicleService.getVehicle( this.vehicle.id ) : Promise.resolve( 0 )
    ] ).subscribe( data => {
      this.makes = data[0];
      this.features = data[1];

      if ( this.vehicle.id ) {
        this.vehicle = data[2];
      }
    }, err => {
      if ( err.status == 404 ) {
        this.router.navigate( ['/home'] );
      }
    } );
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
