export class RiskReview {
    constructor(
        public riskIdentificationId: number,
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
        public userId: number,
        public userName: string,
        public riskTypeName: string,
        public riskReviewAddedDate: string
    ) {}
}