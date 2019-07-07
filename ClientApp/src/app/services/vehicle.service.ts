import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Make } from "../models/Make";
import { Feature } from "../models/Feature";

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

}