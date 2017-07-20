import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Project } from './../models/project';
import { AuthService } from './auth';

@Injectable()
export class ProjectService {
  headers; 
  options;

  constructor(
    private http: Http,
    private authService: AuthService
  ) { 
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.getToken() });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getProjects(): Observable<Project[]> {
    return this.http.get(Settings.API_URL + 'projects', this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  addProject(project: Project) {
    return this.http.post(Settings.API_URL + 'projects', project, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateProject(project: Project) {
    return this.http.put(Settings.API_URL + 'projects/' + project.projectId, project, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeProject(project: Project) {
    return this.http.delete(Settings.API_URL + 'projects/' + project.projectId, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}