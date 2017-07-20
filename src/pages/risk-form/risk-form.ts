import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastController, NavController, NavParams } from 'ionic-angular';

import { Risk } from "../../models/risk";
import { RiskType } from '../../models/risk-type';
import { RiskCategory } from '../../models/risk-category';
import { RiskService } from '../../services/risk';
import { RiskTypeService } from '../../services/risk-type';
import { RiskCategoryService } from '../../services/risk-category';

@Component({
  selector: 'page-risk-form',
  templateUrl: 'risk-form.html'
})
export class RiskFormPage implements OnInit {
  mode = 'New';
  risk: Risk;
  riskForm: FormGroup;
  riskTypes: RiskType[];
  riskCategories: RiskCategory[];

  constructor(
    private riskTypeService: RiskTypeService,
    private riskCategoryService: RiskCategoryService,
    private riskService: RiskService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    if (this.mode == 'Edit') {
      this.risk = this.navParams.get('risk');
    }
    
    this.initializeForm();
    this.loadRiskTypes();
    this.loadRiskCategories();
  }

  onSubmit() {
    if (this.mode == 'Edit') {
      this.risk.riskTitle = this.riskForm.value.riskTitle;
      this.risk.riskCause = this.riskForm.value.riskCause;
      this.risk.riskEffect = this.riskForm.value.riskEffect;
      this.risk.riskTypeId = this.riskForm.value.riskTypeId;
      this.risk.riskCategoryId = this.riskForm.value.riskCategoryId;

      this.riskService.updateRisk(this.risk)
        .subscribe(
            res => {
              this.handleMessage(res.success);
              this.navCtrl.pop();
            },
            err => {
              this.handleMessage(err.error);
              console.log(err);
            }
          );
    } else {
      this.risk = this.riskForm.value;

      this.riskService.addRisk(this.risk)
        .subscribe(
          res => {
            this.handleMessage(res.success);
            this.navCtrl.popToRoot();
          },
          err => {
            this.handleMessage(err.error);
            console.log(err);
          }
        );
    }
  }

  private loadRiskTypes() {
    this.riskTypeService.getRiskTypes()
      .subscribe(
        riskTypes => { 
          this.riskTypes = riskTypes;
        },
        err => {
          console.log(err);
        });
  }

  private loadRiskCategories() {
    this.riskCategoryService.getRiskCategories()
      .subscribe(
        riskCategories => { 
          this.riskCategories = riskCategories;
        },
        err => {
          console.log(err);
        });
  }

  private initializeForm() {
    let riskTitle = null;
    let riskCause = null;
    let riskEffect = null;
    let riskTypeId = null;
    let riskCategoryId = null;

    if (this.mode == 'Edit') {
      riskTitle = this.risk.riskTitle;
      riskCause = this.risk.riskCause;
      riskEffect = this.risk.riskEffect;
      riskTypeId = this.risk.riskTypeId;
      riskCategoryId = this.risk.riskCategoryId;
    }

    this.riskForm = new FormGroup({
      'riskTitle': new FormControl(riskTitle, Validators.required),
      'riskCause': new FormControl(riskCause, Validators.required),
      'riskEffect': new FormControl(riskEffect, Validators.required),
      'riskTypeId': new FormControl(riskTypeId, Validators.required),
      'riskCategoryId': new FormControl(riskCategoryId, Validators.required)
    });
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
