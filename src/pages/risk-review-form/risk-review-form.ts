import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams, LoadingController, ToastController, NavController } from 'ionic-angular';
import { RiskReview } from '../../models/risk-review';
import { RiskReviewService } from '../../services/risk-review';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-risk-review-form',
  templateUrl: 'risk-review-form.html'
})
export class RiskReviewFormPage implements OnInit {
  riskReview: RiskReview;
  riskReviewForm: FormGroup;
  
  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private riskReviewService: RiskReviewService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.riskReview = this.navParams.get('riskReview');
    
    this.initializeForm();
  }

  private initializeForm() {
    let cost = null;
    let schedule = null;
    let scope = null;
    let quality = null;
    let probability = null;

    if (this.riskReview.riskReviewId) {
      cost = this.riskReview.riskReviewCost;
      schedule = this.riskReview.riskReviewSchedule;
      scope = this.riskReview.riskReviewScope;
      quality = this.riskReview.riskReviewQuality;
      probability = this.riskReview.riskReviewProbability;
    }

    this.riskReviewForm = new FormGroup({
      'cost': new FormControl(cost, Validators.required),
      'schedule': new FormControl(schedule, Validators.required),
      'scope': new FormControl(scope, Validators.required),
      'quality': new FormControl(quality, Validators.required),
      'probability': new FormControl(probability, Validators.required)
    });
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({ 
      content: 'Please wait...' 
    });
    loading.present();

    if (this.riskReview.riskReviewId) {
      this.riskReview.riskReviewCost = this.riskReviewForm.value.cost;
      this.riskReview.riskReviewSchedule = this.riskReviewForm.value.schedule;
      this.riskReview.riskReviewScope = this.riskReviewForm.value.scope;
      this.riskReview.riskReviewQuality = this.riskReviewForm.value.quality;
      this.riskReview.riskReviewProbability = this.riskReviewForm.value.probability;
      this.riskReview.userId = this.authService.getUser().userId;

      this.riskReviewService.updateRiskReview(this.riskReview)
        .subscribe(
            res => {
              loading.dismiss().then(() => {
                this.handleMessage(res.success);
                this.navCtrl.pop();
              });
            },
            err => {
              loading.dismiss().then(() => {
                this.handleMessage(err.error);
              });
            }
          );
    } else {
      this.riskReview.riskReviewCost = this.riskReviewForm.value.cost;
      this.riskReview.riskReviewSchedule = this.riskReviewForm.value.schedule;
      this.riskReview.riskReviewScope = this.riskReviewForm.value.scope;
      this.riskReview.riskReviewQuality = this.riskReviewForm.value.quality;
      this.riskReview.riskReviewProbability = this.riskReviewForm.value.probability;
      this.riskReview.userId = this.authService.getUser().userId;

      this.riskReviewService.addRiskReview(this.riskReview)
        .subscribe(
          res => {
            loading.dismiss().then(() => {
              this.handleMessage(res.success);
              this.navCtrl.popToRoot();
            });
          },
          err => {
            loading.dismiss().then(() => {
              this.handleMessage(err.error);
            });
          }
        );
    }
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
