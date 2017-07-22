export class Risk {
    constructor(
      public riskId: number,
      public riskTitle: number,
      public riskCause: string,
      public riskEffect: string,
      public riskAddedDate: string,
      public riskTypeId: number,
      public riskTypeName: string,
      public riskCategoryId: number,
      public riskCategoryName: string,
      public riskIdentificationId: number,
      public riskProblemId: number
    ) {}
}