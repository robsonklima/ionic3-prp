import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Project } from './../../models/project';
import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
import { ProjectPage } from '../project/project';
import { ProjectService } from './../../services/project';
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
    private alertCtrl: AlertController
  ) { }

  onLoadProject(project: Project) {
    this.navCtrl.push(ProjectPage, { project: project });
  }

  ionViewWillEnter() {
    this.loadProjects();
  };

  private loadProjects() {
    this.projectService.getProjects()
      .subscribe(
      projects => {
        this.projects = projects;
      },
      err => {
        this.handleMessage('An error ocurred', err.error);
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
