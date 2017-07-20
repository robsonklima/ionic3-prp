import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
import { RiskPage } from '../risk/risk';
import { RiskService } from '../../services/risk';
import { ActivityFormPage } from "../activity-form/activity-form";
import { ActivityService } from '../../services/activity';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage implements OnInit {
  tab: string = "home";
  activity: Activity;
  risks: Risk[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private riskService: RiskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.loadActivity();
    this.loadRisks();
  }

  loadActivity() {
    this.activity = this.navParams.get('activity');
  }

  onLoadRisk(risk: Risk) {
    this.navCtrl.push(RiskPage, { risk: risk });
  }

  private loadRisks() {
    this.riskService.getRisks()
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
            this.activityService.removeActivity(activity)
              .subscribe(
                res => {
                  this.handleMessage(res.success);
                  this.navCtrl.popToRoot();
                },
                err => { this.handleMessage(err.error) }
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
