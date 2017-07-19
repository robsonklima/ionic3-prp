import { ProjectService } from './../../services/project';
import { Project } from './../../models/project';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { ProjectPage } from '../project/project';

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html'
})
export class ProjectsPage {
  projects: Project[];

  constructor(
    private navCtrl: NavController,
    private projectService: ProjectService,
    private loadingCtrl: LoadingController
  ) {}
  
  onLoadProject(project: Project) {
    this.navCtrl.push(ProjectPage, { project: project });
  }

  ionViewWillEnter() {
    this.loadProjects();
  };

  private loadProjects() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.projectService.getProjects()
      .subscribe(
        projects => { 
          this.projects = projects;
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        });
  }
}
