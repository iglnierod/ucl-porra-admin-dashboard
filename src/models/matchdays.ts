export enum MatchdayStatus {
  CURRENT = 0,
  PLAYED = 1,
  BLOCKED = 2,
}

export interface Matchday {
  readonly id: number;
  name: string;
  status: MatchdayStatus | string;
}
