interface TableHeadProps {
  headers: string[];
}

export const TableHead = ({ headers }: TableHeadProps) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {headers.map((header) => (
          <th key={header} scope="col" className="px-4 py-3">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};
