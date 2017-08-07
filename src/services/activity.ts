import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Observable } from "rxjs/Observable";
import { Activity } from '../models/activity';

@Injectable()
export class ActivityService {
  constructor(
    private http: Http
  ) { }

  getActivities(): Observable<Activity[]> {
    return this.http.get(Settings.API_URL + 'activities')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(
        error.json().error));
  }

  getExpectedValues(activityId: number): Observable<any> {
    return this.http.get(Settings.API_URL + 'activities/expected-values/' + activityId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getReviewedRisks(activityId: number): Observable<any[]> {
    return this.http.get(Settings.API_URL + 'activities/reviewed-risks/' + activityId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getActivitiesByProject(projectId: number): Observable<Activity[]> {
    return this.http.get(Settings.API_URL + 'activities/project/' + projectId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(
        error.json().error));
  }

  addActivity(activity: Activity) {
    return this.http.post(Settings.API_URL + 'activities', activity)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateActivity(activity: Activity) {
    return this.http.put(Settings.API_URL + 'activities/' + activity.activityId, activity)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeActivity(activity: Activity) {
    return this.http.delete(Settings.API_URL + 'activities/' + activity.activityId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}