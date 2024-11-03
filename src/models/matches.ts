import { Matchday } from "./matchdays";
import { Team } from "./teams";

export interface Match {
  readonly id: number;
  localTeam: Team;
  awayTeam: Team;
  localGoals: number;
  awayGoals: number;
  matchday: Matchday;
}
