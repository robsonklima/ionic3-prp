import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Observable } from "rxjs/Observable";
import { Analytic } from '../models/analytic';
import { RiskReview } from '../models/risk-review';

@Injectable()
export class AnalyticService {
  constructor(private http: Http) {}

  getRisksTop10() : Observable<RiskReview[]> {
    return this.http.get(Settings.API_URL + 'analytics/risks-top-10')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error));
  }  

  getRisksAndCategories() : Observable<Analytic[]> {
    return this.http.get(Settings.API_URL + 'analytics/risk-categories')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error));
  }   
  
  getRisksAndTypes() : Observable<Analytic[]> {
    return this.http.get(Settings.API_URL + 'analytics/risk-types')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error));
  }

  getRisksAndProjects() : Observable<Analytic[]> {
    return this.http.get(Settings.API_URL + 'analytics/projects')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error));
  }

  getRisksAndActivities() : Observable<Analytic[]> {
    return this.http.get(Settings.API_URL + 'analytics/activities')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error));
  }
}