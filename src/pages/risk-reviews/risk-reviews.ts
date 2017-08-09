import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RiskReviewFormPage } from './../risk-review-form/risk-review-form';
import { RiskReviewService } from '../../services/risk-review';
import { AuthService } from '../../services/auth';
import { RiskReview } from '../../models/risk-review';

@Component({
  selector: 'page-risk-reviews',
  templateUrl: 'risk-reviews.html'
})
export class RiskReviewsPage {
  riskReviews: RiskReview[] = [];

  constructor(
    private navCtrl: NavController,
    private riskReviewService: RiskReviewService,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    this.loadRiskReviews();
  }

  public onLoadRiskReview(riskReview: RiskReview) {
    this.navCtrl.push(RiskReviewFormPage, { riskReview: riskReview });
  }

  private loadRiskReviews() {
    this.riskReviewService.getRiskReviews(this.authService.getUser())
      .subscribe(
        riskReviews => { 
          this.riskReviews = riskReviews;
        },
        err => {}
      );
  }
}
