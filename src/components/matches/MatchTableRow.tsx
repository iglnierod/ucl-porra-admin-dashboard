import { Match } from "../../models/matches";
import { TableData } from "../utils/TableData";

interface MatchTableRowProps {
  data: Match;
}

export const MatchTableRow = ({ data }: MatchTableRowProps) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <TableData data={data.id} />
      <TableData data={data.localTeam.name} />
      <TableData data={data.awayTeam.name} />
      <TableData data={data.localGoals} />
      <TableData data={data.awayGoals} />
    </tr>
  );
};
