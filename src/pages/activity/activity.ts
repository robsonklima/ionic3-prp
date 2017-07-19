import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Activity } from '../../models/activity';
import { Risk } from '../../models/risk';
import { RiskPage } from '../risk/risk';
import { RiskService } from '../../services/risk';

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
    private riskService: RiskService
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
    
  }

  onEditActivity() {

  }

  onRemoveActivity() {
    
  }
}
