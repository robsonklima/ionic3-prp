import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RiskReviewFormPage } from './../risk-review-form/risk-review-form';
import { RiskReviewService } from '../../services/risk-review';
import { AuthService } from '../../services/auth';
import { RiskReview } from '../../models/risk-review';

@Component({
  selector: 'page-risk-reviews',
  templateUrl: 'risk-reviews.html'
})
export class RiskReviewsPage implements OnInit {
  riskReviews: RiskReview[] = [];

  constructor(
    private navCtrl: NavController,
    private riskReviewService: RiskReviewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadRiskReviews();
  }

  onRiskReview() {
    this.navCtrl.push(RiskReviewFormPage);
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
