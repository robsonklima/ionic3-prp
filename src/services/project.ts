import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Project } from './../models/project';
import { AuthService } from './auth';

@Injectable()
export class ProjectService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) {}

  getProjects(): Observable<Project[]> {
    return this.http.get(Settings.API_URL + 'projects', this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getExpectedValues(projectId: number): Observable<any> {
    return this.http.get(Settings.API_URL + 'projects/expected-values/' + projectId, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getReviewedRisks(projectId: number): Observable<any[]> {
    return this.http.get(Settings.API_URL + 'projects/reviewed-risks/' + projectId, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  addProject(project: Project) {
    return this.http.post(Settings.API_URL + 'projects', project, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateProject(project: Project) {
    return this.http.put(Settings.API_URL + 'projects/' + project.projectId, project, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeProject(project: Project) {
    return this.http.delete(Settings.API_URL + 'projects/' + project.projectId, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  private getHeaders() {
    return new RequestOptions({ headers: new Headers ({ 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + this.authService.getToken()}) 
    });
  }
}