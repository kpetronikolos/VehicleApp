import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Feature } from "../models/Feature";

@Injectable()
export class FeatureService {

  constructor( private http: HttpClient ) { }

  public getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>( 'https://localhost:5001/api/features' );
  }

}