import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Make } from "../models/Make";
import { Feature } from "../models/Feature";
import { VehicleResource } from "../resources/VehileResource";
import { SaveVehicle } from "../dtos/SaveVehicle";
import { Filter } from "../dtos/Filter";

@Injectable()
export class VehicleService {

  constructor( private http: HttpClient ) { }

  public getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>( 'https://localhost:5001/api/makes' );
  }

  public getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>( 'https://localhost:5001/api/features' );
  }

  public createVehicle( vehicle ): any {
    return this.http.post( 'https://localhost:5001/api/vehicles', vehicle );
  }

  public getVehicle( id ): Observable<VehicleResource[]> {
    return this.http.get<VehicleResource[]>( 'https://localhost:5001/api/vehicles/' + id );
  }

  public updateVehicle( vehicle: SaveVehicle ): any {
    return this.http.put( 'https://localhost:5001/api/vehicles/' + vehicle.id, vehicle );
  }

  public delete( id ): any {
    return this.http.delete( 'https://localhost:5001/api/vehicles/' + id );
  }

  public getVehicles( filter: Filter ): Observable<VehicleResource[]> {
    // First Way: Url string
    return this.http.get<VehicleResource[]>( 'https://localhost:5001/api/vehicles' + '?' + this.toQueryString( filter ) );

    // Second way: Params
    // var filterParams = filter.makeId || filter.modelId ? new HttpParams()
    //   .set( 'makeId', filter.makeId.toString() )
    //   .set( 'modelId', filter.modelId ? filter.modelId.toString() : "" ) : null;

    // return this.http.get<VehicleResource[]>( 'https://localhost:5001/api/vehicles', { params: filterParams } );
  }

  private toQueryString( obj: Filter ) {
    var parts = [];

    for ( var property in obj ) {
      var value = obj[property];

      if ( value != null && value != undefined ) {
        parts.push( encodeURIComponent( property ) + '=' + encodeURIComponent( value ) )
      }
    }

    return parts.join( '&' );
  }

}