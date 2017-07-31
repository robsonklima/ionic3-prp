import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Observable } from "rxjs/Observable";
import { Analytic } from '../models/analytic';

@Injectable()
export class AnalyticService {
  constructor(private http: Http) {}

  getRisksAndCategories() : Observable<Analytic[]> {
    return this.http.get(Settings.API_URL + 'analytics/risk-categories')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error));
  }   
}