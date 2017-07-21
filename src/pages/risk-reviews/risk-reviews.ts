import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RiskReviewFormPage } from './../risk-review-form/risk-review-form';

@Component({
  selector: 'page-risk-reviews',
  templateUrl: 'risk-reviews.html'
})
export class RiskReviewsPage {

  constructor(
    private navCtrl: NavController
  ) {}

  onRiskReview() {
    this.navCtrl.push(RiskReviewFormPage);
  }
}
