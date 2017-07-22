import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';

@Injectable()
export class RiskProblemService {
  
  constructor(private http: Http) { }

  addRiskProblem(riskProblem: Object) {
    return this.http.post(Settings.API_URL + 'risk-problems', riskProblem)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeRiskProblem(riskProblemId: number) {
    return this.http.delete(Settings.API_URL + 'risk-problems/' + riskProblemId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}