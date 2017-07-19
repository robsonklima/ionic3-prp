import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Project } from './../../models/project';
import { ProjectFormPage } from '../project-form/project-form';
import { ProjectService } from '../../services/project';
import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
import { ActivityService } from '../../services/activity';
import { ActivityPage } from '../activity/activity';
import { RiskPage } from '../risk/risk';
import { RiskService } from '../../services/risk';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage implements OnInit {
  tab: string = "home";
  project: Project;
  activities: Activity[];
  risks: Risk[];

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private activityService: ActivityService,
    private projectService: ProjectService,
    private riskService: RiskService
  ) {}

  onLoadActivity(activity: Activity) {
    this.navCtrl.push(ActivityPage, { activity: activity });
  }

  onLoadRisk(risk: Risk) {
    this.navCtrl.push(RiskPage, { risk: risk });
  }

  ngOnInit() {
    this.loadProject();
    this.loadActivities();
    this.loadRisks();
  }

  private loadProject() {
    this.project = this.navParams.get('project');
  }

  private loadActivities() {
    this.activityService.getActivitiesByProject(this.project.projectId)
      .subscribe(
        activities => { this.activities = activities },
        err => { console.log(err) }
      );
  }

  private loadRisks() {
    this.riskService.getRisks()
      .subscribe(
        risks => { this.risks = risks },
        err => { console.log(err) }
      );
  }

  onEditProject(project: Project) {
    this.navCtrl.push(ProjectFormPage, { project: project, mode: 'Edit' });
  }

  onRemoveProject(project: Project) {
    let confirm = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Are you sure to delete this project?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {}
        },
        {
          text: 'Agree',
          handler: () => {
            this.projectService.removeProject(project)
              .subscribe(
                res => {
                  this.handleMessage('Project removed successfully');
                  this.navCtrl.popToRoot();
                },
                err => { this.handleMessage('Unable to remove project') }
              );
          }
        }
      ]
    });
    confirm.present();
  }

  private handleMessage(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
}
