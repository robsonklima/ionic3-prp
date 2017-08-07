import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, 
  ToastController, LoadingController } from 'ionic-angular';

import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
import { RiskPage } from '../risk/risk';
import { RiskService } from '../../services/risk';
import { ActivityFormPage } from "../activity-form/activity-form";
import { ActivityService } from '../../services/activity';
import { RiskFormPage } from '../risk-form/risk-form';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage implements OnInit {
  tab: string = "info";
  activity: Activity;
  risks: Risk[] = [];
  reviewedRisks: any[] = [];
  expectedValues: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private riskService: RiskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private activityService: ActivityService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadActivity();
    this.loadRisks();
    this.loadReviewedRisks();
    this.loadExpectedValues();
  }

  loadActivity() {
    this.activity = this.navParams.get('activity');
  }

  private loadExpectedValues() {
    this.activityService.getExpectedValues(this.activity.activityId)
      .subscribe(
        res => { this.expectedValues = res },
        err => { console.log(err) }
      );
  }

  private loadReviewedRisks() {
    this.activityService.getReviewedRisks(this.activity.activityId)
      .subscribe(
        res => { this.reviewedRisks = res },
        err => { console.log(err) }
      );
  }

  onLoadRisk(risk: Risk, activity: Activity) {
    this.navCtrl.push(RiskPage, { risk: risk, activity: activity });
  }

  private loadRisks() {
    this.riskService.getRisksByActivity(this.activity)
      .subscribe(
        risks => { 
          this.risks = risks;
        },
        err => {
          console.log(err);
        });
  }

  onNewActivity() {
    this.navCtrl.push(ActivityFormPage, { mode: 'New' });
  }

  onNewRisk() {
    this.navCtrl.push(RiskFormPage, { mode: 'New' });
  }

  onEditActivity(activity: Activity) {
    this.navCtrl.push(ActivityFormPage, { mode: 'Edit', activity: activity });
  }

  onRemoveActivity(activity: Activity) {
    let confirm = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Are you sure to delete this activity?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {}
        },
        {
          text: 'Agree',
          handler: () => {
            const loading = this.loadingCtrl.create({ content: 'Please wait...' });
            loading.present();

            this.activityService.removeActivity(activity)
              .subscribe(
                res => {
                  loading.dismiss();
                  this.handleMessage(res.success);
                  this.navCtrl.popToRoot();
                },
                err => { 
                  loading.dismiss();
                  this.handleMessage(err.error);
                }
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
