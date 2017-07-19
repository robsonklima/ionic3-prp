import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Risk } from '../../models/risk';
import { RiskFormPage } from '../risk-form/risk-form';

@Component({
  selector: 'page-risk',
  templateUrl: 'risk.html'
})
export class RiskPage implements OnInit {
  risk: Risk;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.onLoadRisk();
  }

  onNewRisk() {
    this.navCtrl.push(RiskFormPage, {mode: 'New'});
  }

  private onLoadRisk() {
    this.risk = this.navParams.get('risk');
  }

  onEditRisk() {

  }

  onRemoveRisk() {
    
  }
}
