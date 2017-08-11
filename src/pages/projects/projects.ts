import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { Project } from './../../models/project';
import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
import { ProjectService } from './../../services/project';
import { ProjectPage } from '../project/project';
import { ProjectFormPage } from '../project-form/project-form';

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html'
})
export class ProjectsPage {
  projects: Project[] = [];
  activities: Activity[];
  risks: Risk[];

  constructor(
    private navCtrl: NavController,
    private projectService: ProjectService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

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
        this.handleMessage('An error ocurred', err.error);
        loading.dismiss();
      });
  }

  onNewProject() {
    this.navCtrl.push(ProjectFormPage, { mode: 'New' });
  }

  private handleMessage(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
