import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { RiskType } from '../../models/risk-type';
import { RiskTypeService } from '../../services/risk-type';
import { RiskCategory } from '../../models/risk-category';
import { RiskCategoryService } from '../../services/risk-category';

@Component({
  selector: 'page-risk-form',
  templateUrl: 'risk-form.html'
})
export class RiskFormPage implements OnInit {
  mode = 'New';
  riskForm: FormGroup;
  riskTypes: RiskType[];
  riskCategories: RiskCategory[];

  constructor(
    private riskTypeService: RiskTypeService,
    private riskCategoryService: RiskCategoryService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadRiskTypes();
    this.loadRiskCategories();
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

    // if (this.mode == 'Edit') {
    //   projectName = this.risk.projectName;
    //   projectScope = this.project.projectScope;
    // }

    this.riskForm = new FormGroup({
      'riskTitle': new FormControl(riskTitle, Validators.required),
      'riskCause': new FormControl(riskCause, Validators.required),
      'riskEffect': new FormControl(riskEffect, Validators.required),
      'riskTypeId': new FormControl(riskTypeId, Validators.required),
      'riskCategoryId': new FormControl(riskCategoryId, Validators.required)
    });
  }
}
