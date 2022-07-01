export class VolumeGetListCriteriaDto {
  constructor() {
  }

  query!: string;
  startIndex!: number;
  maxResults!: number;
  orderBy?: number;
}
