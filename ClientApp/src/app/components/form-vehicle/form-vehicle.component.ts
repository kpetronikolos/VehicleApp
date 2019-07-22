import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { Make } from '../../models/Make';
import { Model } from '../../models/Model';
import { Feature } from '../../models/Feature';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SaveVehicle } from '../../dtos/SaveVehicle';
import { VehicleFeature } from '../../models/VehicleFeature';
import { VehicleResource } from '../../resources/VehileResource';
import { ToastaService } from 'ngx-toasta';

@Component( {
  selector: 'form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
} )
export class FormVehicleComponent implements OnInit {

  public makes: Make[];
  public models: Model[];
  public vehicle: SaveVehicle = {
    id: 0,
    modelId: 0,
    makeId: 0,
    isRegistered: false,
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    vehicleFeatures: []
  };
  public selectedMake: Make;

  public features: Feature[];

  constructor( private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastaService ) {
    route.params.subscribe( p => {
      if ( p.id ) {
        this.vehicle.id = +p['id'];
      }
    } )
  }

  ngOnInit() {
    var sources: any[] = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if ( this.vehicle.id )
      sources.push( this.vehicleService.getVehicle( this.vehicle.id ) );

    forkJoin( sources )
      .subscribe( data => {
        this.makes = data[0];
        this.features = data[1];

        if ( this.vehicle.id ) {
          this.setVehicle( data[2] );
          this.populateModels();
        }
      }, err => {
        if ( err.status == 404 ) {
          this.router.navigate( ['/home'] );
        }
      } );
  }

  public onMakeChanges(): void {
    // console.log( "Vehicle", this.vehicle );
    this.populateModels();
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
    if ( this.vehicle.id ) {
      this.vehicleService.updateVehicle( this.vehicle ).subscribe( x => console.log( x ) );
    } else {
      this.vehicleService.createVehicle( this.vehicle )
        .subscribe(
          x => console.log( x ),
          err => {
            this.toastyService.error( {
              title: 'Error',
              msg: 'An unexpected error happened',
              theme: 'bootstrap',
              showClose: true,
              timeout: 5000
            } );
          } );
    }

  }

  delete() {
    if ( confirm( "Are you sure?" ) ) {
      this.vehicleService.delete( this.vehicle.id ).subscribe( x => {
        this.router.navigate( ['/home'] );
      } )
    }
  }

  private setVehicle( vehicleResource: VehicleResource ): void {
    this.vehicle.id = vehicleResource.id;
    this.vehicle.makeId = vehicleResource.make.id;
    this.vehicle.modelId = vehicleResource.model.id;
    this.vehicle.isRegistered = vehicleResource.isRegistered;
    this.vehicle.contact = vehicleResource.contact;
    this.vehicle.vehicleFeatures = _.pluck( vehicleResource.vehicleFeatures, 'id' );
  }

  private populateModels(): void {
    this.selectedMake = this.makes.find( m => m.id == this.vehicle.makeId );
    this.models = this.selectedMake ? this.selectedMake.models : [];
  }

}
