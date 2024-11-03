import { useState, useEffect } from "react";
import { Team } from "../../models/teams";
import { getTeams } from "../../services/teamsService";
import { Select } from "../utils/Select";
import { Button } from "../utils/Button";
import { saveMatch } from "../../services/matchesService";
import { Match } from "../../models/matches";

interface CreateMatchModalProps {
  onClose: () => void;
  selectedMatchday: number | null;
  onMatchCreated: (newMatch: Match) => void;
}

export const CreateMatchModal = ({
  onClose,
  selectedMatchday,
  onMatchCreated,
}: CreateMatchModalProps) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [localTeam, setLocalTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (err) {
        setError("Failed to fetch teams");
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (localTeam === null || awayTeam === null) {
      setError("Please select both teams");
      return;
    }

    if (selectedMatchday === null) {
      setError("Please select a matchday");
      return;
    }

    const newMatch = await saveMatch({
      localTeamId: localTeam.id,
      awayTeamId: awayTeam.id,
      matchdayId: selectedMatchday,
    });

    onMatchCreated(newMatch);

    onClose();
    setError(null);
  };

  return (
    <form
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onSubmit={handleSubmit}
    >
      <section className="bg-slate-700 p-8 rounded-lg shadow-lg max-w-lg w-full">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <Select
                options={teams.map((team) => ({
                  value: team.id.toString(),
                  label: team.name,
                }))}
                value={localTeam?.id.toString() || ""}
                onChange={(value) => {
                  const selectedTeam = teams.find(
                    (team) => team.id === Number(value)
                  );
                  setLocalTeam(selectedTeam || null);
                }}
              />
              <h2 className="text-xl font-bold">VS</h2>
              <Select
                options={teams.map((team) => ({
                  value: team.id.toString(),
                  label: team.name,
                }))}
                value={awayTeam?.id.toString() || ""}
                onChange={(value) => {
                  const selectedTeam = teams.find(
                    (team) => team.id === Number(value)
                  );
                  setAwayTeam(selectedTeam || null);
                }}
              />
            </div>
            <div className="flex items-center gap-3 justify-end">
              <Button type="button" onClick={onClose} variant="cancel" />
              <Button type="submit" variant="create" />
            </div>
          </div>
        )}
      </section>
    </form>
  );
};
