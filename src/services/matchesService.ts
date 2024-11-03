import { Match } from "../models/matches";

const API_URL = import.meta.env.VITE_API_URL + "/matches";

export const getMatchesByMatchday = async (
  matchdayId: number
): Promise<Match[]> => {
  try {
    const response = await fetch(`${API_URL}/matchday/${matchdayId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const matches: Match[] = await response.json();
    return matches;
  } catch (err) {
    console.error("Error fetching matches for matchday", matchdayId);
    throw err;
  }
};

interface saveMatchProps {
  localTeamId: number;
  awayTeamId: number;
  localGoals?: number;
  awayGoals?: number;
  matchdayId: number;
}

export const saveMatch = async (newMatch: saveMatchProps) => {
  newMatch.localGoals = 0;
  newMatch.awayGoals = 0;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMatch),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
