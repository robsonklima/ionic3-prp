export class Project {
    constructor(
      public projectId: number,
      public projectName: string,
      public projectScope: string,
      public projectAddedDate: string,
      public projectAmountActivities: number
    ) {}
}