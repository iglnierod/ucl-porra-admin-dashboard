import { Team } from "../models/teams";

const API_URL = import.meta.env.VITE_API_URL + "/teams";

export const getTeams = async (): Promise<Team[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const teams: Team[] = await response.json();
    return teams;
  } catch (err) {
    console.error("Error fetching teams");
    throw err;
  }
};
