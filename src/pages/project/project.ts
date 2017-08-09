import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Project } from './../../models/project';
import { ProjectFormPage } from '../project-form/project-form';
import { ActivityFormPage } from '../activity-form/activity-form';
import { RiskFormPage } from '../risk-form/risk-form';
import { ProjectService } from '../../services/project';
import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
import { ActivityService } from '../../services/activity';
import { ActivityPage } from '../activity/activity';
import { RiskPage } from '../risk/risk';
import { RiskService } from '../../services/risk';
import { UtilsService } from '../../services/utils';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage implements OnInit {
  tab: string = "info";
  project: Project;
  activities: Activity[] = [];
  risks: Risk[] = [];
  reviewedRisks: any[] = [];
  expectedValues: any;

  constructor(
    private utilsService: UtilsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private activityService: ActivityService,
    private projectService: ProjectService,
    private riskService: RiskService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadProject();
    this.loadReviewedRisks();
    this.loadExpectedValues();
  }

  ionViewWillEnter() {
    this.loadActivities();
    this.loadRisks();
  }

  private loadProject() {
    this.project = this.navParams.get('project');
  }

  private loadExpectedValues() {
    this.projectService.getExpectedValues(this.project.projectId)
      .subscribe(
        res => { this.expectedValues = res },
        err => { console.log(err) }
      );
  }

  private loadReviewedRisks() {
    this.projectService.getReviewedRisks(this.project.projectId)
      .subscribe(
        res => { this.reviewedRisks = res },
        err => { console.log(err) }
      );
  }

  private loadActivities() {
    this.activityService.getActivitiesByProject(this.project.projectId)
      .subscribe(
        activities => { this.activities = activities },
        err => { console.log(err) }
      );
  }

  private loadRisks() {
    this.riskService.getRisksByProject(this.project)
      .subscribe(
        risks => { this.risks = risks },
        err => { console.log(err) }
      );
  }

  onEditProject(project: Project) {
    this.navCtrl.push(ProjectFormPage, { project: project, mode: 'Edit' });
  }

  onNewProject() {
    this.navCtrl.push(ProjectFormPage, { mode: 'New' });
  }

  onNewActivity() {
    this.navCtrl.push(ActivityFormPage, { mode: 'New' });
  }

  onNewRisk() {
    this.navCtrl.push(RiskFormPage, { mode: 'New' });
  }

  onLoadActivity(activity: Activity) {
    this.navCtrl.push(ActivityPage, { activity: activity });
  }

  onLoadRisk(risk: Risk, project: Project) {
    this.navCtrl.push(RiskPage, { risk: risk, project: project });
  }

  onRemoveProject(project: Project) {
    let confirm = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Are you sure to delete this project?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => { }
        },
        {
          text: 'Agree',
          handler: () => {
            const loading = this.loadingCtrl.create({ 
              content: 'Please wait...' 
            });
            loading.present();

            this.projectService.removeProject(project)
              .subscribe(
                res => {
                  loading.dismiss().then(() => {
                    this.navCtrl.popToRoot().then(() => {
                      this.utilsService.handleToast(res.success);
                    })
                  });
                },
                err => { 
                  loading.dismiss().then(() => {
                    this.utilsService.handleToast(err.error) 
                  });
                }
              );
          }
        }
      ]
    });
    confirm.present();
  }
}
