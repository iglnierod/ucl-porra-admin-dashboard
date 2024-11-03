import { TableHead } from "./TableHead";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export const Table = ({ headers, children }: TableProps) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <TableHead headers={headers} />
      <tbody>{children}</tbody>
    </table>
  );
};
