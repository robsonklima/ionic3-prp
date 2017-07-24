import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { RiskReview } from '../models/risk-review';
import { User } from '../models/user';

@Injectable()
export class RiskReviewService {
    constructor(private http: Http) {}

    getRiskReviews(user: User) : Observable<RiskReview[]> {
      return this.http.get(Settings.API_URL + 'risk-reviews/' + user.userId)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error));
    }

    addRiskReview(riskReview: RiskReview) {
      return this.http.post(Settings.API_URL + 'risk-reviews', riskReview)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json()));
    }

    updateRiskReview(riskReview: RiskReview) {
      return this.http.put(Settings.API_URL + 'risk-reviews/' + riskReview.riskReviewId, riskReview)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json()));
    }
}