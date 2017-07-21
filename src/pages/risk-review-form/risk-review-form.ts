import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'page-risk-review-form',
  templateUrl: 'risk-review-form.html'
})
export class RiskReviewFormPage {
  cost: number = 0;
  schedule: number = 0;
  scope: number = 0;
  quality: number = 0;
  probability: number = 0;

  riskRewviewForm: FormGroup;
}
