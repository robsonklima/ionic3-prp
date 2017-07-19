import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Observable } from "rxjs/Observable";
import { RiskCategory } from '../models/risk-category';

@Injectable()
export class RiskCategoryService {
    constructor(
      private http: Http
    ) {}

    getRiskCategories() : Observable<RiskCategory[]> {
      return this.http.get(Settings.API_URL + 'risk-categories')
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(
          error.json().error));
    }   
}