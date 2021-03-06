export class RiskReview {
    constructor(
        public riskReviewId: number,
        public riskReviewCost: string,
        public riskReviewSchedule: string,
        public riskReviewScope: string,
        public riskReviewQuality: string,
        public riskReviewProbability: string,
        public riskReviewConsImpact: string,
        public riskReviewDegreeImpact: string,
        public riskReviewPriority: string,
        public riskIdentificationId: number,
        public userId: number,
        public riskIdentificationAddedDate: string,
        public riskId: number,
        public riskTitle: string,
        public riskCause: string,
        public riskEffect: string,
        public projectId: number,
        public projectName: string,
        public projectScope: string,
        public activityId: number,
        public activityTitle: string,
        public activityDetails: string,
        public riskTypeName: string,
        public riskReviewAddedDate: string
    ) {}
}