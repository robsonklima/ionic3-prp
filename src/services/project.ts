import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Project } from './../models/project';
import { Observable } from "rxjs/Observable";
import { AuthService } from './auth';


@Injectable()
export class ProjectService {
  
  constructor(
    private http: Http,
    private authService: AuthService
  ) {}

  getProjects() : Observable<Project[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.getToken() });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(Settings.API_URL + 'projects', options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(
        error.json() || 'Server error' )
      );
  }  

  addProject(project: Project) {
    let body = JSON.stringify(project);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Settings.API_URL + 'projects', body, options)
      .map((res:Response) => res)
      .catch((error: any) => Observable.throw(
        error.json() || 'Server error' )
      );
  }

  updateProject(project: Project) {
    let body = JSON.stringify(project);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(Settings.API_URL + 'projects/' + project.projectId, body, options)
      .map((res:Response) => res)
      .catch((error: any) => Observable.throw(
        error.json() || 'Server error' )
      );
  }

  removeProject(project: Project) {
    return this.http.delete(Settings.API_URL + 'projects/' + project.projectId)
      .map((res:Response) => res)
      .catch((error: any) => Observable.throw(
        error.json() || 'Server error' )
      );
  }
}