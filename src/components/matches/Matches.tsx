import { useState, useEffect } from "react";
import { Matchday } from "../../models/matchdays";
import { getMatchdays } from "../../services/matchdayService";
import { Select } from "../utils/Select";
import { Table } from "../utils/Table";
import { getMatchesByMatchday } from "../../services/matchesService";
import { Match } from "../../models/matches";
import { MatchTableRow } from "./MatchTableRow";
import { CreateMatchModal } from "./CreateMatchModal";
import { CreateMatchButton } from "./CreateMatchButton";

export function Matches() {
  const [matchdays, setMatchdays] = useState<Matchday[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMatchday, setSelectedMatchday] = useState<number | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad de la modal

  const headers = ["Id", "Local", "Away", "LocalGoals", "AwayGoals"];

  // Carga de los matchdays
  useEffect(() => {
    const fetchMatchdays = async () => {
      try {
        const matchdaysData = await getMatchdays();
        setMatchdays(matchdaysData);
      } catch (e) {
        setError("Error fetching matchdays");
      }
    };
    fetchMatchdays();
  }, []);

  // Carga de los partidos para el matchday seleccionado
  useEffect(() => {
    const fetchMatches = async () => {
      if (selectedMatchday === null) return;
      setLoading(true);
      try {
        const matchesData = await getMatchesByMatchday(selectedMatchday);
        setMatches(matchesData);
      } catch (e) {
        setError("Error fetching matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedMatchday]);

  const onMatchCreated = (newMatch: Match) => {
    const newMatches = [...matches, newMatch];
    setMatches(newMatches);
  };

  return (
    <section className="flex flex-col items-center gap-8">
      <section>
        {error ? (
          <div>{error}</div>
        ) : (
          <Select
            options={matchdays.map((matchday) => ({
              value: matchday.id.toString(),
              label: matchday.name,
            }))}
            value={selectedMatchday?.toString() || ""}
            onChange={(value) => setSelectedMatchday(Number(value))}
            placeholder="Seleccione una jornada"
          />
        )}
      </section>
      <section>
        {loading ? (
          <div>Cargando partidos...</div>
        ) : (
          <Table headers={headers}>
            {matches.map((match) => (
              <MatchTableRow key={match.id} data={match} />
            ))}
          </Table>
        )}
      </section>

      {/* Modal de creación de partido */}
      {showModal && (
        <CreateMatchModal
          selectedMatchday={selectedMatchday}
          onClose={() => setShowModal(false)}
          onMatchCreated={onMatchCreated}
        />
      )}

      {/* Botón para abrir la modal */}
      <CreateMatchButton onClick={() => setShowModal(true)} />
    </section>
  );
}
