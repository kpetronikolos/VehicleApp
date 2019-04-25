import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Make } from "../models/Make";

@Injectable()
export class MakeService {

  constructor( private http: HttpClient ) { }

  public getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>( 'https://localhost:5001/api/makes' );
  }

}