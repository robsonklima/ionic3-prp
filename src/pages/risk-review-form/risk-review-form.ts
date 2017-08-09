import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams, LoadingController, NavController, AlertController } from 'ionic-angular';
import { RiskReview } from '../../models/risk-review';
import { RiskReviewService } from '../../services/risk-review';
import { AuthService } from '../../services/auth';
import { UtilsService } from '../../services/utils';

@Component({
  selector: 'page-risk-review-form',
  templateUrl: 'risk-review-form.html'
})
export class RiskReviewFormPage implements OnInit {
  riskReview: RiskReview;
  riskReviewForm: FormGroup;
  
  constructor(
    private utilsService: UtilsService,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private riskReviewService: RiskReviewService,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController
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
                this.utilsService.handleToast(res.success).then(() => {
                  this.navCtrl.pop();
                })
              });
            },
            err => {
              loading.dismiss().then(() => {
                this.utilsService.handleToast(err.error);
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
              this.utilsService.handleToast(res.success).then(() => {
                this.navCtrl.pop();
              });
            });
          },
          err => {
            loading.dismiss().then(() => {
              this.utilsService.handleToast(err.error);
            });
          }
        );
    }
  }

  public onRemoveRiskReview(riskReview: RiskReview) {
    let confirm = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Are you sure to delete this review?',
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

            this.riskReviewService.removeRiskReview(riskReview)
              .subscribe(
                res => {
                  loading.dismiss().then(() => {
                    this.utilsService.handleToast(res.success).then(() => {
                      this.navCtrl.pop();
                    });
                  });
                },
                err => { 
                  loading.dismiss().then(() => {
                    this.utilsService.handleToast(err.error);
                  })
                }
              );
          }
        }
      ]
    });
    confirm.present();
  }
}
