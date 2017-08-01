import { Component } from '@angular/core';
import { ProjectsPage } from '../projects/projects';
import { RiskReviewsPage } from '../risk-reviews/risk-reviews';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  projectsPage = ProjectsPage;
  riskReviewsPage = RiskReviewsPage;
}