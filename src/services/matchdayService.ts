import { Matchday } from "../models/matchdays";

const API_URL = import.meta.env.VITE_API_URL + "/matchdays";

export const getMatchdays = async (): Promise<Matchday[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const matchdays: Matchday[] = await response.json();
    return matchdays;
  } catch (e) {
    console.error("Error fetching matchdays");
    throw e;
  }
};
